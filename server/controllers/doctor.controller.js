const constants = require("./../common/constants");
const Doctor = require("./../models/doctor.model");
const _ = require('lodash');
function DoctorController()
{
    
    this.get = function (req, res)
    {
        let currentUser = req.currentUser
        let params = {}
        if (currentUser.type === 1)
        {
            params._id = currentUser._id
        }

        Doctor.find(params)
                .then((data) => res.send(data))
                .catch((error) => res.send(error))

    }
    this.add = function (req, res)
    {
        let doctor = new Doctor(req.body)
        doctor.save()
                .then((data) => res.send({status: 1, description: "Doctor was saved", data: data}))
                .catch((error) => {
                    let message = "Doctor wasn saved"
                    if (error.code === 11000)
                    {
                        message = "A doctor exist with username: " + req.body.username
                    }
                    res.send({status: -1, description: message})
                }
                )
    }
    this.update = function (req, res)
    {
        let currentUser = req.currentUser
        if (!req.body._id)
        {
            return res.status(404).send({status: 0, description: "Doctor wasnt found", data: null})
        }
        let params = {_id: currentUser.type === 0 ? req.body._id : currentUser._id};
        return Doctor.findOneAndUpdate(params, _.pick(req.body, Doctor.getAttributes()), {new : true})
                .then((data) => {
                    !data ? res.send({status: 0, description: "Doctor wasnt found", data: {request_data: req.body, response: data}}) :
                            res.send({status: 1, description: "doctor was updated", data: data})
                })
                .catch((error) => res.send({status: -1, description: "Doctor wasnt updated", data: error}))


    }
    this.delete = function (req, res)
    {
        let response = {
            status: -1,
            description: "Doctor wasnt found",
            data: null
        }
        Doctor.findByIdAndRemove({_id: req.body._id})
                .then((data) => {
                    response.status = 1;
                    response.description = "Doctor " + data.username + " was deleted";
                    response.data = data;
                    res.send(response)
                })
                .catch((error) => {
                    res.status(404).send(response)
                })
    }


    return this;
}



module.exports = DoctorController();