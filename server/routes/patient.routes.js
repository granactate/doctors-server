let router = require("express").Router();
let PatientController = require("../controllers/patient.controller")
let GlucosaController = require("../controllers/glucosa.controller")
const authorize = {
    type_0: {
        type: 0,
        paths: [
            {url: "/patient/", method: "GET"},
            {url: "/patient/", method: "POST"},
            {url: "/patient/", method: "PUT"},
            {url: "/patient/", method: "DELETE"},
            {url: "/patient/glucosa/", method: "POST"},
        ]
    },
    type_1: {
        type: 1,
        paths: [
            {url: "/patient/", method: "GET"},
            {url: "/patient/", method: "POST"},
            {url: "/patient/", method: "PUT"},
            {url: "/patient/", method: "DELETE"},
            {url: "/patient/glucosa/", method: "POST"},
        ]
    },
    type_2: {
        type: 2,
        paths: [
            {url: "/patient/", method: "GET"},
            {url: "/patient/glucosa/", method: "POST"},
        ]
    },
}
const authResources = require("../middleware/authResources.middleware")(authorize)

router.get("/", authResources, PatientController.getPatient)
router.post("/", authResources, PatientController.add)
router.put("/", authResources, PatientController.update)
router.delete("/", authResources, PatientController.delete)

//EPS FOR GLUCOSA
router.post("/glucosa/", authResources, GlucosaController.addOrUpdate)
module.exports = router;