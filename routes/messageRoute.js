const express = require("express");
const messageController = require("../controller/messageController");
const { isAuthenticated } = require("../middleware/auth");

const router = express.Router();

router.post("/create", messageController.createMessage);
router.get("/getMessage", messageController.getAllMessage);
router.delete(
  "/deleteMessage/:id",
  isAuthenticated,
  messageController.DeleteMessage
);

module.exports = router;
