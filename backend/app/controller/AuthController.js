const User = require("../models/user");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");
const OtpModel = require("../models/otpModel");

class AuthController {
  async addUser(req, res) {
    try {
      const { name, email, phone, role, department } = req.body;
      if (!name || !email || !phone || !role || !department) {
        req.flash("message", "All fields are required");
        req.flash("messageType", "danger");
        return res.status(422).json({
          status: false,
          message: "All fields are required!",
        });
      }

      const userExist = await User.findOne({ email });
      if (userExist) {
        return res.status(409).json({
          status: false,
          message: "User already exists!",
          data: userExist,
        });
      }
      const temporaryPassword = crypto
        .randomBytes(6)
        .toString("base64")
        .slice(0, 10);

      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(temporaryPassword, salt);
      const selectedRole = ["employee", "manager"].includes(role)
        ? role
        : "employee";

      const userdata = new User({
        name,
        email,
        phone,
        password: hashPassword,
        role: selectedRole,
        department: department,
        firstLogin: true,
      });

      const user = await userdata.save();
      await sendEmail(user, temporaryPassword);
      const redirectPath =
        selectedRole === "employee"
          ? "/employee/login"
          : selectedRole === "manager"
            ? "/manager/login"
            : "/login";

      return res.status(201).json({
        status: true,
        message: `${selectedRole} created successfully. Login credentials have been sent to the user's email.`,
        data: user,
      });
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({
        status: false,
        message: "User creation failed!",
      });
    }
  }

