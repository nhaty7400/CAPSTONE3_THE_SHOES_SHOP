import React from "react";
import css from "./header.module.scss";
import { Link } from "react-router-dom";

// cách 1:
import searchSvg from "src/assets/imgs/search.svg";
// import IconSearch from "src/assets/icons/search.icon";
// import IconCart from "src/assets/icons/cart.icon";
import { IconCart, IconSearch } from "src/assets/icons";
import { checkLocalStorage, refresh, removeLocalStorage } from "src/utils";
import { ACCESS_TOKEN, EMAIL } from "src/constants";
import { useNavigate } from "react-router-dom";

// export function useSwitchHandler(address: string) {
//   const navigate = useNavigate();
//   navigate(address);
// }

export const stateSwitchHandler = () => {
  if (checkLocalStorage(ACCESS_TOKEN)) {
    return (
      <div className={css["header-left-author"]}>
        <Link to="/profile">Profile</Link>
        <Link
          onClick={() => {
            removeLocalStorage(ACCESS_TOKEN);
            removeLocalStorage(EMAIL);
            stateSwitchHandler();
            refresh();
            // useSwitchHandler("/");
          }}
        to="/">
          Logout
        </Link>
      </div>
    );
  }
  return (
    <div className={css["header-left-author"]}>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
    </div>
  );
};

function Header() {
  return (
    <>
      <header className={css.header}>
        <Link to="/">
          <img src="src/assets/imgs/logo.png" alt="" />
        </Link>

        <div className={css["header-left"]}>
          {/* <img src={searchSvg} alt="" /> */}
          <Link to="/search" className={css["header-left-search"]}>
            <IconSearch />
            <span>Search</span>
          </Link>
          <Link to="/carts" className={css["header-left-cart"]}>
            <IconCart />
            <span>(1)</span>
          </Link>
          {stateSwitchHandler()}
        </div>
      </header>
      <nav>
        <ul className={css["nav"]}>
          <li>
            <Link className={css["active"]} to={"/home"}>
              Home
            </Link>
          </li>
          <li>
            <Link to={"/#"}>Men</Link>
          </li>
          <li>
            <Link to={"/#"}>Woman</Link>
          </li>
          <li>
            <Link to={"/#"}>Kid</Link>
          </li>
          <li>
            <Link to={"/#"}>Sport</Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Header;
