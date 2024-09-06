const express = require("express");
const timeController = require("../controller/timeController");
const { isAuthenticated } = require("../middleware/auth");

const router = express.Router();

router.post("/add-time", isAuthenticated, timeController.createTime);
router.get("/all-timeline", timeController.getalltimeline);
router.delete("/delete-time/:id", isAuthenticated, timeController.deleteTime);

module.exports = router;
