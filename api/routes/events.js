const express = require("express");
const multer = require("multer");
const router = express.Router();

const controller = require("../controllers/events");

// Upload image
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, "event-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5, //5MB
  },
});

router.get("/events.json", controller.GET_EVENT);

router.post("/", upload.single("image"), controller.POST_EVENT);

router.delete("/delete/:id", controller.DELETE_EVENT);

module.exports = router;
