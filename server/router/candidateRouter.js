const express = require("express");
const router = express.Router();
const candidateController = require("../controllers/candidateController");
router.post(
  "/updateCandidate/:id",
  candidateController.updateCandidateController
);
module.exports = router;
