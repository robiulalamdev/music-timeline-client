import React, { useRef, useState } from "react";
import axios from "axios";
import "./MusicTimeline.css";
import Stepper from "../Stepper/Stepper";
import facebook from "../../assets/devicon_facebook.png";
import youtube from "../../assets/logos_youtube-icon.png";
import shopify from "../../assets/logos_shopify.png";
import apple from "../../assets/apple-music.png";
import { useEffect } from "react";
import Swal from "sweetalert2";
const MusicTimeline = () => {
  const scrollableRef = useRef(null);
  const userTokensJSON = localStorage.getItem("userTokens");
  const userTokens = JSON.parse(userTokensJSON);
  const token = userTokens[0]?.auth?.token;
  const [getTimeline, setGetTimeline] = useState([]);
  const [timelineData, setTimelineData] = useState({
    year: "",
    bandNames: "",
    songNames: "",
    youtubeLinks: "",
    searchField: "",
    myStory: "",
  });

  function scrollToBottom() {
    if (scrollableRef.current) {
      scrollableRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }
  function refreshPage() {}

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTimelineData({
      ...timelineData,
      [name]: value,
    });
    console.log(timelineData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!userTokensJSON) {
        console.error("userTokens not found in local storage.");
        return;
      }

      try {
        if (token) {
          const response = await axios.post(
            "http://localhost:5000/api/timeline/items",
            timelineData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          Swal.fire("Good job!", "You clicked the button!", "success");
          console.log("Timeline item added successfully:", response.data);

          setTimeout(() => {
            window.location.reload(false);
          }, 1000);
        } else {
          console.error("Token not found in the userTokens array.");
        }
      } catch (error) {
        console.error("Error parsing userTokens JSON:", error);
      }
    } catch (error) {
      console.error(
        "Error adding timeline item:",
        error.response?.data || error.message
      );
    }
  };

  const refetch = () => {
    fetch("http://localhost:5000/api/timeline")
      .then((res) => res.json())
      .then((data) => setGetTimeline(data));
  };

  useEffect(() => {
    refetch();
  }, []);

  const handleDeleteBtn = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:5000/api/timeline/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            if (res.status === 200) {
              const remaining = getTimeline.filter(
                (timeline) => timeline._id !== id
              );
              setGetTimeline(remaining);
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
              console.log(res.data);
            } else {
              Swal.fire("Error", "Failed to delete the item.", "error");
            }
          })
          .catch((error) => {
            console.error("Error deleting item:", error);
            Swal.fire("Error", "Failed to delete the item.", "error");
          });
      }
    });
  };

  return (
    <div className="mt-[80px] ">
      <div className="container ">
        <h1 className="text-[#0F0609] leading-[150%] text-[32px] font-[600] mb-[30px]">
          My Music Timeline
        </h1>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-[24px] mb-[142px]">
          {/* left side */}
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              id="first_name"
              className="music_input  w-full "
              placeholder="Year"
              required
              name="year"
              defaultValue={timelineData.year}
              // value="{timelineData.year}"
              onChange={handleInputChange}
            />
            <input
              type="text"
              id="first_name"
              className="music_input  w-full "
              placeholder="Brand Name"
              name="bandNames"
              required
              defaultValue={timelineData.bandNames}
              onChange={handleInputChange}
            />
            <input
              type="text"
              id="first_name"
              className="music_input  w-full "
              placeholder="Song Name"
              required
              name="songNames"
              defaultValue={timelineData.songNames}
              onChange={handleInputChange}
            />
            <input
              type="text"
              id="first_name"
              className="music_input  w-full "
              placeholder="Video URL*"
              required
              name="youtubeLinks"
              defaultValue={timelineData.youtubeLinks}
              onChange={handleInputChange}
            />
            <button
              className="btn create_music_button"
              onClick={() => {
                // refreshPage();
                // scrollToBottom();
              }}
            >
              Create
            </button>
          </form>
          {/* right side */}
          <div>
            <form className="text_area">
              <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50">
                <div className="flex items-center justify-between px-3 py-2 border-b ">
                  <div className="flex flex-wrap items-center divide-gray-200 sm:divide-x ">
                    <div className="flex flex-wrap items-center space-x-1 sm:pr-4">
                      <button
                        type="button"
                        className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100"
                      >
                        <svg
                          className="w-4 h-4"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 12 20"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinejoin="round"
                            stroke-width="2"
                            d="M1 6v8a5 5 0 1 0 10 0V4.5a3.5 3.5 0 1 0-7 0V13a2 2 0 0 0 4 0V6"
                          />
                        </svg>
                        <span className="sr-only">Attach file</span>
                      </button>
                      <button
                        type="button"
                        className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 "
                      >
                        <svg
                          className="w-4 h-4"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 16 20"
                        >
                          <path d="M8 0a7.992 7.992 0 0 0-6.583 12.535 1 1 0 0 0 .12.183l.12.146c.112.145.227.285.326.4l5.245 6.374a1 1 0 0 0 1.545-.003l5.092-6.205c.206-.222.4-.455.578-.7l.127-.155a.934.934 0 0 0 .122-.192A8.001 8.001 0 0 0 8 0Zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
                        </svg>
                        <span className="sr-only">Embed map</span>
                      </button>
                      <button
                        type="button"
                        className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100"
                      >
                        <svg
                          className="w-4 h-4"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 16 20"
                        >
                          <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
                          <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                        </svg>
                        <span className="sr-only">Upload image</span>
                      </button>
                      <button
                        type="button"
                        className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100"
                      >
                        <svg
                          className="w-4 h-4"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 16 20"
                        >
                          <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.96 2.96 0 0 0 .13 5H5Z" />
                          <path d="M14.067 0H7v5a2 2 0 0 1-2 2H0v11a1.969 1.969 0 0 0 1.933 2h12.134A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.933-2ZM6.709 13.809a1 1 0 1 1-1.418 1.409l-2-2.013a1 1 0 0 1 0-1.412l2-2a1 1 0 0 1 1.414 1.414L5.412 12.5l1.297 1.309Zm6-.6-2 2.013a1 1 0 1 1-1.418-1.409l1.3-1.307-1.295-1.295a1 1 0 0 1 1.414-1.414l2 2a1 1 0 0 1-.001 1.408v.004Z" />
                        </svg>
                        <span className="sr-only">Format code</span>
                      </button>
                    </div>
                  </div>
                </div>
                {/* text area */}
                <div className="px-4 py-2 bg-white rounded-b-lg">
                  <label for="editor" className="sr-only">
                    Publish post
                  </label>
                  <textarea
                    onChange={handleInputChange}
                    defaultValue={timelineData.myStory}
                    name="myStory"
                    id="editor"
                    rows="8"
                    className="block w-full px-0 text-sm text-gray-800 bg-white border-0 focus:ring-0 "
                    placeholder="Write an article..."
                    required
                  ></textarea>
                </div>
              </div>
            </form>

            {/* <textarea name="" id="" cols="30" rows="10"></textarea> */}
            <p className="share_text">Share this </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 center xs:items-center">
              <div className="facebookDiv">
                <div className="flex  ">
                  <img src={facebook} alt="" />
                </div>
              </div>
              <div className="shopify">
                <div>
                  <img src={shopify} alt="" />
                </div>
              </div>
              <div className="youtube">
                <div>
                  <img src={youtube} alt="" />
                </div>
              </div>
              <div className="apple">
                <div>
                  <img src={apple} alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Stepper
        data={getTimeline}
        handleDeletBtn={handleDeleteBtn}
        scrollableRef={scrollableRef}
        refetch={refetch}
      />
    </div>
  );
};

export default MusicTimeline;
