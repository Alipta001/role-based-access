const User = require("../models/user");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const generatePassword = require("../utils/generatePassword")
const sendEmail = require("../utils/sendEmail");

class AdminController {
  //Add admin
  async addAdmin(req, res) {
    try {
      const { name, email, phone, password } = req.body;

      const existingUser = await User.findOne({
        email,
      });

      if (existingUser) {
        return res.status(400).json({
          status: false,
          message: "Email already exists.",
        });
      }

      const hashPassword = await bcrypt.hash(
        password,
        10
      );

      const admin = await User.create({
        name,
        email,
        phone,
        password: hashPassword,
        role: "admin",
      });

      return res.status(201).json({
        status: true,
        message: "Admin created successfully.",
        data: admin,
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        status: false,
        message: "Registration failed.",
      });
    }
  }

//Add User
  async addUser(req, res) {
  try {
    const {
      name,
      email,
      phone,
      role,
      department,
    } = req.body;

    const existingUser = await User.findOne({
      email,
    });

    if (existingUser) {
      return res.status(400).json({
        status: false,
        message: "User already exists.",
      });
    }

    const temporaryPassword =
      generatePassword();

    const hashedPassword = await bcrypt.hash(
      temporaryPassword,
      10
    );

    const user = await User.create({
      name,
      email,
      phone,
      department,
      role,
      password: hashedPassword,
    });

    await sendEmail(user, temporaryPassword);

    return res.status(201).json({
      status: true,
      message: `${user.role} created successfully. Temporary password is sent to registered email.`,
      data: {
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      status: false,
      message: "Unable to create user.",
    });
  }
}

//Admin login
  async login(req, res) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({
        email,
      });

      if (!user || user.role !== "admin") {
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
        message: "Admin login successful.",
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

  // Get all users
async getUsers(req, res) {
  try {
    const users = await User.find({
      role: {
        $in: ["manager", "employee"],
      },
    }).select("-password -refreshToken");

    return res.status(200).json({
      status: true,
      data: users,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      status: false,
      message: "Unable to fetch users.",
    });
  }
}

//Toggle user status
async toggleUserStatus(req, res) {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User not found.",
      });
    }

    user.status =
      user.status === "active"
        ? "inactive"
        : "active";

    if (user.status === "inactive") {
      user.refreshToken = null;
    }

    await user.save();

    return res.status(200).json({
      status: true,
      message: `User ${user.status} successfully.`,
      data: user,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
}

  //Logout
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
        message: "Admin logged out successfully.",
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

module.exports = new AdminController();