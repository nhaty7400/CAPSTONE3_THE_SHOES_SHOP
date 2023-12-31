import React from "react";
import css from "./header.module.scss";
import { Link } from "react-router-dom";
import { useAppSelector } from "src/redux/config-store";

// cách 1:
import searchSvg from "src/assets/imgs/search.svg";
// import IconSearch from "src/assets/icons/search.icon";
// import IconCart from "src/assets/icons/cart.icon";
import { IconCart, IconSearch } from "src/assets/icons";
import { checkLocalStorage, refresh, removeLocalStorage } from "src/utils";
import { ACCESS_TOKEN, EMAIL } from "src/constants";
import { useNavigate } from "react-router-dom";

function Header() {
  const countCartItem = () => {
    const cart = useAppSelector((state) => {
      return state.productReducer.cart;
    });
    return cart.length;
  };

  const navigate = useNavigate();

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
            <span className={css["count-icon"]}>{countCartItem()}</span>
          </Link>

          {checkLocalStorage(ACCESS_TOKEN) === false ? (
            <div className={css["header-left-author"]}>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </div>
          ) : (
            <div className={css["header-left-author"]}>
              <Link to="/profile">Profile</Link>
              <Link
                onClick={() => {
                  removeLocalStorage(ACCESS_TOKEN);
                  removeLocalStorage(EMAIL);
                  // refresh();
                }}
                to="/"
              >
                Logout
              </Link>
            </div>
          )}
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
