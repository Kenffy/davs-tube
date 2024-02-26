const express = require("express");
const ctl = require("../controllers/videoController");
const verifyToken = require("../utils/utils");

const router = express.Router();

router.get("/", ctl.getVideos);
router.get("/:id", ctl.getVideo);
router.get("/search", ctl.searchVideo);
router.get("/channel/:id", ctl.getVideosByChannelId);

router.post("/", verifyToken, ctl.addVideo);
router.put("/:id", verifyToken, ctl.updateVideo);
router.put("/like/:videoId", verifyToken, ctl.likeVideo);
router.put("/dislike/:videoId", verifyToken, ctl.dislikeVideo);
router.delete("/:id", verifyToken, ctl.deleteVideo);

module.exports = router;
