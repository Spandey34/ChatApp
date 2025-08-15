import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [authUser, setAuthUser] = useAuth();

   async function handleSubmit(e) {
    e.preventDefault();
    const userInfo = {
        fullname: fullname,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
        };
    //console.log(userInfo);

    await axios.post("https://chatapp-rowq.onrender.com/api/user/signup", userInfo)
    .then((response) => {
      if(response.data)
      {
        alert("User created successfully");

      }

      console.log(response.data);
      localStorage.setItem("ChatApp", JSON.stringify(response.data));
      setAuthUser(response.data);
    })
    .catch((error) => {
      if(error.response)
      {
        alert("Error: "+error.response.data.message)
      }
    })
  }
  

  return (
    <>
      <div className="flex h-screen justify-center items-center">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center items-center border border-white p-5 rounded-md space-y-3 w-96"
        >
          <h1 className="text-2xl text-center mb-5">
            Chat<span className="text-green-600 ml-2">App</span>
          </h1>
          <div className="mr-[65%] mb-3 text-2xl text-white font-bold">
            Signup
          </div>
          {/*Username*/}
          <label className="input validator">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </g>
            </svg>
            <input
              type="text"
              required
              placeholder="Full Name"
              pattern="[A-Za-z][A-Za-z0-9\- ]*"
              minLength="3"
              maxLength="30"
              title="Only letters, numbers or dash"
              value={fullname}
              onChange={(e) => {
                setFullname(e.target.value);
              }}
            />
          </label>
          {/*Email */}

          <label className="input validator">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
              </g>
            </svg>
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </label>
          <div className="validator-hint hidden">Enter valid email address</div>

          {/*Password*/}
          <label className="input validator">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
              </g>
            </svg>
            <input
              type="password"
              required
              placeholder="Password"
              minLength="8"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </label>
          <p className="validator-hint hidden">
            Must be more than 8 characters, including
            <br />
            At least one number <br />
            At least one lowercase letter <br />
            At least one uppercase letter
          </p>

          {/*Confirm Password*/}
          <input
            type="password"
            className="input"
            required
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          />
          {password !== confirmPassword && (
            <span className="text-red-500 font-semibold">
              Passwords Do not Match
            </span>
          )}

          {/*Text & Button */}
          <div className="flex justify-between gap-24 items-center">
            <p>
              Have an account?{" "}
              <Link to={"/login"} className="text-blue-500 underline cursor-pointer">
                Login
              </Link>
            </p>
            <input
              type="submit"
              value="Signup"
              className="text-white bg-green-500 px-2 py-2  rounded-lg cursor-pointer"
              disabled={password !== confirmPassword || !email || !fullname}
            />
          </div>
        </form>
      </div>
    </>
  );
}

export default Signup;
