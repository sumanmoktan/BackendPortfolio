const catchAsync = require("../utils/catchAsync");
const appError = require("../utils/appError");
const messageModel = require("../model/messageModel");
const Message = require("../model/messageModel");
const { findByIdAndDelete } = require("../model/userModel");

exports.createMessage = catchAsync(async (req, res, next) => {
  const { senderName, subject, message } = req.body;

  if (!senderName || !subject || !message) {
    return next(new appError("All field must be require", 400));
  }

  const Data = await messageModel.create({ senderName, subject, message });

  res.status(200).json({
    status: "success",
    message: "successfulklly created message",
    Data,
  });
});

exports.getAllMessage = catchAsync(async (req, res, next) => {
  const messages = await messageModel.find();

  res.status(200).json({
    status: true,
    result: messages.length,
    messages,
  });
});

exports.DeleteMessage = catchAsync(async (req, res, next) => {
  const deleteMessage = await messageModel.findByIdAndDelete(req.params.id);
  if (!deleteMessage) {
    return next(new appError("Message is not found with this id", 404));
  }

  res.status(200).json({
    success: "success",
    message: "Delete successfully",
    data: null,
  });
});
