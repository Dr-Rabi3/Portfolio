import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import classes from "../../styles/navbar.module.css";

export default function Navbar() {
  const location = useLocation();
  const len = location.pathname.split("/").length;
  const current = location.pathname.split("/")[len - 1];
  return (
    <>
      <nav className={classes.container + " " + classes.navbar}>
        <div className={classes.link + " on-before"}>
          <Link
            className={classes.logo + " " + classes.navLink}
            to="/"
            data-text="Mohamed A."
          >
            Mohamed A.
          </Link>
        </div>

        <div>
          <ul className={classes.links}>
            <li
              className={classes.link + (current !== "" ? "  on-before" : "")}
            >
              <NavLink to="/" className={classes.navLink} data-text="home">
                Home
              </NavLink>
            </li>
            <li
              className={
                classes.link + (current !== "work" ? "  on-before" : "")
              }
            >
              <NavLink to="/work" className={classes.navLink} data-text="work">
                Work
              </NavLink>
            </li>
            <li
              className={
                classes.link + (current !== "about" ? "  on-before" : "")
              }
            >
              <NavLink
                to="/about"
                className={classes.navLink}
                data-text="About"
              >
                About
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
