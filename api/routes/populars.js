const express = require("express");
const router = express.Router();

const controller = require("../controllers/populars");

router.get("/populars.json", controller.GET_POPULARS);

router.post("/", controller.POST_POPULARS);

router.delete("/", controller.DELETE_POPULARS);

module.exports = router;
