import React from "react";
import "./Stepper.css";
// import { useState } from "react";
// import axios from "axios";

import {
  FacebookIcon,
  FacebookShareButton,
  InstapaperShareButton,
  LineShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";

import facebook from "../../assets/devicon_facebook.png";
import youtube from "../../assets/logos_youtube-icon.png";
import shopify from "../../assets/logos_shopify.png";
import apple from "../../assets/apple-music.png";
import { useState } from "react";
import UpdateTimeLineForm from "../MusicTimeline/UpdateTimeLineForm";

const Stepper = ({ data, handleDeletBtn, scrollableRef, refetch }) => {
  const [editTimeLine, setEditTimeLine] = useState(null);
  // const [isLoading, setIsLoading] = useState([]);

  const siteUrl = window.location.href;
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
                    <FacebookShareButton
                      url={siteUrl}
                      hashtag="music"
                      quote="Best Seller in town"
                    >
                      <FacebookIcon size={30} round={true} />
                    </FacebookShareButton>
                    <WhatsappShareButton
                      url={siteUrl}
                      hashtag="music"
                      quote="Best Seller in town"
                    >
                      <WhatsappIcon size={30} round={true} />
                    </WhatsappShareButton>
                    <LinkedinShareButton
                      url={siteUrl}
                      hashtag="music"
                      quote="Best Seller in town"
                    >
                      <LinkedinIcon size={30} round={true} />
                    </LinkedinShareButton>
                    <TwitterShareButton
                      url={siteUrl}
                      hashtag="music"
                      quote="Best Seller in town"
                    >
                      <TwitterIcon size={30} round={true} />
                    </TwitterShareButton>
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
