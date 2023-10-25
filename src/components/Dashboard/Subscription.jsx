import React from "react";
import mark from "../../assets/features-mark.svg";

const Subscription = () => {
  return (
    <div className="dashbord-main-right">
      <div className="subscription-card">
        <h4>My Subscription</h4>

        <div className="subscription_item_wrapper">
          <div className="subscription_item">
            <h5>Free</h5>

            <div className="subscription_item_btn">
              <button>ADD</button>
            </div>
          </div>

          <div className="subscription_item">
            <h5>Premium</h5>

            <div className="subscription_item_btn">
              <button className="bg-black text-white">ADD</button>
            </div>
          </div>
        </div>
      </div>

      <div className="subscription-card">
        <div className="subscription-card-title">
          <h4>My Subscription</h4>
          <label className="switch">
            {/* <input type="checkbox" checked /> */}
            <input type="checkbox" className="toggle toggle-info"  />
            <span className="slider round"></span>
          </label>
        </div>

        <div className="subscription_item_wrapper">
          <h5>Features</h5>

          <ul className="features_wrapper">
            <li className="features_item">
              <img src={mark} alt="icon" />
              <p>Synced lyrics for Instagram</p>
            </li>

            <li className="features_item">
              <img src={mark} alt="icon" />
              <p>Daily streaming stats</p>
            </li>

            <li className="features_item">
              <img src={mark} alt="icon" />
              <p>Customizable label</p>
            </li>

            <li className="features_item">
              <img src={mark} alt="icon" />
              <p>Customizable preorder date</p>
            </li>

            <li className="features_item">
              <img src={mark} alt="icon" />
              <p>5-100 artists or bands</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
