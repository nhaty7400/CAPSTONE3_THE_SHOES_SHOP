import React, { useState } from "react";
import { userLogin } from "src/services/user.service";
import { useNavigate, Link } from "react-router-dom";
import { refresh, setLocalStorage } from "src/utils";
import { ACCESS_TOKEN, EMAIL } from "src/constants";
import css from "./login.module.scss";
import { useFormik } from "formik";
import * as Y from "yup";
import LoginFacebook from "./login-facebook/login-facebook";


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
          setLocalStorage(EMAIL, data.email);
          
          navigate("/profile");
          // refresh();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });

  return (
    <div>
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
                type="password"
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
            </div>
          </div>
        </div>
      </form>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <LoginFacebook />
      </div>
    </div>
  );
}

export default Login;
