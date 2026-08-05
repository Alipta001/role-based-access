const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class EmployeeController {
  // Employee Login
  async login(req, res) {
  try {
    const { email, password } = req.body;

    // Find the user
    const user = await User.findOne({ email });

    if (!user || user.role !== "employee") {
      return res.status(401).json({
        status: false,
        message: "Invalid credentials.",
      });
    }

    // Verify password
    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(401).json({
        status: false,
        message: "Invalid credentials.",
      });
    }

    // Check whether the account is active
    if (user.status === "inactive") {
      return res.status(403).json({
        status: false,
        message:
          "Employee account has been deactivated. Please contact the administrator.",
      });
    }

    // Generate access token
    const accessToken = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "5m",
      }
    );

    // Generate refresh token
    const refreshToken = jwt.sign(
      {
        id: user._id,
      },
      process.env.REFRESH_SECRET,
      {
        expiresIn: "7d",
      }
    );

    // Save refresh token
    user.refreshToken = refreshToken;

    await user.save();

    // Create access token cookie
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

    // Create refresh token cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure:
        process.env.NODE_ENV === "production",
      sameSite:
        process.env.NODE_ENV === "production"
          ? "none"
          : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: "/",
    });

    // Return only the required fields
    const userData = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
    };

    return res.status(200).json({
      status: true,
      message: "Employee login successful.",
      data: userData,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      status: false,
      message: "Internal server error.",
    });
  }
}
}

module.exports = new EmployeeController();
