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
const authMiddleware = require("./../middleware/auth.middleware");
const authResources = require("../middleware/authResources.middleware")(authorize)

router.get("/", authMiddleware(true), authResources, PatientController.getPatient)
router.post("/", authMiddleware(true), authResources, PatientController.add)
router.put("/", authMiddleware(true), authResources, PatientController.update)
router.delete("/", authMiddleware(true), authResources, PatientController.delete)

//EPS FOR GLUCOSA
router.post("/glucosa/", authMiddleware(true), authResources, GlucosaController.addOrUpdate)
module.exports = router;