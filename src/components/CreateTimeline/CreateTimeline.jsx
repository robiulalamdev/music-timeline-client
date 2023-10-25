import React from "react";
import Stepper from "../Stepper/Stepper";
import "./CreateTimeline.css";
import { useState } from "react";
import { useEffect } from "react";
const CreateTimeline = () => {
  const [getTimeline, setGetTimeline] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/api/timeline")
      .then((res) => res.json())
      .then((data) => setGetTimeline(data));
  }, []);
  return (
    <div className="mt-[126px]">
      <div className="container">
        <div class="edit_section_container">
          <div class="edit_container">
            <h2 class="edit_heading">Edit Music Timeline</h2>
            <label className="label add_item_label">Add Item</label>
            <input
              style={{ marginTop: "8px" }}
              className="login_input2 add_item_field w-full  border border-solid  rounded"
              type="text"
            />
            <button className="btn edit_button">Add</button>
          </div>
        </div>
      </div>
      <Stepper data={getTimeline} />
    </div>
  );
};

export default CreateTimeline;
