const express = require("express");
const projectController = require("../controller/projectController");
const { isAuthenticated } = require("../middleware/auth");

const router = express.Router();

router.post("/add-project", isAuthenticated, projectController.addProject);
router.put(
  "/update-project/:id",
  isAuthenticated,
  projectController.updateProject
);
router.delete(
  "/delete-project/:id",
  isAuthenticated,
  projectController.deleteProject
);
router.get("/get-project", projectController.getAllProject);
router.get("/detail-project/:id", projectController.DetailsProject);

module.exports = router;
