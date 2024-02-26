const express = require("express");
const ctl = require("../controllers/commentController");
const verifyToken = require("../utils/utils");

const router = express.Router();

router.post("/", verifyToken, ctl.addComment);
router.delete("/:id", verifyToken, ctl.deleteComment);
router.get("/:videoId", ctl.getComments);
router.put("/like/:commentId", verifyToken, ctl.likeComment);
router.put("/dislike/:commentId", verifyToken, ctl.dislikeComment);

module.exports = router;
