const express = require("express");
const router = express.Router();

const AuthCheck = require("../../middleware/AuthCheck");
const Authorize = require("../../middleware/Authorize");

const RecordController = require("../../controller/RecordController");

router.post(
  "/create",
  AuthCheck(),
  Authorize("create_record"),
  RecordController.createRecord
);

router.get(
  "/list",
  AuthCheck(),
  Authorize("read_record"),
  RecordController.getAllRecords
);

router.get("/assigned", AuthCheck(), Authorize("read_record"), RecordController.getRecordByUser);


router.get(
  "/:id",
  AuthCheck(),
  Authorize("read_record"),
  RecordController.getRecordById
);

router.patch(
  "/:id/status",
  AuthCheck(),
  Authorize("update_record_status"),
  RecordController.updateStatus
);

router.put(
  "/:id",
  AuthCheck(),
  Authorize("update_record"),
  RecordController.updateRecord
);

router.delete(
  "/:id",
  AuthCheck(),
  Authorize("delete_record"),
  RecordController.deleteRecord
);

module.exports = router;