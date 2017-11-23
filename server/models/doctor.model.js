const mongoose = require("./../database/mongoose");
const moment = require('moment');
const request = require('request-promise');
const constants = require("./../common/constants");
let cols = {
    name: {
        type: String,
        required: true,
        trim: true,

    },
    username: {
        type: String,
        unique: true,
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
    createdAt: {
        type: Date,
        "default": Date.now
    },
    updateAt: {
        type: Date,
        "default": Date.now
    }
};
let DoctorSchema = new mongoose.Schema(cols)
DoctorSchema.statics.getAttributes = function ()
{
    return Object.keys(cols)
}
var Doctor = mongoose.model("Doctor", DoctorSchema)
module.exports = Doctor;