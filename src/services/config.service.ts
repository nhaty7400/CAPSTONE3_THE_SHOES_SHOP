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
   
   
    return config;
  },
  // dành cho call api thất bại
  (e) => {
    return Promise.reject(e);
  },
);
