const router = require("express").Router();
const DoctorController = require("../controllers/doctor.controller")
const authorize = {
    type_0: {
        type: 0,
        paths: [
            {url: "/doctor/", method: "GET"},
            {url: "/doctor/", method: "POST"},
            {url: "/doctor/", method: "PUT"},
            {url: "/doctor/", method: "DELETE"},
        ]
    },
    type_1: {
        type: 1,
        paths: [
            {url: "/doctor/", method: "GET"},
            {url: "/doctor/", method: "PUT"}
        ]
    },
    type_2: {
        type: 2,
        paths: []
    },
}
const authResources = require("../middleware/authResources.middleware")(authorize)

router.get("/", authResources, DoctorController.get)
router.post("/", authResources, DoctorController.add)
router.put("/", authResources, DoctorController.update)
router.delete("/", authResources, DoctorController.delete)

module.exports = router;