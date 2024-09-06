const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  senderName: {
    type: String,
    require: [true, "message must have name"],
    minLength: [3, "Name must be contain 3 letter"],
  },
  subject: {
    type: String,
    require: [true, "message must have subject"],
    minLength: [3, "Subject must be contain 3 letter"],
  },
  message: {
    type: String,
    require: [true, "message must have message"],
    minLength: [3, "message must be contain 3 letter"],
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
