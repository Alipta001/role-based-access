const express = require("express");

const router = express.Router();

const CommonController = require("../../app/controller/CommonController");
const AuthCheck = require("../middleware/AuthCheck");

// change password
router.patch(
  "/change-password",
  AuthCheck(["admin", "manager", "employee"]),
  CommonController.changePassword
);

router.get(
  "/auth/user",
  AuthCheck(["admin", "manager", "employee"]),
  CommonController.getUser
);
// verify OTP
router.post(
  "/verify-otp",
  CommonController.verifyOtp
);

// refresh token
router.post(
  "/refresh-token",
  CommonController.refreshToken
);

// logout
router.post(
  "/logout",
  AuthCheck(["admin", "manager", "employee"]),
  CommonController.logout
);

module.exports = router;