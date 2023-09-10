import axios from "axios";
import { ACCESS_TOKEN } from "src/constants";
import { getLocalStorage } from "src/utils";

const BASE_URL = "https://shop.cyberlearn.vn/api";

export const axiosWithoutAuth = axios.create({
  baseURL: BASE_URL,
  timeout: 180_000, //ms -> 3 phút, sau 3 phút thì ngắt kết nối
});

export const axiosWithAuth = axios.create({
  baseURL: BASE_URL,
  timeout: 180_000,
});

// interceptor: đính kèm một vài thông tin trước khi gửi đi
axiosWithAuth.interceptors.request.use(
  // dành cho call api thành công
  (config) => {
    /**
     * config: là những setup thông tin của api đó
     */
    config.headers["Authorization"] = `Bearer ${getLocalStorage(ACCESS_TOKEN)}`;
   
    config.headers['TOKEN_CYBER_SOFT'] = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA1MDA4IiwiSGV0SGFuU3RyaW5nIjoiMjgvMDEvMjAyNCIsIkhldEhhblRpbWUiOiIxNzA2NDAwMDAwMDAwIiwibmJmIjoxNjc3NDMwODAwLCJleHAiOjE3MDY1NDc2MDB9.eo3y0MmcjE8Jl4fRzUJLBoZzylEeFDcUTfWXvtb1hdc`
   
    return config;
  },
  // dành cho call api thất bại
  (e) => {
    return Promise.reject(e);
  },
);
