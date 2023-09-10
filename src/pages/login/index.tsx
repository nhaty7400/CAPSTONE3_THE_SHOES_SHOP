import React, { useState } from "react";
import { userLogin } from "src/services/user.service";
import { useNavigate, Link } from "react-router-dom";
import { setLocalStorage } from "src/utils";
import { ACCESS_TOKEN } from "src/constants";
import css from "./login.module.scss";
import { useFormik } from "formik";
import * as Y from "yup";

const loginSchema = Y.object({
  email: Y.string()
    .email()
    .required("Bắt buộc nhập vào email")
    .email("email không hợp lệ"),
  password: Y.string()
    .min(5, "Password phải lớn hơn 5 ký tự.")
    .max(20, "Password phải nhỏ hơn 20 ký tự.")
    .required("Bắt buộc nhập vào password."),
});

export type TParamsLogin = {
  email: string;
  password: string;
};

function Login() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: loginSchema,

    onSubmit: function (value) {
      console.log({ value });
      const data: TParamsLogin = {
        email: value.email,
        password: value.password,
      };
      userLogin(data)
        .then((resp) => {
          /**
           * 1. lưu storage
           * 2. navigate profile
           */
          // localStorage.setItem(
          //   "accessToken",
          //   JSON.stringify(resp.content.accessToken),
          // );
          setLocalStorage(ACCESS_TOKEN, resp.content.accessToken);
          navigate("/profile");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });

  return (
    <form className={css["container"]} onSubmit={formik.handleSubmit}>
      <h2 className={css["title"]}>Login</h2>
      <div className={css["login-content"]}>
        <div>
          <div className={css["form-group"]}>
            <p className={css["login-title"]}>Email</p>
            <input
              className={css["login-input"]}
              placeholder="email"
              {...formik.getFieldProps("email")}
            />
            {formik.touched.email && formik.errors.email && (
              <p className={css["text-danger"]}>{formik.errors.email}</p>
            )}
          </div>
          <div className={css["form-group"]}>
            <p className={css["login-title"]}>Password</p>
            <input
              className={css["login-input"]}
              {...formik.getFieldProps("password")}
              placeholder="password"
            />
            {formik.touched.password && formik.errors.password && (
              <p className={css["text-danger"]}>{formik.errors.password}</p>
            )}
          </div>
          <div className={css["form-group"]}>
            <button className={css["login-button"]} type="submit">
              LOGIN
            </button>
            <Link to="/register" className={css["login-recommend"]}>
              Register now ?
            </Link>
            <br />
            <button className={css["login-button-facebook"]} type="submit">
              <i
                className="fa-brands fa-facebook"
                style={{
                  margin: "1rem",
                }}
              />
              Continue with Facebook
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Login;
