export const endPoints = {
  common: {
    changePassword: "/common/change-password",
    verifyOtp: "/common/verify-otp",
    logout: "/common/logout",
    refreshToken: "/common/refresh-token",
    getUser: "/common/auth/user",
  },

  admin: {
    auth: {
      register: "/admin/auth/register",
      login: "/admin/auth/login",
      logout: "/admin/auth/logout",
    },

    users: {
      add: "/admin/add-user",
      list: "/admin/users",
      toggleUserStatus: (id: string) => `/admin/user/toggleUserStatus/${id}`,
      getById: (id: string) => `/admin/users/${id}`,
      update: (id: string) => `/admin/users/${id}`,
      delete: (id: string) => `/admin/users/${id}`,
    },
  },

  manager: {
    auth: {
      login: "/manager/auth/login",
    },
  },

  employee: {
    auth: {
      login: "/employee/auth/login",
    },
  },

  records: {
    create: "/records/create",
    list: "/records/list",
    assignedToUser: "/records/assigned",
    getById: (id: string) => `/records/${id}`,
    update: (id: string) => `/records/${id}`,
    updateStatus: (id:string)=> `/records/${id}/status`,
    delete: (id: string) => `/records/${id}`,
  },

  products: {
    create: "/products/create",
    list: "/products/list",
    update: "/products/update",
    search: "/products/search",
    filter: "/products/filter",
    hardDelete: "/products/hard-delete",
    softDelete: "/products/soft-delete",
    restore: "/products/restore",
    trash: "/products/trash",
  },
};
