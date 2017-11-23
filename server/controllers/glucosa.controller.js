const constants = require("./../common/constants");
const Patient = require("./../models/patient.model");
const _ = require("lodash");
function GlucosaController()
{

    let currentUser = constants.current_user_logged;
    this.addOrUpdate = function (req, res)
    {
        //patient ID
        let params = {_id: req.body._id};
        if (currentUser.type === 1)
        {
            //if current user is a doctor, add to query assignedTo for prevent unhaturized edit
            params.assignedTo = currentUser._id;
        } else if (currentUser.type === 2)
        {
            //if is the app, then select patient id from app
            params._id = currentUser.patient._id;
        }
        //get glucosa data
        let patient = {glucosa: _.pick(req.body.glucosa, Patient.getAttributesGlucosa())};
        //force Set updated date
        patient.glucosa.updatedAt = Date.now();
        //find and update, upsert create a row if glucosa patient registry doesnt exist
        console.log(patient)
        Patient.findOneAndUpdate(params, patient, {upsert: true, new : true})
                .then((data) => {
                    res.send({status: 1, description: "Glucosa data was saved succesfully", data: data})
                })
                .catch((error) => res.send({status: -1, description: "Patient wasnt found", data: error}))
    }

    return this;
}



module.exports = GlucosaController();