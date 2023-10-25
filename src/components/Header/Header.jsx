import React, { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import logo from "../../assets/Logo.png";
import bell from "../../assets/bell.png";
import bag from "../../assets/bag.png";
import profile from "../../assets/profile.png";
import "./Header.css";
import { useUser } from "../../Provider/UserProvider";

const Header = () => {
  const [isResponsive, setIsResponsive] = useState(false);
  const userTokensJSON = localStorage.getItem("userTokens");
  const userTokens = JSON.parse(userTokensJSON);
  const email = userTokens ? userTokens?.email : "";
  let location = useLocation();
  const { user } = useUser();

  const [open, setOpen] = useState(false);
  const toggleResponsive = () => {
    setIsResponsive((prevState) => !prevState);
  };

  const menuItems = (
    <>
      <li className="hidden xl:block mr-[45px]">
        <NavLink className="navlinks flex items-center " to="/">
          <img src={logo} className="logo" alt="logo" />
        </NavLink>
      </li>
      <li>
        <NavLink className="navlinks" to="/">
          Home
        </NavLink>
      </li>
      <li className=" ">
        <NavLink className="navlinks" to="/">
          Accounts
        </NavLink>
      </li>

      <li>
        <NavLink className="navlinks" to="/">
          Payment Information
        </NavLink>
      </li>
      <li>
        <Link to="/" className="navlinks">
          Contact Us
        </Link>
      </li>
      <li>
        <NavLink className="navlinks" to="/">
          Support
        </NavLink>
      </li>

      <li className="me-[56px]">
        <Link>
          <input
            type="text"
            className="input_design"
            placeholder="Find your favorite artists"
          />
        </Link>
      </li>

      <li className="flex items-center">
        <Link className="me-[24px]" to="/">
          <img src={bell} alt="" />
        </Link>
      </li>

      <li className="flex items-center">
        <Link className="me-[24px]" to="/">
          <img src={profile} alt="" />
        </Link>
      </li>

      <li className="flex items-center">
        <Link className="" to="/">
          <img src={bag} alt="" />
        </Link>
      </li>
      <li className="flex items-center">
        <Link className="" to="/">
          <Link to="/dashboard" style={{ color: "white", marginLeft: "5px" }}>
            {email && ` Hello, ${email?.split("@")[0]}`}
          </Link>
        </Link>
      </li>
    </>
  );

  return (
    <nav className="nav_container">
      <div className="xl:hidden flex flex-row items-center justify-between px-4 py-2">
        <div className="flex flex-row items-center">
          <img src={logo} alt="logo" width="60" height="60" />
        </div>
        <div
          onClick={() => setOpen(!open)}
          className="w-8 h-8 text-white font-bold"
        >
          {open ? (
            <i className="fa-solid fa-xmark"></i>
          ) : (
            <i className="fa fa-bars"></i>
          )}
        </div>
      </div>
      <ul
        className={`nav_container flex flex-col xl:static xl:flex-row justify-center items-center p-4 gap-4 xl:gap-0 w-full absolute  duration-500 ease-in z-50 ${
          open ? "top-15" : "top-[-450px]"
        }`}
      >
        {menuItems}
      </ul>
    </nav>
  );
};

export default Header;
