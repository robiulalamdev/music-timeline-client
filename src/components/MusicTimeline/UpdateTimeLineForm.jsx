import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const UpdateTimeLineForm = ({ timeline, closeForm, refetch }) => {
  const userTokensJSON = localStorage.getItem("userTokens");
  const userTokens = JSON.parse(userTokensJSON);
  const token = userTokens?.auth?.token;
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const handleUpdate = (data) => {
    fetch(`http://localhost:5000/api/timeline/${timeline?._id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.status) {
          refetch();
          closeForm(null);
          Swal.fire("Updated!", "Your file has been updated.", "success");
        }
      });
  };
  return (
    <div className="!fixed w-full h-full top-0 right-0 left-0 bg-gray-800 bg-opacity-70 !z-[10000000000] flex justify-center items-center">
      <form
        onSubmit={handleSubmit(handleUpdate)}
        className="max-w-[600px] mx-auto bg-white p-2 rounded"
      >
        <input
          {...register("year", { required: true })}
          type="text"
          id="first_name"
          className="music_input  w-full "
          placeholder="Year"
          required
          name="year"
          min={0}
          defaultValue={timeline.year}
        />
        <input
          {...register("bandNames", { required: true })}
          type="text"
          id="first_name"
          className="music_input  w-full "
          placeholder="Brand Name"
          name="bandNames"
          required
          defaultValue={timeline.bandNames}
        />
        <input
          {...register("songNames", { required: true })}
          type="text"
          id="first_name"
          className="music_input  w-full "
          placeholder="Song Name"
          required
          name="songNames"
          defaultValue={timeline.songNames}
        />
        <input
          {...register("youtubeLinks", { required: true })}
          type="text"
          id="first_name"
          className="music_input  w-full "
          placeholder="Video URL*"
          required
          name="youtubeLinks"
          defaultValue={timeline.youtubeLinks}
        />
        <div className="py-2 bg-white rounded-b-lg">
          <label for="editor" className="sr-only">
            Publish post
          </label>
          <textarea
            {...register("myStory", { required: true })}
            defaultValue={timeline.myStory}
            name="myStory"
            id="editor"
            rows="8"
            className="block w-full text-sm text-gray-800 bg-gray-200 p-2 focus:ring-0 "
            placeholder="Write an article..."
            required
          ></textarea>
        </div>
        <button type="submit" className="btn create_music_button">
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateTimeLineForm;
