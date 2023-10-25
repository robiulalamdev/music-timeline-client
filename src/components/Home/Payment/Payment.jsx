import React from "react";
import "./Payment.css";
import { Link } from "react-router-dom";
const Payment = () => {
  return (
    <div className="container ">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-[237px]">
        <div className="payment_1">
          <h3 className="text_design">Basic</h3>
          <h1 className="payment_number">$0.00</h1>
          <Link to="/timeline" className="w-full">
            {" "}
            <button className="neutral_btn mb-0">Get started</button>
          </Link>
        </div>
        <div className="payment_2">
          <h3 className="text_design1">Premium</h3>
          <h1 className="payment_number1">$12.00</h1>
          <Link to="/timeline" className="w-full">
            {" "}
            <button className="btn get_started_btn1">Get started</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Payment;
