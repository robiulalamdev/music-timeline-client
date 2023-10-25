import React from "react";
import edit from "../../assets/dash-edit.svg";
import Delete from "../../assets/dash-delete.svg";

const DashboardHeader = () => {
  return (
    <div className="dashbord-title">
      <div className="title-name">
        <h2>User Dashboard</h2>
      </div>
      <div className="title-function">
        <div className="function-wrap">
          <a href="#">
            <img src={edit} alt="icon" />
          </a>
          <a href="#">
            <img src={Delete} alt="icon" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
