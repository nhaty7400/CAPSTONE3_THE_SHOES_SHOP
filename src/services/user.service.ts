import { getLocalStorage } from "src/utils";
import { axiosWithAuth, axiosWithoutAuth } from "./config.service";
import axios from "axios";
import { ACCESS_TOKEN } from "src/constants";
import { TParamsRegister } from "src/pages/register";
import { Orders } from "src/pages/carts";

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
  const resp = await axiosWithAuth({
    url: "/Users/getProfile",
    method: "post", // 'POST'
  });

  return resp.data;
};

export const updateUserProfile = async (data: TParamsRegister) => {
  try {
    const resp = await axiosWithAuth({
      url: "/Users/updateProfile",
      method: "post",
    });
    return resp.data;
  } catch (err) {
    console.log(err);
  }
};

export const sendOrders = async (data: Orders) => {
  try {
    const resp = await axiosWithoutAuth({
      url: "/Users/order",
      method: "post",
      data,
    });
    alert("Order thành công");
    console.log(resp);
  } catch (err) {
    console.log(err);
  }
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
