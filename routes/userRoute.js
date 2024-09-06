const express = require("express");
const useController = require("../controller/userController");
const { isAuthenticated } = require("../middleware/auth");
const router = express.Router();

router.post("/register", useController.register);
router.post("/login", useController.login);
router.get("/logout", isAuthenticated, useController.logout);

//for forgot password and resetpassword
router.post("/forgotPassword", useController.forgotPassword);
router.put("/resetPassword/:token", useController.resetPassword);

//user informations
router.get("/userDetails", isAuthenticated, useController.userDetails);
router.get("/userprofile", useController.getUser);
router.put("/update-me", isAuthenticated, useController.updateProfile);
router.put("/updatePassword", isAuthenticated, useController.updatePassword);

module.exports = router;
