const express = require("express");

const router = express.Router();

const CommonController = require("../../controller/CommonController");
const AuthCheck = require("../../middleware/AuthCheck");

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

// Update user details
router.put("/update-details", AuthCheck(["admin", "manager", "employee"]), CommonController.updateUserDetails)

// logout
router.post(
  "/logout",
  AuthCheck(["admin", "manager", "employee"]),
  CommonController.logout
);

module.exports = router;