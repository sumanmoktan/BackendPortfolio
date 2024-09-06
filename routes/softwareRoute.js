const express = require("express");
const softwareController = require("../controller/softwareController");
const { isAuthenticated } = require("../middleware/auth");

const router = express.Router();

router.post(
  "/add-software",
  isAuthenticated,
  softwareController.addNewApplication
);
router.delete(
  "/delete-software/:id",
  isAuthenticated,
  softwareController.deleteSoftwareApplication
);
router.get("/all-software", softwareController.getAllSoftware);
module.exports = router;
