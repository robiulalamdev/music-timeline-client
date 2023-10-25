import React, { useState } from "react";
import dashHome from "../../assets/dash-home.svg";

import dollar from "../../assets/dash-dollar.svg";

import Support from "../../assets/dash-support.svg";
import Support1 from "../../assets/dash-support1.svg";
import User from "../../assets/dash-user.svg";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("userTokens");
    navigate("/");
  };

  return (
    <div className={`dashbord-nav ${open && "toggleNavbar"} `} id="sidebar">
      {open ? (
        <div
          onClick={() => setOpen(false)}
          className="toggle-close-btn lg:hidden"
        >
          &#10005;
        </div>
      ) : (
        <div className="toggle-btn" onClick={() => setOpen(true)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      )}

      <div className="search-input">
        <input id="search-input" placeholder="Search" type="text" />
      </div>

      <nav>
        <ul className="nav-wrapper">
          <li className="nav-item">
            <img src={dashHome} alt="icon" />
            <a className="nav-link" href="#home">
              Home
            </a>
          </li>

          <li className="nav-item">
            <img src={User} alt="icon" />
            <a className="nav-link" href="#accounts">
              Accounts
            </a>
          </li>

          <li className="nav-item">
            <img src={dollar} alt="icon" />
            <a className="nav-link" href="#payment-info">
              Payment Info
            </a>
          </li>

          <li className="nav-item">
            <img src={Support} alt="icon" />
            <a className="nav-link" href="#support">
              Support
            </a>
          </li>

          <li className="nav-item">
            <img src={Support1} alt="icon" />
            <a className="nav-link" href="#support">
              Support
            </a>
          </li>
          <li className="nav-item">
            <img src={Support1} alt="icon" />
            <button onClick={handleLogout} className="nav-link" href="#support">
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
