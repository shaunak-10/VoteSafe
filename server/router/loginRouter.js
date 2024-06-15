const express = require("express");
const router = express.Router();
const loginController = require("../controllers/loginController");
const { verifyToken } = require("../controllers/loginController");
router.post("/login", loginController.loginController);
router.get("/getVoter/:id", verifyToken, loginController.voterController);
router.get(
  "/getCandidate/:id",
  verifyToken,
  loginController.candidateController
);
router.get("/getAdmin/:id", verifyToken, loginController.adminController);
module.exports = router;
