import React from "react";
import { useFormik } from "formik";
import * as Y from "yup";
import { signup } from "src/services/user.service";
import { useNavigate } from "react-router-dom";
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
  email: Y.string().email().required(),
  userName: Y.string()
    .min(5, "User name phải lớn hơn 5 ký tự.")
    .max(20, "User name phải nhỏ hơn 20 ký tự.")
    .required("Bắt buộc nhập vào user name."),
  password: Y.string()
    .min(5, "User name phải lớn hơn 5 ký tự.")
    .max(20, "User name phải nhỏ hơn 20 ký tự.")
    .required("Bắt buộc nhập vào password."),
  confirmPassword: Y.string()
    .oneOf([Y.ref("password")], "Passwords must match")
    .required("Bắt buộc nhập vào confirm password."),
});

export type TParamsRegister = {
  email: string;
  password: string;
  name: string;
  gender: boolean;
  phone: string;
};

function Register() {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      userName: "", // giống tên name props của input
      password: "",
      confirmPassword: "",
      email: "",
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
      console.log({ value });
      const data: TParamsRegister = {
        email: value.email,
        gender: true,
        phone: "0123456789",
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

  console.log(formik.getFieldProps("userName"));

  return (
    <form onSubmit={formik.handleSubmit}>
      <input placeholder="Email" {...formik.getFieldProps("email")} />
      {formik.touched.email && formik.errors.email && (
        <p>{formik.errors.email}</p>
      )}
      <br />
      <input
        // name="userName"
        // onChange={formik.handleChange}
        // onBlur={formik.handleBlur}
        // value={formik.values.userName}
        placeholder="User name"
        {...formik.getFieldProps("userName")}
      />
      {formik.touched.userName && formik.errors.userName && (
        <p>{formik.errors.userName}</p>
      )}
      <br />
      <input placeholder="Password" {...formik.getFieldProps("password")} />
      {formik.touched.password && formik.errors.password && (
        <p>{formik.errors.password}</p>
      )}
      <br />
      <input
        placeholder="Confirm Password"
        {...formik.getFieldProps("confirmPassword")}
      />
      {formik.touched.confirmPassword && formik.errors.confirmPassword && (
        <p>{formik.errors.confirmPassword}</p>
      )}
      <br />
      <button type="submit">Submit</button>
    </form>
  );
}

export default Register;
