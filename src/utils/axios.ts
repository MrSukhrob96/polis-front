import axios, { AxiosError } from "axios";

export const APP_API = "http://localhost:8000/api/v1";

const httpApi = axios.create({
  baseURL: APP_API,
  headers: {
    Accept: "application/json",
    "Content-type": "application/json; charset=utf-8",
    "cache-control": "no-cache, private",
  },
  withCredentials: true,
});

httpApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  function (error: AxiosError) {
    return Promise.reject(error);
  }
);

httpApi.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        let token = window.localStorage.getItem("accessToken") || "";

        const response = await httpApi.post("/auth/refreshToken", token);
        token = response.data?.accessToken || "";
        window.localStorage.setItem("accessToken", token);
        httpApi.defaults.headers.common.Authorization = `Bearer ${token}`;

        return httpApi(originalRequest);
      } catch (refreshTokenError) {
        return Promise.reject(refreshTokenError);
      }
    }
    return Promise.reject(error);
  }
);

export default httpApi;
