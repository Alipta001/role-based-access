const express = require("express");

const router = express.Router();

const AdminController = require("../../controller/AdminController");
const CommonController = require('../../controller/CommonController')

const AuthCheck = require("../../middleware/AuthCheck");
const Authorize = require("../../middleware/Authorize");


router.post(
  "/auth/login",
  AdminController.login
);

router.post(
  "/add-user",
  AuthCheck(["admin"]),
  AdminController.addUser
);

router.get(
  "/users",
  AuthCheck(["admin"]),
  AdminController.getUsers
);

// router.patch(
//   "/users/:id",
//   AuthCheck(["admin"]),
//   AdminController.updateUser
// );

// router.delete(
//   "/users/:id",
//   AuthCheck(["admin"]),
//   AdminController.deleteUser
// );

module.exports = router;