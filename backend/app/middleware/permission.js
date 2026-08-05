const permissions = {
  admin: [
    "create_user",
    "view_user",
    "update_user",
    "delete_user",

    "create_record",
    "read_record",
    "update_record",
    "delete_record",
    "update_record_status",
  ],

  manager: [
    "create_record",
    "read_record",
    "update_record",
    "update_record_status",
  ],

  employee: [
    "read_record",
    "update_record_status",
  ],
};

module.exports = permissions;