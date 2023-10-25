import React, { useEffect, useState } from "react";
import pic from "../../assets/dash-img.png";
import editPic from "../../assets/dash-edit.svg";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const Profile = () => {
  const userTokensJSON = localStorage.getItem("userTokens");
  const userTokens = JSON.parse(userTokensJSON);
  const token = userTokens?.auth?.token;
  const [profile, setProfile] = useState();
  const [edit, setEdit] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const [imageFile, setImageFile] = useState(null);
  const profileImageRef = useRef();

  const uploadImg = async (files) => {
    let image = "";
    for (const file of files) {
      const formData = new FormData();
      formData.append("image", file);
      const response = await fetch(
        "https://api.imgbb.com/1/upload?key=932ae96b4af949bccda61ebea8105393",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      image = data?.data?.url;
    }
    return image;
  };

  const fetchProfile = () => {
    fetch("http://localhost:5000/api/mypage/profile", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setProfile(data));
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const dateString = profile?.dob;
  const dateOnly = dateString?.split("T")[0];

  const handleUpdateUser = (updateData) => {
    fetch(`http://localhost:5000/api/auth/update-profile/${profile._id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.status) {
          Swal.fire("Updated!", "Your Profile has been updated.", "success");
          setProfile(data?.data);
          setImageFile(null);
        }
      });
  };

  const handleSaveImage = async () => {
    const image = await uploadImg([imageFile]);
    if (image) {
      handleUpdateUser({
        profilePicture: image,
      });
    }
  };

  const handleUpdate = (data) => {
    handleUpdateUser(data);
  };

  return (
    <div className="dashbord-main-left cursor-pointer">
      <div className="userinfo-wrapper">
        <div className="userinfo_card">
          <div className="user_img relative">
            {imageFile ? (
              <img
                className="w-full max-h-[300px] object-contain"
                src={URL.createObjectURL(imageFile)}
                alt="image"
              />
            ) : (
              <img
                className="w-full"
                src={profile?.profilePicture || pic}
                alt="image"
              />
            )}
            <div className="w-20 h-8 absolute bottom-3 right-3">
              <div className="flex justify-end items-center gap-2 w-20">
                <img
                  onClick={() => profileImageRef.current.click()}
                  className="w-8 h-8"
                  src={editPic}
                  alt="icon"
                />
                {imageFile && (
                  <div
                    onClick={() => handleSaveImage()}
                    className="flex justify-center items-center w-8 p-1 h-8 text-white bg-green-600 rounded"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-full h-full"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                )}
              </div>
              <input
                ref={profileImageRef}
                onChange={(e) => setImageFile(e.target.files[0])}
                className="opacity-0 hidden"
                multiple={false}
                accept=".png, .jpg, .jpeg"
                type="file"
                name="image"
                id=""
              />
            </div>
          </div>

          <div className="user_information">
            <form onSubmit={handleSubmit(handleUpdate)} className="info_group">
              <div className="info_item">
                <h4 className="info_item_title">name</h4>

                <input
                  {...register("firstName", { required: false })}
                  disabled={edit ? false : true}
                  className="info_input"
                  placeholder="Olivia"
                  type="text"
                  value={profile?.firstName}
                />
              </div>

              <div className="info_item">
                <h4 className="info_item_title">Email</h4>

                <div className="info_input flex justify-start items-center">
                  {profile?.email}
                </div>
              </div>

              <div className="info_item">
                <h4 className="info_item_title">Phone Number</h4>

                <input
                  {...register("telNumber", { required: false })}
                  disabled={edit ? false : true}
                  className="info_input"
                  placeholder="+99551122444"
                  type="number"
                  min={0}
                  value={profile?.telNumber}
                />
              </div>

              <div className="info_item">
                <h4 className="info_item_title">Date of Birth</h4>

                <input
                  {...register("dob", { required: false })}
                  disabled={edit ? false : true}
                  className="info_input"
                  placeholder=""
                  type="date"
                  defaultValue={profile?.dob || ""}
                />
              </div>

              <div className="flex items-center gap-2 justify-end">
                <img
                  onClick={() => setEdit(!edit)}
                  className="w-20 h-14"
                  src={editPic}
                  alt="icon"
                />
                <div className="editable-item-right">
                  <button type="submit">ADD</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
