const cloudinary = require("cloudinary").v2;
const softwareModel = require("../model/softwareModel");
const catchAsync = require("../utils/catchAsync");
const appError = require("../utils/appError");

exports.addNewApplication = catchAsync(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new appError("Software Application Icon/Image Required!", 404));
  }
  const { svg } = req.files;
  const { name } = req.body;
  if (!name) {
    return next(new appError("Please Provide Software's Name!", 400));
  }
  const cloudinaryResponse = await cloudinary.uploader.upload(
    svg.tempFilePath,
    { folder: "PORTFOLIO SOFTWARE APPLICATION IMAGES" }
  );
  if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.error(
      "Cloudinary Error:",
      cloudinaryResponse.error || "Unknown Cloudinary error"
    );
    return next(new appError("Failed to upload avatar to Cloudinary", 500));
  }
  const softwareApplication = await softwareModel.create({
    name,
    svg: {
      public_id: cloudinaryResponse.public_id, // Set your cloudinary public_id here
      url: cloudinaryResponse.secure_url, // Set your cloudinary secure_url here
    },
  });
  res.status(201).json({
    success: true,
    message: "New Software Application Added!",
    softwareApplication,
  });
});

exports.deleteSoftwareApplication = catchAsync(async (req, res, next) => {
  const softwareApplication = await softwareModel.findByIdAndDelete(
    req.params.id
  );
  if (!softwareApplication) {
    return next(new appError("Already Deleted!", 404));
  }
  const softwareApplicationSvgId = softwareApplication.svg.public_id;
  await cloudinary.uploader.destroy(softwareApplicationSvgId);
  res.status(200).json({
    success: true,
    message: "Software Application Deleted!",
    softwareApplication: null,
  });
});

exports.getAllSoftware = catchAsync(async (req, res, next) => {
  const softwareApplications = await softwareModel.find();

  res.status(200).json({
    status: "success",
    result: softwareApplications.length,
    softwareApplications,
  });
});
