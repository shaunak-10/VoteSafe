const express = require("express");
const router = express.Router();
const resetPasswordController = require("../controllers/resetPasswordController");
router.post(
  "/resetPassword/:id/:token",
  resetPasswordController.resetPasswordController
);
module.exports = router;
