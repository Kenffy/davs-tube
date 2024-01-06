import express from "express";
import * as ctl from "../controllers/commentController.js";
import { verifyToken } from "../utils/utils.js";

const router = express.Router();

router.post("/", verifyToken, ctl.addComment);
router.delete("/:id", verifyToken, ctl.deleteComment);
router.get("/:videoId", ctl.getComments);
router.put("/like/:commentId", verifyToken, ctl.likeComment);
router.put("/dislike/:commentId", verifyToken, ctl.dislikeComment);

export default router;
