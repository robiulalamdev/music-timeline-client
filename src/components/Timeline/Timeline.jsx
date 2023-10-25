import React from "react";
import "./Timeline.css";
import { Link } from "react-router-dom";
const Timeline = () => {
  return (
    <div className="mt-[136px] mb-[730px]">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
          <div className=" create_timeline">
            <h3 className="text_design create_text">Create timeline</h3>
            <Link to="/musicTimeline" className="w-full">
              <button className="neutral_btn">Create Now</button>
            </Link>
          </div>
          <div className="create_timeline">
            <h3 className="text_design create_text">Edit timeline</h3>
            <Link to="/createTimeline" className="w-full">
              <button className="neutral_btn">Edit Now</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
