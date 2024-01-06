import express from "express";
import * as ctl from "../controllers/channelController.js";
import { verifyToken } from "../utils/utils.js";

const router = express.Router();

router.get("/:id", ctl.getChannel);
router.put("/:id", verifyToken, ctl.updateChannel);
router.put("/subscribe/:id", verifyToken, ctl.subscribe);
router.put("/unsubscribe/:id", verifyToken, ctl.unsubscribe);

export default router;
