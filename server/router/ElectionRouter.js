const express = require("express");
const router = express.Router();
const electionController = require("../controllers/electionController");
router.post("/createElection/:id", electionController.electionCreateController);
router.get("/getAdminElections/:id", electionController.getAdminElections);
router.get("/getVoterElections/:id", electionController.getVoterElections);
router.get(
  "/getCandidateElections/:id",
  electionController.getCandidateElections
);
router.get("/getElection/:eid", electionController.getElection);
module.exports = router;
