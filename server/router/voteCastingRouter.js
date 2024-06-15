const express = require("express");
const router = express.Router();
const voteCastingController = require("../controllers/voteCastingController");
router.post(
  "/vote/:vid/:eid/:cid",
  voteCastingController.voteCastingControllerBlockchain
);
module.exports = router;
