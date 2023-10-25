import React from "react";
import "./Stepper.css";
// import { useState } from "react";
// import axios from "axios";

import facebook from "../../assets/devicon_facebook.png";
import youtube from "../../assets/logos_youtube-icon.png";
import shopify from "../../assets/logos_shopify.png";
import apple from "../../assets/apple-music.png";
import { useState } from "react";
import UpdateTimeLineForm from "../MusicTimeline/UpdateTimeLineForm";

const Stepper = ({ data, handleDeletBtn, scrollableRef, refetch }) => {
  const [editTimeLine, setEditTimeLine] = useState(null);
  // const [isLoading, setIsLoading] = useState([]);
  console.log(editTimeLine);
  return (
    <div className="stepper">
      <div className="timeline-section ">
        <div className="text-center">
          <button className="button_design">1971</button>
        </div>
        <div className="timeline-items">
          {data.map((data, index) => (
            <div
              className={`timeline-item first_timeline ${
                index % 2 === 0
                  ? "left_box"
                  : "right_box block lg:flex justify-start lg:justify-end w-full right_box"
              }`}
              key={index}
            >
              <div className="timeline-dot">{data.year}</div>
              <div className="timeline-date">
                <div className="timeline-content">
                  <div className="parent_text">
                    <div className="left_text">
                      <h3 className="brandname">Brand Name</h3>
                      <p className="kiss">{data.bandNames}</p>
                      <h3 className="songname">Song Name</h3>
                      <p className="love_it_loud_text">{data.songNames}</p>
                    </div>
                    <div className="right_text">
                      <h3 className="my_story">My Story</h3>
                      <p className="story_details">{data.myStory}</p>
                      <div className="edit_delete_icons">
                        <button
                          onClick={() => setEditTimeLine(data)}
                          className="edit_icon"
                        >
                          <i className="fa-regular fa-pen-to-square"></i>
                        </button>
                        <button
                          className="delete_icon"
                          onClick={() => handleDeletBtn(data._id)}
                        >
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end gap-3 pr-2 cursor-pointer">
                    <img className="w-5 h-5" src={facebook} alt="" />
                    <img className="w-5 h-5" src={shopify} alt="" />
                    <img className="w-5 h-5" src={youtube} alt="" />
                    <img className="w-5 h-5" src={apple} alt="" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center" ref={scrollableRef}>
          <button className="button_design">1971</button>
        </div>
      </div>

      {editTimeLine?._id && (
        <UpdateTimeLineForm
          timeline={editTimeLine}
          closeForm={setEditTimeLine}
          refetch={refetch}
        />
      )}
    </div>
  );
};

export default Stepper;
