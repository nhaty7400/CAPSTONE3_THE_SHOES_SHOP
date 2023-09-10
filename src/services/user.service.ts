import { getLocalStorage } from "src/utils";
import { axiosWithAuth, axiosWithoutAuth } from "./config.service";
import axios from "axios";
import { ACCESS_TOKEN } from "src/constants";
import { TParamsRegister } from "src/pages/register";

export const userLogin = async (data: { email: string; password: string }) => {
  try {
    const resp = await axiosWithoutAuth({
      method: "post",
      url: "/Users/signin",
      data,
    });

    return resp.data;
  } catch (error) {
    console.log(error);
  }
};

export const getUserProfile = async () => {
  // const resp = await axios({
  //   url: "https://shop.cyberlearn.vn/api/Users/getProfile",
  //   method: "post",
  //   headers: {
  //     Authorization: `Bearer ${getLocalStorage(ACCESS_TOKEN)}`,
  //   },
  // });

  // return resp.data;

  const resp = await axiosWithAuth({
    url: "/Users/getProfile",
    method: "post", // 'POST'
  });

  return resp.data;
};

export const signup = async (data: TParamsRegister) => {
  try {
    const resp = await axiosWithoutAuth({
      method: "post",
      url: "/Users/signup",
      data,
    });
    return resp.data;
  } catch (err) {
    console.log(err);
  }
};
