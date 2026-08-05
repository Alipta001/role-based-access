const express = require("express");
const router = express.Router();

const AuthCheck = require("../../middleware/AuthCheck");
const Authorize = require("../../middleware/Authorize");

const TaskController = require("../../controller/TaskController");

router.post(
  "/create",
  AuthCheck(),
  Authorize("create_task"),
  TaskController.createTask
);

router.get(
  "/list",
  AuthCheck(),
  Authorize("read_task"),
  TaskController.getAllTasks
);

router.get("/assigned", AuthCheck(), Authorize("read_task"), TaskController.getTaskByUser);


router.get(
  "/:id",
  AuthCheck(),
  Authorize("read_task"),
  TaskController.getTaskById
);

router.patch(
  "/:id/status",
  AuthCheck(),
  Authorize("update_task_status"),
  TaskController.updateStatus
);

router.put(
  "/:id",
  AuthCheck(),
  Authorize("update_task"),
  TaskController.updateTask
);

router.delete(
  "/:id",
  AuthCheck(),
  Authorize("delete_task"),
  TaskController.deleteTask
);

module.exports = router;