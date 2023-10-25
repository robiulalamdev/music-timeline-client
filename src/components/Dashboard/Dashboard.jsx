import React from "react";
import "./Dashboard.css";
import Search from "../../assets/dash-search.svg";

import dashboard from "../../assets/dash-board.svg";

import Sidebar from "./Sidebar";
import DashboardHeader from "./DashboardHeader";
import Profile from "./Profile";
import Subscription from "./Subscription";

const Dashboard = () => {
  return (
    <div>
      <div className="dashbord-wrapper">
        <Sidebar />

        <div className="dashbord-main">
          <DashboardHeader />

          <div className="dashbord-main-wrapper">
            <Profile />

            <Subscription />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
