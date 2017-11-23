const constants = require("./../common/constants");
const Patient = require("./../models/patient.model");
const moment = require('moment');
const _ = require("lodash")
function PatientController()
{
    let currentUser = constants.current_user_logged;
    this.getPatient = function (req, res)
    {
        let params = {};
        //if app query then get only it patient
        if (currentUser.type == 2)
        {
            params._id = currentUser.patient._id;
        }
        //set query params
        Patient.find(params).then((data) => res.send(data.map((patient) => {
                patient = patient.toObject();
                if (patient.assignedTo != currentUser._id)
                {
                    delete patient.assignedTo;
                }

                return patient;
            })))
                .catch((error) => res.send(error))

    }

    this.add = function (req, res)
    {
        if (currentUser.type === 1 && !currentUser._id)
        {
            return res.status(400).send({status: -2, description: "Doctor id wasn not specified", data: currentUser})
        }

        if (currentUser.type === 1)
        {
            req.body.assignedTo = currentUser._id;
        }

        req.body.dateOfBirth = req.body.dateOfBirth ? moment(req.body.dateOfBirth).toDate() : null;
        let patient = new Patient(req.body)
        patient.save()
                .then((data) => res.send({status: 1, description: "Patient was saved", data: data}))
                .catch((error) => {
                    let message = "Patient wasn saved"
                    if (error.code === 11000)
                    {
                        message = "A Patient already exist with document: " + req.body.document
                    }
                    res.send({status: -1, description: message, data: error})
                })
    }

    this.update = function (req, res)
    {
        let params = {_id: req.body._id}
        if (!params._id)
        {
            return res.status(404).send({status: 0, description: "Patient wasnt found", data: null})
        }

        if (currentUser.type === 1 && !currentUser._id)
        {
            return res.status(400).send({status: -2, description: "Doctor id wasn not specified", data: currentUser})
        } else if (currentUser.type == 1)
        {
            params.assignedTo = currentUser._id
        }




        return Patient.findOneAndUpdate(params, _.pick(req.body, Patient.getAttributes()), {new : true})
                .then((data) => {
                    !data ? res.send({status: 0, description: "Patient wasnt found", data: {request_data: req.body, response: data}}) :
                            res.send({status: 1, description: "Patient was updated", data: data})
                })
                .catch((error) => res.send({status: -1, description: "Patient wasnt updated", data: error}))


    }
    this.delete = function (req, res)
    {
        if (!req.body._id)
        {
            return res.status(404).send({status: 0, description: "Patient wasnt found", data: null})
        } else if (currentUser.type === 1 && !currentUser._id)
        {
            return res.status(400).send({status: -2, description: "Doctor id wasn not specified", data: currentUser})
        }

        if (currentUser.type == 1)
        {

            req.body.assignedTo = currentUser._id
        }

        let response = {
            status: -1,
            description: "Patient wasnt found",
            data: null
        }

        Patient.findOneAndRemove(req.body)
                .then((data) => {
                    response.status = 1;
                    response.description = "Patient " + data.username + " was deleted";
                    response.data = data;
                    res.send(response)
                })
                .catch((error) => {
                    res.send(response)
                })
    }

    return this;
}



module.exports = PatientController();