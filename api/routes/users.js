const express = require("express");
const router = express.Router();

const controller = require("../controllers/users");

router.get("/", controller.GET_USER);

router.post("/signup", controller.SIGNUP_USER);

router.post("/login", controller.LOGIN_USER);

router.delete("/delete/:userId", controller.DELETE_USER);

module.exports = router;
