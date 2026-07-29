// import axios, { type InternalAxiosRequestConfig } from "axios";

// export const BaseURL = "http://localhost:4000";

// export const AxiosInstance = axios.create({
//   baseURL: BaseURL,
// });

// // Add interceptor to attach token
// AxiosInstance.interceptors.request.use(
//   (config: InternalAxiosRequestConfig) => {
//     let token: string | null = null;

//     if (typeof window !== "undefined" && window.localStorage) {
//       token = localStorage.getItem("token");
//     }

//     if (token) {
//       config.headers.set("Authorization", `Bearer ${token}`);
//     }

//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );


import axios, {
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";

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

// ==========================================
// RESPONSE INTERCEPTOR
// ==========================================

AxiosInstance.interceptors.response.use(
  (response) => response,

  async (error: AxiosError) => {
    const originalRequest =
      error.config as CustomAxiosRequestConfig;

    // Request itself failed
    if (!originalRequest) {
      return Promise.reject(error);
    }

    // Do NOT try refreshing these APIs
    const url = originalRequest.url || "";

    if (
      url.includes("/auth/login") ||
      url.includes("/auth/logout") ||
      url.includes("/auth/refresh-token")
    ) {
      return Promise.reject(error);
    }

    // Refresh only once
    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        console.log("Refreshing access token...");

        await AxiosInstance.post(
          "/admin/auth/refresh-token"
        );

        console.log("Access token refreshed.");

        // Retry original request
        return AxiosInstance(originalRequest);

      } catch (refreshError) {
        console.error(
          "Refresh token failed:",
          refreshError
        );

        // Redirect only if session actually expired
        if (typeof window !== "undefined") {
          window.location.replace("/adminLogin");
        }

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);