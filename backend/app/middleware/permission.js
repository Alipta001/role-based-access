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
  ],

  manager: [
    "create_record",
    "read_record",
    "update_record",
  ],

  employee: [
    "read_record",
  ],
};

module.exports = permissions;