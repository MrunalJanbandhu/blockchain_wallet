const express = require("express");
const router = express.Router();
const controller = require("../controllers/tokenController");
const adminCheck = require("../middleware/adminCheck");

router.post("/mint", adminCheck, controller.mintToken);
router.post("/burn", adminCheck, controller.burnToken);
router.post("/transfer", controller.transferToken); // anyone can transfer
router.post("/balance", controller.balanceToken);   // anyone can query

module.exports = router;
