import React from "react";
import css from "./footer.module.scss";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer>
      <div className={css["footer-top"]}>
        <div className={css["footer-column"]}>
          <ul>
            <span className={css["footer-column-title"]}>GET HELP</span>
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">Nike</a>
            </li>
            <li>
              <a href="#">Adidas</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
          </ul>
        </div>
        <div className={css["footer-column"]}>
          <ul>
            <span className={css["footer-column-title"]}>SUPPORT</span>
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
            <li>
              <a href="#">Help</a>
            </li>
            <li>
              <a href="#">Phone</a>
            </li>
          </ul>
        </div>
        <div className={css["footer-column"]}>
          <ul>
            <span className={css["footer-column-title"]}>REGISTER</span>
            <li>
              <a href="#">Register</a>
            </li>
            <li>
              <a href="#">Login</a>
            </li>
          </ul>
        </div>
      </div>
      <div className={css["footer-bottom"]}>
        <span>
          © 2022 Cybersoft All Rights Reserved | Design Theme by Trương Tấn
          Khải.
        </span>
      </div>
    </footer>
  );
}

export default Footer;
