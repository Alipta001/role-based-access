const permissions = {
  admin: [
    "create_user",
    "view_user",
    "update_user",
    "delete_user",

    "create_task",
    "read_task",
    "update_task",
    "delete_task",
    "update_task_status",
  ],

  manager: [
    "create_task",
    "read_task",
    "update_task",
    "update_task_status",
  ],

  employee: [
    "read_task",
    "update_task_status",
  ],
};

module.exports = permissions;