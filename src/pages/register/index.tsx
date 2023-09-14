import React from "react";
import { Field, useFormik } from "formik";
import * as Y from "yup";
import { signup } from "src/services/user.service";
import { useNavigate } from "react-router-dom";
import css from "./register.module.scss";
/**
 *
 * 2 sự lựa chọn
 * 1. sử dụng component có sẵn của formik: <Formik/>, <Field/>: contextApi
 * 2. sử dụng hooks useFormik
 *
 *
 * ưu tiên sử dụng useFormik
 */

const registerSchema = Y.object({
  email: Y.string()
    .email()
    .required("Bắt buộc nhập vào email")
    .email("email không hợp lệ"),
  userName: Y.string()
    .min(5, "User name phải lớn hơn 5 ký tự.")
    .max(20, "User name phải nhỏ hơn 20 ký tự.")
    .required("Bắt buộc nhập vào user name."),
  password: Y.string()
    .min(5, "Password phải lớn hơn 5 ký tự.")
    .max(20, "Password phải nhỏ hơn 20 ký tự.")
    .required("Bắt buộc nhập vào password."),
  confirmPassword: Y.string()
    .oneOf([Y.ref("password")], "Confirm password must match")
    .required("Bắt buộc nhập vào confirm password."),
  phone: Y.string()
    .min(9, "Số điện thoại phải lớn hơn 9 số.")
    .max(10, "Số điện thoại phải nhỏ hơn 10 số.")
    .required("Bắt buộc nhập vào số điện thoại."),
  gender: Y.boolean().required("Bắt buộc chọn giới tính."),
});

export type TParamsRegister = {
  email: string | undefined;
  password: string | undefined;
  name: string | undefined;
  gender: any;
  phone: string | undefined;
};

function Register() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      userName: "", // giống tên name props của input
      password: "",
      confirmPassword: "",
      email: "",
      phone: "",
      gender: "",
    },

    // chọn 1 trong 2
    // 1. sử dụng thư viện
    validationSchema: registerSchema,

    // 2. lựa chọn validate thủ công
    // validate: (value) => {
    //   const errors: Partial<typeof value> = {};

    //   /**
    //    * user name: - bắt buộc
    //    *            - từ 5-20 ký tự
    //    * password:  - bắt buộc
    //    *            - từ 5-20 ký tự
    //    */
    //   if (!value.userName) {
    //     errors.userName = "User name yêu cầu bắt buộc.";
    //   } else if (value.userName.length > 20 || value.userName.length < 5) {
    //     errors.userName = "User name phải từ 5 tới 20 ký tự.";
    //   }

    //   if (!value.password) {
    //     errors.password = "User name yêu cầu bắt buộc.";
    //   } else if (value.userName.length > 20 || value.password.length < 5) {
    //     errors.password = "User name phải từ 5 tới 20 ký tự.";
    //   }

    //   if (!value.confirmPassword) {
    //     errors.confirmPassword = "User name yêu cầu bắt buộc.";
    //   } else if (value.confirmPassword !== value.password) {
    //     errors.confirmPassword =
    //       "Confirm password phải trùng khớp với lại password";
    //   }

    //   return errors;
    // },

    onSubmit: (value) => {
      const data: TParamsRegister = {
        email: value.email,
        gender: value.gender === "true" ? true : false,
        phone: value.phone,
        password: value.password,
        name: value.userName,
      };

      signup(data)
        .then((resp) => {
          alert("Ok");
          navigate("/login");
        })
        .catch(() => {
          alert("error");
        });
    },
  });

  return (
    <form className={css["container"]} onSubmit={formik.handleSubmit}>
      <h2 className={css["title"]}>Register</h2>
      <div className={css["content"]}>
        <div className={css["column"]}>
          <div className={css["form-group"]}>
            <p className={css["register-title"]}>Email</p>
            <input
              className={css["register-input"]}
              placeholder="Email"
              {...formik.getFieldProps("email")}
            />
            {formik.touched.email && formik.errors.email && (
              <p className={css["text-danger"]}>{formik.errors.email}</p>
            )}
          </div>
          <div className={css["form-group"]}>
            <p className={css["register-title"]}>Password</p>
            <input
              type="password"
              className={css["register-input"]}
              placeholder="Password"
              {...formik.getFieldProps("password")}
            />
            {formik.touched.password && formik.errors.password && (
              <p className={css["text-danger"]}>{formik.errors.password}</p>
            )}
          </div>
          <div className={css["form-group"]}>
            <p className={css["register-title"]}>Confirm password</p>
            <input
              type="password"
              className={css["register-input"]}
              placeholder="Confirm Password"
              {...formik.getFieldProps("confirmPassword")}
            />
            {formik.touched.confirmPassword &&
              formik.errors.confirmPassword && (
                <p className={css["text-danger"]}>
                  {formik.errors.confirmPassword}
                </p>
              )}
          </div>
        </div>
        <div className={css["column"]}>
          <div className={css["form-group"]}>
            <p className={css["register-title"]}>User Name</p>
            <input
              className={css["register-input"]}
              placeholder="User name"
              {...formik.getFieldProps("userName")}
            />
            {formik.touched.userName && formik.errors.userName && (
              <p className={css["text-danger"]}>{formik.errors.userName}</p>
            )}
          </div>
          <div className={css["form-group"]}>
            <p className={css["register-title"]}>Phone</p>
            <input
              className={css["register-input"]}
              placeholder="Phone"
              {...formik.getFieldProps("phone")}
            />
            {formik.touched.phone && formik.errors.phone && (
              <p className={css["text-danger"]}>{formik.errors.phone}</p>
            )}
          </div>
          <div className={css["form-group"]}>
            <p className={css["register-title"]}>Gender</p>
            <div className={css["radio-group"]}>
              <input
                {...formik.getFieldProps("gender")}
                type="radio"
                name="gender"
                id="male"
                value="true"
              />
              <label htmlFor="male">Male</label>
              <input
                {...formik.getFieldProps("gender")}
                type="radio"
                name="gender"
                id="female"
                value="false"
              />
              <label htmlFor="female">Female</label>
            </div>
            {formik.errors.gender && (
              <p className={css["text-danger"]}>{formik.errors.gender}</p>
            )}
          </div>
        </div>
      </div>

      <br />
      <div className={css["button-container"]}>
        <button className={css["submit-button"]} type="submit">
          Submit
        </button>
      </div>
    </form>
  );
}

export default Register;