  //change password
  async changePassword(req, res) {
    try {
      const { oldPassword, newPassword } = req.body;
      if (!oldPassword || !newPassword) {
        return res.status(422).json({
          status: false,
          message: "Both old and new passwords are required!",
        });
      }

      const userId = req.user.id;
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({
          status: false,
          message: "User not found!",
        });
      }

      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) {
        return res.status(401).json({
          status: false,
          message: "Old password is incorrect!",
        });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
      user.password = hashedPassword;
      user.firstLogin = false;
      await user.save();

      return res.status(200).json({
        status: true,
        message: "Password changed successfully!",
        data: user,
      });
    } catch (error) {
      console.log("Password change error occurred:", error);
      return res.status(500).json({
        status: false,
        message: "Password change failed!",
      });
    }
  }

  //verify-otp
  async verifyOtp(req, res) {
    try {
      console.log("VERIFY OTP REQ BODY:", req.body);
      const { email, otp } = req.body;
      if (!email || !otp) {
        return res.status(422).json({
          status: false,
          message: "Email and OTP are required.",
        });
      }

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({
          status: false,
          message: "User not found.",
        });
      }

      if (user.isVerified) {
        return res.status(400).json({
          status: false,
          message: "User is already verified.",
        });
      }

      const otpRecord = await OtpModel.findOne({
        userId: user._id,
        otp,
      });

      if (!otpRecord) {
        await sendEmail(req, user);

        return res.status(400).json({
          status: false,
          message: "Invalid OTP. A new OTP has been sent.",
        });
      }

      // Check if OTP is expired
      const currentTime = new Date();
      const otpCreationTime = otpRecord.createdAt;
      const timeDifference = (currentTime - otpCreationTime) / 1000; // in seconds

      if (timeDifference > 15 * 60) {
        // 15 minutes
        await OtpModel.deleteOne({ userId: user._id, otp });
        sendEmail(req, user);
        return res.status(400).json({
          status: false,
          message: "OTP has expired. A new OTP has been sent to your email.",
        });
      }

      if (otpRecord.otp !== otp) {
        sendEmail(req, user);
        return res.status(400).json({
          status: false,
          message: "Invalid OTP.",
        });
      }

      // Mark user as verified
      user.isVerified = true;
      await user.save();

      // Delete the OTP record after successful verification
      await OtpModel.deleteOne({ userId: user._id, otp });

      return res.status(200).json({
        status: true,
        message: "OTP verified successfully. User is now verified.",
      });
    } catch (error) {
      console.error("OTP VERIFICATION ERROR:", error);
      return res.status(500).json({
        status: false,
        message: "Unable to verify OTP. Internal Server Error",
      });
    }
  }

  // Admin Login
  async adminlogin(req, res) {
    try {
      const { email, password } = req.body;

      // Validate input
      if (!email || !password) {
        return res.status(422).json({
          status: false,
          message: "Email and password are required.",
        });
      }

      // Find Admin
      const userExist = await User.findOne({
        email: email.toLowerCase().trim(),
      });

      if (!userExist) {
        return res.status(401).json({
          status: false,
          message: "Invalid email or password.",
        });
      }

      // Check role
      if (userExist.role !== "admin") {
        return res.status(403).json({
          status: false,
          message: "Please use the correct login page.",
        });
      }

      // Check password
      const isMatch = await bcrypt.compare(password, userExist.password);

      if (!isMatch) {
        return res.status(401).json({
          status: false,
          message: "Invalid email or password.",
        });
      }

      // Generate access token
      const accessToken = jwt.sign(
        {
          id: userExist._id.toString(),
          name: userExist.name,
          email: userExist.email,
          role: userExist.role,
        },
        process.env.ADMIN_JWT_ACCESS_SECRET,
        {
          expiresIn: "5m",
        },
      );

      // Generate refresh token
      const refreshToken = jwt.sign(
        {
          id: userExist._id.toString(),
          role: userExist.role,
        },
        process.env.ADMIN_JWT_REFRESH_SECRET,
        {
          expiresIn: "7d",
        },
      );

      // Hash refresh token before saving it in MongoDB
      const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);

      // Save hashed refresh token in database
      userExist.refreshToken = hashedRefreshToken;

      await userExist.save();

      const isProduction = process.env.NODE_ENV === "production";

      // Set access token cookie
      res.cookie("token", accessToken, {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "lax",
        maxAge: 15 * 60 * 1000,
        path: "/",
      });

      // Set refresh token cookie
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
        path: "/",
      });

      return res.status(200).json({
        status: true,
        message: "Admin login successful. Welcome to Admin dashboard.",
        data: {
          id: userExist._id,
          name: userExist.name,
          email: userExist.email,
          role: userExist.role,
        },
      });
    } catch (error) {
      console.error("ADMIN LOGIN ERROR:", error);

      return res.status(500).json({
        status: false,
        message: "Internal Server Error.",
      });
    }
  }

  // Admin Refresh Token
  async adminRefreshToken(req, res) {
    try {
      // Get refresh token from HTTP-only cookie
      const refreshToken = req.cookies?.refreshToken;

      // Check whether refresh token exists
      if (!refreshToken) {
        return res.status(401).json({
          status: false,
          message: "Session expired. Please login again.",
        });
      }

      // Verify refresh token JWT
      const decoded = jwt.verify(
        refreshToken,
        process.env.ADMIN_JWT_REFRESH_SECRET,
      );

      // Find Admin using ID from refresh token
      const admin = await User.findById(decoded.id);

      // Check whether Admin exists
      if (!admin) {
        return res.status(401).json({
          status: false,
          message: "Admin account not found. Please login again.",
        });
      }

      // Verify Admin role
      if (admin.role !== "admin") {
        return res.status(403).json({
          status: false,
          message: "Unauthorized access.",
        });
      }

      // Check whether refresh token exists in database
      if (!admin.refreshToken) {
        return res.status(401).json({
          status: false,
          message: "Session is invalid. Please login again.",
        });
      }

      // Compare browser refresh token
      // with hashed refresh token in MongoDB
      const isRefreshTokenValid = await bcrypt.compare(
        refreshToken,
        admin.refreshToken,
      );

      if (!isRefreshTokenValid) {
        return res.status(401).json({
          status: false,
          message: "Invalid refresh token. Please login again.",
        });
      }

      // Generate a new access token
      const newAccessToken = jwt.sign(
        {
          id: admin._id.toString(),
          name: admin.name,
          email: admin.email,
          role: admin.role,
        },
        process.env.ADMIN_JWT_ACCESS_SECRET,
        {
          expiresIn: "5m",
        },
      );

      const isProduction = process.env.NODE_ENV === "production";

      // Set new access token in HTTP-only cookie
      res.cookie("token", newAccessToken, {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "lax",
        maxAge: 15 * 60 * 1000,
        path: "/",
      });

      return res.status(200).json({
        status: true,
        message: "Access token refreshed successfully.",
      });
    } catch (error) {
      console.error("ADMIN REFRESH TOKEN ERROR:", error);

      // Refresh token is expired or invalid
      if (
        error.name === "TokenExpiredError" ||
        error.name === "JsonWebTokenError"
      ) {
        return res.status(401).json({
          status: false,
          message: "Session expired. Please login again.",
        });
      }

      return res.status(500).json({
        status: false,
        message: "Internal Server Error.",
      });
    }
  }

  //Manager
  async managerloginstore(req, res) {
    try {
      const { email, password } = req.body;

      // Validate input
      if (!email || !password) {
        return res.status(422).json({
          status: false,
          message: "All fields are required!",
        });
      }

      // Find manager
      const userExist = await User.findOne({ email });

      if (!userExist) {
        return res.status(401).json({
          status: false,
          message: "Manager not found! Please register first.",
        });
      }

      // Verify password
      const isMatch = await bcrypt.compare(password, userExist.password);

      if (!isMatch) {
        return res.status(401).json({
          status: false,
          message: "Invalid credentials.",
        });
      }

      // Verify role
      if (userExist.role !== "manager") {
        return res.status(403).json({
          status: false,
          message: "Please use the correct login page.",
        });
      }

      // Generate JWT
      const token = jwt.sign(
        {
          id: userExist._id,
          name: userExist.name,
          email: userExist.email,
          role: userExist.role,
        },
        process.env.ADMIN_JWT_REFRESH_SECRET,
        {
          expiresIn: "1d",
        },
      );

      // Set HttpOnly Cookie
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        maxAge: 24 * 60 * 60 * 1000,
        path: "/",
      });

      return res.status(200).json({
        status: true,
        message: "Manager login successful. Welcome to Manager dashboard.",
        data: userExist,
        token,
      });
    } catch (error) {
      console.error("LOGIN ERROR:", error);

      return res.status(500).json({
        status: false,
        message: "Internal Server Error",
      });
    }
  }

  //Employee
  async employeelogin(req, res) {
    try {
      const { email, password } = req.body;

      // Validate input
      if (!email || !password) {
        return res.status(422).json({
          status: false,
          message: "All fields are required!",
        });
      }

      // Find employee
      const userExist = await User.findOne({ email });

      if (!userExist) {
        return res.status(401).json({
          status: false,
          message: "Employee not found! Please register first.",
        });
      }

      // Verify password
      const isMatch = await bcrypt.compare(password, userExist.password);

      if (!isMatch) {
        return res.status(401).json({
          status: false,
          message: "Invalid credentials.",
        });
      }

      // Verify role
      if (userExist.role !== "employee") {
        return res.status(403).json({
          status: false,
          message: "Please use the correct login page.",
        });
      }

      // Generate JWT
      const token = jwt.sign(
        {
          id: userExist._id,
          name: userExist.name,
          email: userExist.email,
          role: userExist.role,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1d",
        },
      );

      // Set HttpOnly Cookie
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        maxAge: 24 * 60 * 60 * 1000,
        path: "/",
      });

      return res.status(200).json({
        status: true,
        message: "Employee login successful. Welcome to Employee dashboard.",
        data: userExist,
        token,
      });
    } catch (error) {
      console.error("LOGIN ERROR:", error);

      return res.status(500).json({
        status: false,
        message: "Internal Server Error",
      });
    }
  }

  //Admin logout
  async adminLogout(req, res) {
    try {
      const token = req.cookies?.token;

      if (token) {
        try {
          const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

          await User.findByIdAndUpdate(decoded.id, {
            refreshToken: null,
          });
        } catch (error) {
          // Access token may already be expired.
          // The cookies should still be cleared.
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
        message: "Admin logged out successfully.",
      });
    } catch (error) {
      console.error("LOGOUT ERROR:", error);

      return res.status(500).json({
        status: false,
        message: "Internal Server Error.",
      });
    }
  }

  logout(req, res) {
    try {
      const role = req.user?.role;
      res.clearCookie("token");
      if (role === "admin")
        return res.status(200).json({
          status: true,
          message: "Admin Logout Successfull.",
        });
      if (role === "manager")
        return res.status(200).json({
          status: true,
          message: "Manager Logout Successfull.",
        });
      if (role === "employee")
        return res.status(200).json({
          status: true,
          message: "Employee Logout Successfull.",
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

module.exports = new AuthController();
