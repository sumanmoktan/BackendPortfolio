const timeModel = require("../model/timeModel");
const catchAsync = require("../utils/catchAsync");
const appError = require("../utils/appError");

exports.createTime = catchAsync(async (req, res, next) => {
  const { title, description, from, to } = req.body;
  const newTimeline = await timeModel.create({
    title,
    description,
    timeline: { from, to },
  });
  res.status(200).json({
    success: true,
    message: "Timeline Added!",
    newTimeline,
  });
});

exports.deleteTime = catchAsync(async (req, res, next) => {
  const deletetime = await timeModel.findByIdAndDelete(req.params.id);

  if (!deletetime) {
    return next(new appError("timeline is not found with this id", 404));
  }

  res.status(200).json({
    status: "success",
    message: "Timeline delete successfully",
    deletetime: null,
  });
});

exports.getalltimeline = catchAsync(async (req, res, next) => {
  const timeline = await timeModel.find();

  res.status(200).json({
    status: "success",
    result: timeline.length,
    timeline,
  });
});
