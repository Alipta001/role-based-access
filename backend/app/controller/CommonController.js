const User = require("../models/user");
const OtpModel = require("../models/otpModel");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendResetPasswordLink = require("../utils/sendResetPasswordLink");

class CommonController {
  // Change password
  async changePassword(req, res) {
    try {
      const { oldPassword, newPassword } = req.body;

      if (!oldPassword || !newPassword) {
        return res.status(422).json({
          status: false,
          message: "All fields are required.",
        });
      }

      const user = await User.findById(req.user.id);

      if (!user) {
        return res.status(404).json({
          status: false,
          message: "User not found.",
        });
      }

      const isMatch = await bcrypt.compare(oldPassword, user.password);

      if (!isMatch) {
        return res.status(401).json({
          status: false,
          message: "Old password is incorrect.",
        });
      }

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(newPassword, salt);

      user.firstLogin = false;

      await user.save();

      return res.status(200).json({
        status: true,
        message: "Password changed successfully.",
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        status: false,
        message: "Password change failed.",
      });
    }
  }

  // Reset Password Link
  // async resetPasswordLink(req, res) {
  //   try {
  //     const { email } = req.body;
  //     const user = await User.findOne({ email: email });
  //     if (!email) {
  //       return res.status(400).json({
  //         status: false,
  //         message: "Email is required!",
  //       });
  //     }
  //     if (!user) {
  //       return res.status(404).json({
  //         status: false,
  //         message: "User not found!",
  //       });
  //     }
  //     const secret = user._id + process.env.JWT_SECRET;
  //     const token = jwt.sign({ id: user._id }, secret, { expiresIn: "10m" });
  //     const resetLink = `${process.env.FRONTEND_URL}/resetPasswordLink/${user._id}/${token}`;
  //     sendResetPasswordLink(user, resetLink);

