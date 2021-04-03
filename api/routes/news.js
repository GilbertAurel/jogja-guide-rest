const express = require("express");
const multer = require("multer");
const router = express.Router();

const controller = require("../controllers/news");

// Upload image
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, "news-" + file.originalname);
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

router.get("/news.json", controller.GET_NEWS);

router.post("/", upload.single("image"), controller.POST_NEWS);

router.delete("/delete/:id", controller.DELETE_NEWS);

module.exports = router;
