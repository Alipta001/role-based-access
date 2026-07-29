export const endPoints = {
  auth:{
    register: "/auth/register",
  },
  product: {
    create: "/products/create",
    list: "/products/list",
    update: "/products/update",
    search: "/products/search",
    filter: "/products/filter",
    hardDelete: "/products/hard-delete",
    softDelete: "/products/soft-delete",
    restore: "/products/restore",
    trash: "/products/trash"
  },
  admin:{
    auth:{
      login: "/admin/auth/login",
      logout: "/admin/auth/logout"
    },
    addUser:"/admin/add-user",
    create: "/records/create",
    update: "/records/update",
    delete: "/records/delete"
  },
  
  manager:{
    auth:{
      login: "/auth/manager/login",
      logout: "/auth/manager/logout"
  }
},

  employee:{
    auth:{
      login: "/auth/employee/login",
      logout: "/auth/employee/logout"
    }
  }
};
