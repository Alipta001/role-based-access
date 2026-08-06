const Task = require("../models/task");

/** Create Task */
class TaskController {
  
  /* Create Task*/
  async createTask(req, res) {
    try {
      const { title, description, status, priority, assigned_to, due_date } =
        req.body;

      if (!title || !description || !assigned_to) {
        return res.status(422).json({
          status: false,
          message: "Title, description and assigned-to are required.",
        });
      }

      const task = await Task.create({
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
        message: "Task created successfully.",
        data: task,
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        status: false,
        message: "Failed to create task.",
      });
    }
  }

  /** Get All Tasks */
  async getAllTasks(req, res) {
    try {
      const tasks = await Task.find({
        isDeleted: false,
      })
        .populate("created_by", "name email role")
        .populate("assigned_to", "name email role")
        .sort({ created_at: -1 });

      return res.status(200).json({
        status: true,
        count: tasks.length,
        data: tasks,
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        status: false,
        message: "Failed to fetch tasks.",
      });
    }
  }

  /** Get Single Task */
  async getTaskById(req, res) {
    try {
      const { id } = req.params;

      const task = await Task.findOne({
        _id: id,
        isDeleted: false,
      })
        .populate("created_by", "name email role")
        .populate("assigned_to", "name email role");

      if (!task) {
        return res.status(404).json({
          status: false,
          message: "Tasks not found.",
        });
      }

      return res.status(200).json({
        status: true,
        data: task,
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        status: false,
        message: "Failed to fetch task.",
      });
    }
  }

  /*Get Task by user*/
  async getTaskByUser(req, res) {
    try {
      const id = req.user.id;
      const tasks = await Task.find({
        assigned_to: id,
        isDeleted: false,
      })
        .populate("created_by", "name email role")
        .populate("assigned_to", "name email role")
        .sort({ created_at: -1 });

      if (!tasks) {
        return res.status(404).json({
          status: false,
          message: "Tasks not found.",
        });
      }
      return res.status(200).json({
        status: true,
        count: tasks.length,
        data: tasks,
      });
    } catch (error) {
      console.log("Error in getting tasks by user", error);
      return res.status(500).json({
        status: false,
        message: "Failed to fetch tasks by user.",
      });
    }
  }

  /** Update Task */
  async updateTask(req, res) {
    try {
      const { id } = req.params;

      const task = await Task.findOne({
        _id: id,
        isDeleted: false,
      });

      if (!task) {
        return res.status(404).json({
          status: false,
          message: "Task not found.",
        });
      }

      task.title = req.body.title ?? task.title;
      task.description = req.body.description ?? task.description;
      task.status = req.body.status ?? task.status;
      task.priority = req.body.priority ?? task.priority;
      task.assigned_to = req.body.assigned_to ?? task.assigned_to;
      task.due_date = req.body.due_date ?? task.due_date;

      task.updated_by = req.user.id;

      await task.save();

      return res.status(200).json({
        status: true,
        message: "Task updated successfully.",
        data: task,
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        status: false,
        message: "Failed to update task.",
      });
    }
  }

  /**Update status of the task */
  async updateStatus(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const task = await Task.findOne({
        _id: id,
        isDeleted: false,
      });

      if (!task) {
        return res.status(404).json({
          status: false,
          message: "Task not found.",
        });
      }

      if (
        req.user.role === "employee" &&
        task.assigned_to.toString() !== req.user.id
      ) {
        return res.status(403).json({
          status: false,
          message: "Access denied.",
        });
      }

      task.status = status;

      await task.save();

      return res.status(200).json({
        status: true,
        message: "Status updated successfully.",
        data: task,
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        status: false,
        message: "Failed to update status.",
      });
    }
  }

  /** Delete Task (Soft Delete) */
  async deleteTask(req, res) {
    try {
      const { id } = req.params;

      const task = await Task.findOne({
        _id: id,
        isDeleted: false,
      });

      if (!task) {
        return res.status(404).json({
          status: false,
          message: "Task not found.",
        });
      }

      task.isDeleted = true;
      task.updated_by = req.user.id;

      await task.save();

      return res.status(200).json({
        status: true,
        message: "Task deleted successfully.",
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        status: false,
        message: "Failed to delete task.",
      });
    }
  }
}

module.exports = new TaskController();
