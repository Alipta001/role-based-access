
export const endPoints = {
  common: {
    changePassword: "/common/change-password",
    verifyOtp: "/common/verify-otp",
    forgotPasswordLink: "/common/reset-password-link",
    forgotPassword: "/common/reset-password",
    logout: "/common/logout",
    updateUserDetails: "/common/update-details",
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
      assignableUsers: "/admin/assignable-users",
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

  tasks: {
    create: "/tasks/create",
    list: "/tasks/list",
    assignedToUser: "/tasks/assigned",
    getById: (id: string) => `/tasks/${id}`,
    update: (id: string) => `/tasks/${id}`,
    updateStatus: (id: string) => `/tasks/${id}/status`,
    delete: (id: string) => `/tasks/${id}`,
  },

  // products: {
  //   create: "/products/create",
  //   list: "/products/list",
  //   update: "/products/update",
  //   search: "/products/search",
  //   filter: "/products/filter",
  //   hardDelete: "/products/hard-delete",
  //   softDelete: "/products/soft-delete",
  //   restore: "/products/restore",
  //   trash: "/products/trash",
  // },
};
