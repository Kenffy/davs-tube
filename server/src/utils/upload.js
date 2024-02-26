const multer = require("multer");

// upload settings
const coverStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "assets/covers");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.filename);
  },
});

const profileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "assets/profiles");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.filename);
  },
});

const videoStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "assets/videos");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.filename);
  },
});

const uploadCover = multer({ storage: coverStorage });
const uploadProfile = multer({ storage: profileStorage });
const uploadVideo = multer({ storage: videoStorage });

module.exports = { uploadCover, uploadProfile, uploadVideo };
