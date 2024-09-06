const express = require("express");
const skillController = require("../controller/skillController");
const { isAuthenticated } = require("../middleware/auth");

const router = express.Router();

router.post("/add-skill", isAuthenticated, skillController.addSkill);
router.put("/update-skill/:id", isAuthenticated, skillController.updateSkill);
router.delete(
  "/delete-skill/:id",
  isAuthenticated,
  skillController.deleteSkill
);
router.get("/all-skill", skillController.getAllSkill);
module.exports = router;
