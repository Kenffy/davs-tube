const express = require("express");
const ctl = require("../controllers/channelController");
const verifyToken = require("../utils/utils");

const router = express.Router();

router.get("/:id", ctl.getChannel);
router.put("/:id", verifyToken, ctl.updateChannel);
router.put("/subscribe/:id", verifyToken, ctl.subscribe);
router.put("/unsubscribe/:id", verifyToken, ctl.unsubscribe);

module.exports = router;
