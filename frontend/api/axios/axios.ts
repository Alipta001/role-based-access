import axios, {
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";
import { endPoints } from "../endpoints/endPoints";

const BaseURL =
  process.env.NEXT_PUBLIC_BASE_URL ||
  "http://localhost:4000";

export const AxiosInstance = axios.create({
  baseURL: BaseURL,
  withCredentials: true,
});

interface CustomAxiosRequestConfig
  extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

AxiosInstance.interceptors.response.use(
  (response) => response,

  async (error: AxiosError) => {
    const originalRequest =
      error.config as CustomAxiosRequestConfig;

    if (!originalRequest) {
      return Promise.reject(error);
    }

    const url = originalRequest.url || "";

    const excludedRoutes = [
      endPoints.admin.auth.login,
      endPoints.manager.auth.login,
      endPoints.employee.auth.login,
      endPoints.common.logout,
      endPoints.common.refreshToken,
    ];

    const shouldSkip = excludedRoutes.some(
      (route) => url.includes(route)
    );

    if (shouldSkip) {
      return Promise.reject(error);
    }

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        await AxiosInstance.post(
          endPoints.common.refreshToken
        );

        return AxiosInstance(originalRequest);
      } catch (refreshError) {
        console.error(
          "Refresh token failed:",
          refreshError
        );

        if (typeof window !== "undefined") {
          const pathname =
            window.location.pathname;

          if (
            pathname.startsWith(
              "/adminDashboard"
            )
          ) {
            window.location.replace(
              "/adminLogin"
            );
          } else if (
            pathname.startsWith(
              "/managerDashboard"
            )
          ) {
            window.location.replace(
              "/managerLogin"
            );
          } else {
            window.location.replace(
              "/employeeLogin"
            );
          }
        }

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);