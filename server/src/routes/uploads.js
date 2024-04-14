const express = require("express");
const {
  uploadCover,
  uploadProfile,
  uploadVideo,
  uploadBanner,
} = require("../utils/upload");
const verifyToken = require("../utils/utils");

const router = express.Router();

router.post("/covers", verifyToken, uploadCover.single("file"), (req, res) => {
  res.status(200).json("cover uploaded");
});
router.post(
  "/profiles",
  verifyToken,
  uploadProfile.single("file"),
  (req, res) => {
    res.status(200).json("profile uploaded");
  }
);

router.post(
  "/banners",
  verifyToken,
  uploadBanner.single("file"),
  (req, res) => {
    res.status(200).json("banner uploaded");
  }
);

router.post("/videos", verifyToken, uploadVideo.single("file"), (req, res) => {
  res.status(200).json("video uploaded");
});

module.exports = router;
