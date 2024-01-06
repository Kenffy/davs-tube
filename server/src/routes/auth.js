import express from "express";
import * as ctl from "../controllers/authController.js";

const router = express.Router();

router.post("/login", ctl.login);
router.post("/register", ctl.register);

export default router;
