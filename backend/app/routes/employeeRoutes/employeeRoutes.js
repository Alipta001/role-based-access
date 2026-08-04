const express = require("express");

const router = express.Router();

const EmployeeController = require("../../controller/EmployeeController");
const CommonController = require('../../controller/CommonController')
const AuthCheck = require("../../middleware/AuthCheck");

// login
router.post(
  "/auth/login",
  EmployeeController.login
);

// get current user
router.get(
  "/auth/user",
  AuthCheck(["employee"]),
  CommonController.getUser
);


module.exports = router;