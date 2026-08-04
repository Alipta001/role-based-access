const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class EmployeeController {

  // Employee Login
  async login(req, res) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user || user.role !== "employee") {
        return res.status(401).json({
          status: false,
          message: "Invalid credentials.",
        });
      }

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

      const refreshToken = jwt.sign(
        {
          id: user._id,
        },
        process.env.REFRESH_SECRET,
        {
          expiresIn: "7d",
        }
      );

      user.refreshToken = refreshToken;

      await user.save();

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

      return res.status(200).json({
        status: true,
        message: "Employee login successful.",
        data: user,
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