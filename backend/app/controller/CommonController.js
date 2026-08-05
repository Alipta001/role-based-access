const User = require("../models/user");
const OtpModel = require("../models/otpModel");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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

      const isMatch = await bcrypt.compare(
        oldPassword,
        user.password
      );

      if (!isMatch) {
        return res.status(401).json({
          status: false,
          message: "Old password is incorrect.",
        });
      }

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(
        newPassword,
        salt
      );

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

  // Verify OTP
  async verifyOtp(req, res) {
    try {
      const { email, otp } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({
          status: false,
          message: "User not found.",
        });
      }

      const otpTask = await OtpModel.findOne({
        userId: user._id,
        otp,
      });

      if (!otpTask) {
        return res.status(400).json({
          status: false,
          message: "Invalid OTP.",
        });
      }

      user.isVerified = true;

      await user.save();

      await OtpModel.deleteOne({
        userId: user._id,
      });

      return res.status(200).json({
        status: true,
        message: "OTP verified successfully.",
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        status: false,
        message: "OTP verification failed.",
      });
    }
  }

  // Get currently logged-in user
  async getUser(req, res) {
    try {
      const user = await User.findById(req.user.id).select(
        "-password -refreshToken"
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

      const decoded = jwt.verify(
        refreshToken,
        process.env.REFRESH_SECRET
      );

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
        }
      );

      res.cookie("token", accessToken, {
        httpOnly: true,
        secure:
          process.env.NODE_ENV === "production",
        sameSite:
          process.env.NODE_ENV === "production"
            ? "none"
            : "lax",
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

  // Logout
  async logout(req, res) {
    try {
      const refreshToken =
        req.cookies?.refreshToken;

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
        secure:
          process.env.NODE_ENV === "production",
        sameSite:
          process.env.NODE_ENV === "production"
            ? "none"
            : "lax",
        path: "/",
      });

      res.clearCookie("refreshToken", {
        httpOnly: true,
        secure:
          process.env.NODE_ENV === "production",
        sameSite:
          process.env.NODE_ENV === "production"
            ? "none"
            : "lax",
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