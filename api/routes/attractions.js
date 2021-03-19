const express = require("express");
const multer = require("multer");
const router = express.Router();

const controller = require("../controllers/attractions");

// Upload image
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
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

router.get("/attraction.json", controller.GET_ATTRACTIONS);

router.post("/", upload.single("image"), controller.POST_ATTRACTIONS);

router.delete("/delete/:id", controller.DELETE_ATTRACTIONS);

module.exports = router;
