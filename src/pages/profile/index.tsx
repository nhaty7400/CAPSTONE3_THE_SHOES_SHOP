import React, { useEffect, useState, useMemo } from "react";
import { getUserProfile, updateUserProfile } from "src/services/user.service";
import css from "./profile.module.scss";
import { Field, useFormik } from "formik";
import * as Y from "yup";
import { TParamsRegister } from "../register";

const profileSchema = Y.object({
  email: Y.string()
    .email()
    .required("Bắt buộc nhập vào email")
    .email("email không hợp lệ")
    .nullable(),
  userName: Y.string()
    .min(5, "User name phải lớn hơn 5 ký tự.")
    .max(20, "User name phải nhỏ hơn 20 ký tự.")
    .required("Bắt buộc nhập vào user name.")
    .nullable(),
  password: Y.string()
    .min(5, "Password phải lớn hơn 5 ký tự.")
    .max(20, "Password phải nhỏ hơn 20 ký tự.")
    .required("Bắt buộc nhập vào password.")
    .nullable(),
  phone: Y.string()
    .min(9, "Số điện thoại phải lớn hơn 9 số.")
    .max(10, "Số điện thoại phải nhỏ hơn 10 số.")
    .required("Bắt buộc nhập vào số điện thoại.")
    .nullable(),
  gender: Y.boolean().required("Bắt buộc chọn giới tính.").nullable(),
});

// export type Profile = {
//   orderHistory: any[];
//   name: string | undefined;
//   email: string | undefined;
//   phone: string | undefined;
//   gender: any;
// };

function Profile() {
  const [profile, setProfile] = useState<any>();

  useEffect(() => {
    (async () => {
      const resp = await getUserProfile();
      setProfile(resp.content);
    })();
  }, []);

  const formik: any = useFormik({
    initialValues: {
      userName: profile?.name,
      password: "",
      email: profile?.email,
      phone: profile?.phone,
      gender: "",
    },

    validationSchema: profileSchema,
    enableReinitialize: true,

    onSubmit: (value) => {
      const data: TParamsRegister = {
        email: value.email,
        gender: value.gender === "true" ? true : false,
        phone: value.phone,
        password: value.password,
        name: value.userName,
      };

      console.log(data);

      updateUserProfile(data)
        .then((resp) => {
          alert("Update thành công");
        })
        .catch((e) => {
          console.log(e);
        });
    },
  });

  const ordersHistory: any = profile?.ordersHistory;
  const renderOrdersHistory = (ordersHistory: any[]) => {
    const result = ordersHistory?.map((order, index) => {
      return (
        <div key={index} className={css["table-container"]}>
          <h3 className={css["table-title"]}>
            Order has been placed on {order.date}
          </h3>
          <table className={css["table"]}>
            <thead>
              <tr className={css["table-head"]}>
                <th className={css["table-text"]}>id</th>
                <th className={css["table-text"]}>img</th>
                <th className={css["table-text"]}>name</th>
                <th className={css["table-text"]}>price</th>
                <th className={css["table-text"]}>quantity</th>
                <th className={css["table-text"]}>total</th>
              </tr>
            </thead>
            <tbody>{renderOrdersDetail(order.orderDetail)}</tbody>
          </table>
        </div>
      );
    });
    return result;
  };

  const renderOrdersDetail = (ordersDetail: any[]) => {
    const result = ordersDetail?.map((item, index) => {
      return (
        <tr className={css["table-body"]} key={item.id}>
          <td className={css["table-text"]}>{index + 1}</td>
          <td className={css["table-img"]}>
            <img src={item.image} alt="" />
          </td>
          <td
            style={{
              width: "10%",
            }}
            className={css["table-text"]}
          >
            {item.name}
          </td>
          <td style={{ width: "7%" }} className={css["table-text"]}>
            {item.price}
          </td>
          <td className={css["quantity"]}>
            <span className={css["quantity-number"]}>{item.quantity}</span>
          </td>
          <td className={css["table-text"]}>{+item.quantity * +item.price}</td>
        </tr>
      );
    });
    return result;
  };

  return (
    <div>
      <h2 className={css["title-1"]}>Profile</h2>
      <div className={css["profile"]}>
        <img className={css["profile-img"]} src={profile?.avatar} alt="" />
        <form className={css["profile-content"]} onSubmit={formik.handleSubmit}>
          <div className={css["profile-content-column"]}>
            <div className={css["form-group"]}>
              <p className={css["form-title"]}>Email</p>
              <input
                {...formik.getFieldProps("email")}
                className={css["form-input"]}
                placeholder="email"
              />
              {formik.touched.email && formik.errors.email && (
                <p className={css["text-danger"]}>{formik.errors.email}</p>
              )}
            </div>
            <div className={css["form-group"]}>
              <p className={css["form-title"]}>Phone</p>
              <input
                {...formik.getFieldProps("phone")}
                className={css["form-input"]}
                placeholder="phone"
              />
              {formik.touched.phone && formik.errors.phone && (
                <p className={css["text-danger"]}>{formik.errors.phone}</p>
              )}
            </div>
          </div>
          <div className={css["profile-content-column"]}>
            <div className={css["form-group"]}>
              <p className={css["form-title"]}>Name</p>
              <input
                {...formik.getFieldProps("userName")}
                className={css["form-input"]}
                placeholder="name"
              />
              {formik.touched.userName && formik.errors.userName && (
                <p className={css["text-danger"]}>{formik.errors.userName}</p>
              )}
            </div>
            <div className={css["form-group"]}>
              <p className={css["form-title"]}>Password</p>
              <input
                {...formik.getFieldProps("password")}
                className={css["form-input"]}
                placeholder="password"
              />
              {formik.touched.password && formik.errors.password && (
                <p className={css["text-danger"]}>{formik.errors.password}</p>
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
                {formik.errors.gender && (
                  <p className={css["text-danger"]}>{formik.errors.gender}</p>
                )}
                <br />
                <div className={css["update-button-container"]}>
                  <button type="submit" className={css["update-button"]}>
                    UPDATE
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>

      <div className={css["order-history"]}>
        <h2 className={css["title-2"]}>Order history</h2>
        {renderOrdersHistory(ordersHistory)}
      </div>
    </div>
  );
}

export default Profile;