  //     return res.status(200).json({
  //       status: true,
  //       message: "Reset password link send to the registered email.",
  //     });
  //   } catch (error) {
  //     console.log("Error in forgetting password: ", error);
  //     return res.status(500).json({
  //       status: true,
  //       message: "Server Error. Please try again later!",
  //     });
  //   }
  // }


// Reset Password Link
async resetPasswordLink(req, res) {
  try {
    const { email } = req.body;

    // Validate email first
    if (!email) {
      return res.status(400).json({
        status: false,
        message: "Email is required!",
      });
    }

    // Find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User not found!",
      });
    }

    // Create reset token
    const secret =
      user._id.toString() + process.env.JWT_SECRET;

    const token = jwt.sign(
      {
        id: user._id,
      },
      secret,
      {
        expiresIn: "10m",
      }
    );

    // Create reset link
    const resetLink =
      `${process.env.FRONTEND_URL}/resetPassword/` +
      `${user._id}/${token}`;

    // IMPORTANT: wait until email is actually sent
    await sendResetPasswordLink(
      user,
      resetLink
    );

    return res.status(200).json({
      status: true,
      message:
        "Password reset link sent successfully to your registered email.",
    });

  } catch (error) {
    console.error(
      "Error in forgetting password:",
      error
    );

    return res.status(500).json({
      status: false,
      message:
        "Unable to send password reset email. Please try again later.",
    });
  }
}



  // Reset Password
  async resetPassword(req, res) {
    try {
      const { newPassword, confirmPassword } = req.body;
      const { userId, token } = req.params;
      if (!newPassword || !confirmPassword) {
        return res.status(400).json({
          status: false,
          message: "All fields are required!",
        });
      }
      if (newPassword != confirmPassword) {
        return res.status(400).json({
          status: false,
          message: "Password and confirm password should be same!",
        });
      }

      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({
          status: false,
          message: "User not found!",
        });
      }
      const secret = user._id + process.env.JWT_SECRET;
      try {
        jwt.verify(token, secret);
      } catch (err) {
        return res.status(400).json({
          status: false,
          message: "Invalid or expired reset link!",
        });
      }
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(newPassword, salt);
      await User.findByIdAndUpdate(userId, { password: passwordHash });
      await user.save();
      return res.status(200).json({
  status: true,
  message: "Password reset successful!",
  data: {
    role: user.role,
  },
});
    } catch (error) {
      console.log("Error in resetting password: ", error);
      return res.status(500).json({
        status: false,
        message: "Server Error. Please try again later!",
      });
    }
  }

  // // Verify OTP
  // async verifyOtp(req, res) {
  //   try {
  //     const { email, otp } = req.body;

  //     const user = await User.findOne({ email });

  //     if (!user) {
  //       return res.status(404).json({
  //         status: false,
  //         message: "User not found.",
  //       });
  //     }

  //     const otpTask = await OtpModel.findOne({
  //       userId: user._id,
  //       otp,
  //     });

  //     if (!otpTask) {
  //       return res.status(400).json({
  //         status: false,
  //         message: "Invalid OTP.",
  //       });
  //     }

  //     user.isVerified = true;

  //     await user.save();

  //     await OtpModel.deleteOne({
  //       userId: user._id,
  //     });

  //     return res.status(200).json({
  //       status: true,
  //       message: "OTP verified successfully.",
  //     });
  //   } catch (error) {
  //     console.error(error);

  //     return res.status(500).json({
  //       status: false,
  //       message: "OTP verification failed.",
  //     });
  //   }
  // }

  // Get currently logged-in user
  async getUser(req, res) {
    try {
      const user = await User.findById(req.user.id).select(
        "-password -refreshToken",
      );

      if (!user) {
        return res.status(404).json({
          status: false,
          message: "User not found.",
        });
      }

      return res.status(200).json({
        status: true,
        data: user,
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        status: false,
        message: "Unable to fetch user.",
      });
    }
  }

  // Refresh access token
  async refreshToken(req, res) {
    try {
      const refreshToken = req.cookies.refreshToken;

      if (!refreshToken) {
        return res.status(401).json({
          status: false,
          message: "Refresh token missing.",
        });
      }

      const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET);

      const user = await User.findById(decoded.id);

      if (!user) {
        return res.status(401).json({
          status: false,
          message: "User not found.",
        });
      }

      if (user.refreshToken !== refreshToken) {
        return res.status(401).json({
          status: false,
          message: "Invalid refresh token.",
        });
      }

      const accessToken = jwt.sign(
        {
          id: user._id,
          role: user.role,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "15m",
        },
      );

      res.cookie("token", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        maxAge: 15 * 60 * 1000,
        path: "/",
      });

      return res.status(200).json({
        status: true,
        token: accessToken,
      });
    } catch (error) {
      console.error(error);

      return res.status(401).json({
        status: false,
        message: "Refresh token expired.",
      });
    }
  }

  // Update user Details
  async updateUserDetails(req, res) {
    try {
      const id = req.user.id;

      const { name, phone, address, department } = req.body;

      const user = await User.findById(id);

      if (!user) {
        return res.status(404).json({
          status: false,
          message: "User not found.",
        });
      }

      user.name = name || user.name;
      user.phone = phone || user.phone;
      user.address = address || user.address;
      user.department = department || user.department;

      await user.save();

      return res.status(200).json({
        status: true,
        message: "Profile updated successfully.",
        data: user,
      });
    } catch (error) {
      console.error("Error while updating profile:", error);

      return res.status(500).json({
        status: false,
        message: "Unable to update profile. Please try again later.",
      });
    }
  }

  // Logout
  async logout(req, res) {
    try {
      const refreshToken = req.cookies?.refreshToken;

      if (refreshToken) {
        const user = await User.findOne({
          refreshToken,
        });

        if (user) {
          user.refreshToken = null;
          await user.save();
        }
      }

      res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        path: "/",
      });

      res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        path: "/",
      });

      return res.status(200).json({
        status: true,
        message: "Logout successful.",
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        status: false,
        message: "Logout failed.",
      });
    }
  }
}

module.exports = new CommonController();
