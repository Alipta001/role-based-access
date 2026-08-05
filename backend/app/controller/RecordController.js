const Record = require("../models/record");

/** Create Record */
class RecordController{
    async createRecord(req, res){
  try {
    const { title, description, status, priority, assigned_to, due_date } =
      req.body;

    if (!title || !description) {
      return res.status(422).json({
        status: false,
        message: "Title and description are required.",
      });
    }

    const record = await Record.create({
      title,
      description,
      status,
      priority,
      assigned_to,
      due_date,
      created_by: req.user.id,
      updated_by: req.user.id,
    });

    return res.status(201).json({
      status: true,
      message: "Record created successfully.",
      data: record,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      status: false,
      message: "Failed to create record.",
    });
  }
};

/** Get All Records */
async getAllRecords(req, res){
  try {
    const records = await Record.find({
      isDeleted: false,
    })
      .populate("created_by", "name email role")
      .populate("assigned_to", "name email role")
      .sort({ created_at: -1 });

    return res.status(200).json({
      status: true,
      count: records.length,
      data: records,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      status: false,
      message: "Failed to fetch records.",
    });
  }
};

/** Get Single Record */
async getRecordById(req, res){
  try {
    const { id } = req.params;

    const record = await Record.findOne({
      _id: id,
      isDeleted: false,
    })
      .populate("created_by", "name email role")
      .populate("assigned_to", "name email role");

    if (!record) {
      return res.status(404).json({
        status: false,
        message: "Record not found.",
      });
    }

    return res.status(200).json({
      status: true,
      data: record,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      status: false,
      message: "Failed to fetch record.",
    });
  }
};

/*Get Record by user*/
async getRecordByUser(req, res){
  try{
    const id = req.user.id;
    const records = await Record.find({
      assigned_to: id,
      isDeleted: false,
    })
    .populate("created_by", "name email role")
    .populate("assigned_to", "name email role")
    .sort({ created_at: -1 });
    return res.status(200).json({
      status: true,
      count: records.length,
      data: records,
    });
  }catch(error){
    console.log("Error in getting records by user", error);
    return res.status(500).json({
      status: false,
      message:"Failed to fetch records by user.",
    })
  }
}

/** Update Record */
async updateRecord(req, res){
  try {
    const { id } = req.params;

    const record = await Record.findOne({
      _id: id,
      isDeleted: false,
    });

    if (!record) {
      return res.status(404).json({
        status: false,
        message: "Record not found.",
      });
    }

    record.title = req.body.title ?? record.title;
    record.description = req.body.description ?? record.description;
    record.status = req.body.status ?? record.status;
    record.priority = req.body.priority ?? record.priority;
    record.assigned_to = req.body.assigned_to ?? record.assigned_to;
    record.due_date = req.body.due_date ?? record.due_date;

    record.updated_by = req.user.id;

    await record.save();

    return res.status(200).json({
      status: true,
      message: "Record updated successfully.",
      data: record,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      status: false,
      message: "Failed to update record.",
    });
  }
};

/**Update status of the record */
async updateStatus(req, res) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const record = await Record.findOne({
      _id: id,
      isDeleted: false,
    });

    if (!record) {
      return res.status(404).json({
        status: false,
        message: "Record not found.",
      });
    }

    if (
      req.user.role === "employee" &&
      record.assigned_to.toString() !== req.user.id
    ) {
      return res.status(403).json({
        status: false,
        message: "Access denied.",
      });
    }

    record.status = status;

    await record.save();

    return res.status(200).json({
      status: true,
      message: "Status updated successfully.",
      data: record,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      status: false,
      message: "Failed to update status.",
    });
  }
}

/** Delete Record (Soft Delete) */
async deleteRecord(req, res){
  try {
    const { id } = req.params;

    const record = await Record.findOne({
      _id: id,
      isDeleted: false,
    });

    if (!record) {
      return res.status(404).json({
        status: false,
        message: "Record not found.",
      });
    }

    record.isDeleted = true;
    record.updated_by = req.user.id;

    await record.save();

    return res.status(200).json({
      status: true,
      message: "Record deleted successfully.",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      status: false,
      message: "Failed to delete record.",
    });
  }
};
}

module.exports = new RecordController();