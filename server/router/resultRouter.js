const express = require("express");
const router = express.Router();
const resultController = require("../controllers/resultController");
router.get("/result/:id", resultController.getResults);
router.get("/getUser/:id", resultController.getUser);
module.exports = router;
