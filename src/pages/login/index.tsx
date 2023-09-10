import React, { useState } from "react";
import { userLogin } from "src/services/user.service";
import { useNavigate,Link } from "react-router-dom";
import { setLocalStorage } from "src/utils";
import { ACCESS_TOKEN } from "src/constants";
import css from "./index.module.scss";

function Login() {
  const [formLogin, setFormLogin] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    userLogin(formLogin)
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
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;

    setFormLogin({
      ...formLogin,
      [name]: value,
    });
  };

  return (
    <form className={css["container"]} onSubmit={handleLogin}>
      <h2 className={css["title"]}>Login</h2>
      <div className={css["login-content"]}>
        <div>
          <div className={css["form-group"]}>
            <p className={css["login-title"]}>Email</p>
            <input
              className={css["login-input"]}
              name="email"
              value={formLogin.email}
              onChange={handleChange}
              placeholder="email"
            />
          </div>
          <div className={css["form-group"]}>
            <p className={css["login-title"]}>Password</p>
            <input
              className={css["login-input"]}
              name="password"
              value={formLogin.password}
              onChange={handleChange}
              placeholder="password"
            />
          </div>
          <div className={css["form-group"]}>
            <button className={css["login-button"]} type="submit">
              LOGIN
            </button>
            <Link to="/register" className={css["login-recommend"]}>Register now ?</Link>
            <br />
            <button className={css["login-button-facebook"]} type="submit">
              <i
                className="fa-brands fa-facebook"
                style={{
                  margin:"1rem",
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
