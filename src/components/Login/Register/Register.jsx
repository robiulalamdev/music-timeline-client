import React, { useEffect, useState } from "react";
import "./Register.css";
import google from "../../../assets/google.png";
import facebook from "../../../assets/facebook.png";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Spinner from "../../loadings/Spinner";
import { useUser } from "../../../Provider/UserProvider";
import Swal from "sweetalert2";
const Register = () => {
  const {
    handleSubmit,
    register,
    reset,
    setError,
    formState: { errors },
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useUser();
  const navigate = useNavigate();

  const handleRegister = async (data) => {
    try {
      fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data?.success) {
            const userTokens = {
              userId: data.user.id,
              auth: data.auth,
              email: data.user.email,
            };
            localStorage.setItem("userTokens", JSON.stringify(userTokens));
            setUser(data.user);
            Swal.fire(
              "Congratulations",
              "Registration Successfully",
              "success"
            );
            reset();
            navigate("/dashboard");
          } else {
            setError("email", {
              type: "manual",
              message: data?.message,
            });
          }
          setIsLoading(false);
        });
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  return (
    <div className="mt-[110px] mb-[135px]">
      <div className="container">
        <div className="register_container">
          <h1 className="register_heading">Register with your</h1>
          <button className="google_btn_design">
            <span>
              <img src={google} alt="" />
            </span>
            <span className="sign_up_with_google_text">
              Sign up with Google
            </span>
          </button>
          <button className="google_btn_design">
            <span>
              <img src={facebook} alt="" />
            </span>{" "}
            <span className="sign_up_with_google_text">
              Sign up with Facebook
            </span>
          </button>
          <div className="flex flex-nowrap items-center justify-center gap-3">
            <div
              style={{ background: "#D0D5DD", width: "50%", height: "2px" }}
            ></div>
            <div className="or">or</div>
            <div
              style={{ background: "#D0D5DD", width: "50%", height: "2px" }}
            ></div>
          </div>

          <form onSubmit={handleSubmit(handleRegister)}>
            <div className="w-full">
              <label htmlFor="" style={{ textAlign: "left" }} className="label">
                Email
              </label>
              <input
                {...register("email", { required: true })}
                style={{ marginTop: "8px" }}
                className={`login_input1 text-sm w-full px-4 py-2 rounded mt-4 
                ${
                  errors.email
                    ? "border border-red-600"
                    : "border border-gray-300"
                }`}
                type="email"
                name="email"
                placeholder="Email Address"
              />
              {errors.email && (
                <small className="text-red-600">{errors?.email?.message}</small>
              )}
            </div>
            <div className="w-full">
              <label className="label">Password</label>
              <input
                {...register("password", {
                  required: true,
                  minLength: 4,
                })}
                style={{ marginTop: "8px" }}
                className={`login_input2 text-sm w-full px-4 py-2 rounded mt-4 
             ${
               errors.password
                 ? "border border-red-600"
                 : "border border-gray-300"
             }`}
                type="password"
                name="password"
                placeholder="Password"
              />
              {errors.password && (
                <small className="text-red-600">
                  Password is required and should be at least 4 characters long.
                </small>
              )}
            </div>
            <div className="my-4">
              <small className="">Forgot password?</small>
            </div>

            <button
              disabled={isLoading}
              className="neutral_btn w-full mt-4"
              type="submit"
            >
              {isLoading ? (
                <div className="flex items-center gap-1 justify-center">
                  <Spinner />
                  <p>Sign Up</p>
                </div>
              ) : (
                "Sign Up"
              )}
            </button>
          </form>
          <div className="text-center">
            <span className="have_an_account_text">
              {" "}
              Already have an account?{" "}
            </span>
            <a href="/" className="sign_up_link">
              Log in
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
