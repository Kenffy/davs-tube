const express = require("express");
const ctl = require("../controllers/authController");

const router = express.Router();

router.post("/login", ctl.login);
router.post("/register", ctl.register);

module.exports = router;
