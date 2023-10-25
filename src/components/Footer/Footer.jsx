import React from "react";
import "./Footer.css";
import { useLocation } from "react-router-dom";
const Footer = () => {
  let location = useLocation();
  return (
    <div className={`${location.pathname === "/timeline" && "fixed"}`
    }>

      <div className="footer_bg" >
        <div className="container">
          <footer className="footer_container  ">
            <div>
              <a href="#" className="">
                Terms and Conditions
              </a>
              <a href="#" className="Privacy">
                Privacy Policy
              </a>
            </div>
            <p className="">&copy; 2023 Company Name</p>
          </footer>
        </div>
      </div>
    </div >
  );
};

export default Footer;
