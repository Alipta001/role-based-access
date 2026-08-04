const express = require("express");

const router = express.Router();

const ManagerController = require("../../controller/ManagerController");
const CommonController = require('../../controller/CommonController')

const AuthCheck = require("../../middleware/AuthCheck");

// login
router.post(
  "/auth/login",
  ManagerController.login
);

// get current user
router.get(
  "/auth/user",
  AuthCheck(["manager"]),
  CommonController.getUser
);


module.exports = router;