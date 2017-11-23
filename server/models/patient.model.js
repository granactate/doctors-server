const mongoose = require("./../database/mongoose");
const moment = require('moment');
const request = require('request-promise');
const constants = require("./../common/constants");
const colsGlucosa = {
    "value": {
        type: Number,
        required: true
    },
    "createdAt": {
        type: Date,
        default: Date.now()
    },
    "updatedAt": {
        type: Date,
        default: Date.now()
    }
}
const cols = {
    document: {
        type: String,
        required: true,
        unique: true
    },
    glucosa: new mongoose.Schema(colsGlucosa),
    name: {
        type: String,
        required: true,
        trim: true,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        "default": null
    },
    createdAt: {
        type: Date,
        "default": Date.now
    },
    updateAt: {
        type: Date,
        "default": Date.now
    }
};
let PatientSchema = new mongoose.Schema(cols)
PatientSchema.statics.getAttributes = function ()
{
    return Object.keys(cols)
}
PatientSchema.statics.getAttributesGlucosa = function ()
{
    let atts = Object.keys(colsGlucosa);
    delete atts.updateAt
    delete atts.createdAt
    console.log(atts)
    return atts
}
var Patient = mongoose.model("Patient", PatientSchema)
module.exports = Patient;