const router = require("express").Router();
const AuthController = require("../controllers/auth.controller")
const authMiddleware = require("./../middleware/auth.middleware");

router.post("/login", authMiddleware(false, true), AuthController.login)
router.post("/logout", authMiddleware(true), AuthController.logout)

module.exports = router;