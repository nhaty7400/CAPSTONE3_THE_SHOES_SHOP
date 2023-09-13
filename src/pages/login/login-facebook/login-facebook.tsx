import { Divider } from "antd";
import axios from "axios";
import React from "react";
import FacebookLogin from "react-facebook-login";
import { ACCESS_TOKEN, EMAIL } from "src/constants";
import { refresh, setLocalStorage } from "src/utils";
import { useNavigate } from "react-router-dom";
import { stateSwitchHandler } from "src/templates/base/header";

function LoginFacebook() {
  const navigate = useNavigate();

  const responseFacebook = (response: any) => {
    axios({
      url: "https://shop.cyberlearn.vn/api/Users/facebooklogin",
      method: "post",
      data: {
        facebookToken: response.accessToken,
      },
    })
      .then((resp) => {
        setLocalStorage(ACCESS_TOKEN, resp.data.content.accessToken);
        setLocalStorage(EMAIL, resp.data.content.email);
        stateSwitchHandler();
        navigate("/profile");
        refresh();
      })
      .catch((err) => console.log(err));
  };

  return (
    <FacebookLogin
      appId="2499834503528175"
      // autoLoad={true}
      fields="name,email,picture"
      callback={responseFacebook}
      icon="fa-facebook"
    />
  );
}

export default LoginFacebook;
