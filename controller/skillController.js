const cloudinary = require("cloudinary").v2;
const catchAsync = require("../utils/catchAsync");
const appError = require("../utils/appError");
const skillModel = require("../model/skillModel");

exports.addSkill = catchAsync(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new appError("Image For Skill Required!", 404));
  }
  const { svg } = req.files;
  const { title, proficiency } = req.body;
  if (!title || !proficiency) {
    return next(new appError("Please Fill Full Form!", 400));
  }
  const cloudinaryResponse = await cloudinary.uploader.upload(
    svg.tempFilePath,
    { folder: "PORTFOLIO SKILL IMAGES" }
  );
  if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.error(
      "Cloudinary Error:",
      cloudinaryResponse.error || "Unknown Cloudinary error"
    );
    return next(new appError("Failed to upload avatar to Cloudinary", 500));
  }
  const skill = await skillModel.create({
    title,
    proficiency,
    svg: {
      public_id: cloudinaryResponse.public_id, // Set your cloudinary public_id here
      url: cloudinaryResponse.secure_url, // Set your cloudinary secure_url here
    },
  });
  res.status(201).json({
    success: true,
    message: "New Skill Added",
    skill,
  });
});

exports.updateSkill = catchAsync(async (req, res, next) => {
  const skill = await skillModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  if (!skill) {
    return next(new appError("Skill not found!", 404));
  }
  res.status(200).json({
    success: true,
    message: "Skill Updated!",
    skill,
  });
});

exports.deleteSkill = catchAsync(async (req, res, next) => {
  const skill = await skillModel.findByIdAndDelete(req.params.id);
  const skillSvgId = skill.svg.public_id;
  await cloudinary.uploader.destroy(skillSvgId);

  if (!skill) {
    return next(new appError("Already Deleted!", 404));
  }
  res.status(200).json({
    success: true,
    message: "Skill Deleted!",
  });
});

exports.getAllSkill = catchAsync(async (req, res, next) => {
  const skills = await skillModel.find();

  res.status(200).json({
    status: true,
    result: skills.length,
    skills,
  });
});
