import React, { useState } from "react";
import Frame from "../../../assets/Frame.png";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../../Provider/UserProvider";
import { useForm } from "react-hook-form";
import Spinner from "../../loadings/Spinner";

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useUser();
  const [isLoading, setIsLoading] = useState(false);

  const {
    handleSubmit,
    register,
    setError,
    formState: { errors },
  } = useForm();

  const handleLogin = async (data) => {
    setIsLoading(true);
    try {
      fetch("http://localhost:5000/api/auth/login", {
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
            navigate("/timeline");
          } else {
            setError("email", {
              type: "manual",
              message: data?.message,
            });
          }
          setIsLoading(false);
        });
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="mt-[85px] mb-[94px]">
      <div className="container">
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="">
            <img src={Frame} alt="Sample image" />
          </div>
          <form onSubmit={handleSubmit(handleLogin)} className="form_design">
            <div className="">
              <p className="mx-4 text-center login_header mb-4">
                Login/ Registration
              </p>
              <div className="mb-2">
                <label
                  htmlFor=""
                  style={{ marginBottom: "10px" }}
                  className="label_design"
                >
                  Email
                </label>
                <input
                  {...register("email", { required: true })}
                  style={{ marginTop: "8px" }}
                  className={`login_input text-sm w-full px-4 py-2 rounded mt-4 
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
                  <small className="text-red-600">
                    {errors?.email?.message}
                  </small>
                )}
              </div>

              <div>
                <label htmlFor="" className="label_design">
                  Password
                </label>
                <input
                  {...register("password", { required: true })}
                  style={{ marginTop: "8px" }}
                  className={`login_input text-sm w-full px-4 py-2 rounded mt-4 
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
                    {errors?.password?.message}
                  </small>
                )}
              </div>

              <button
                disabled={isLoading}
                className="neutral_btn w-full mt-4"
                type="submit"
              >
                {isLoading ? (
                  <div className="flex items-center gap-1 justify-center">
                    <Spinner />
                    <p>Sign In</p>
                  </div>
                ) : (
                  "Sign In"
                )}
              </button>

              <div style={{ marginTop: "40px" }} className="text-center">
                <span className="have_an_account_text">
                  {" "}
                  Already have an account?{" "}
                </span>
                <Link to="/signup" className="sign_up_link">
                  Sign up
                </Link>
              </div>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default Login;
