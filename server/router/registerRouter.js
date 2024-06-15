const express = require("express");
const router = express.Router();
const registerController = require("../controllers/registerController");
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: "dcsbivbp8",
  api_key: "946228825769365",
  api_secret: "aeC5hpd6HSCStwlcvUnZ3Y1XkXo",
  secure: true,
});

router.post("/register", registerController.registerController);
module.exports = router;
