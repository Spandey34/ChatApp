import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authUser, setAuthUser] = useAuth();
  async function handleSubmit(e) {
    e.preventDefault(); 
    const userInfo = {
      email: email,
      password: password,
    };
    await axios.post("https://chatapp-rowq.onrender.com/api/user/login", userInfo)
    .then((response) => {
      if(response.data) {
        alert("User logged in successfully");
      }
      localStorage.setItem("ChatApp", JSON.stringify(response.data));
      console.log(response.data);
      setAuthUser(response.data);
    })
    .catch((error) => {
      if(error.response) {
        alert("Error: " + error.response.data.message);
      }
    });
  }

  return (
    <>
      <div className="flex h-screen justify-center items-center">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center items-center border border-white p-5 rounded-md space-y-3 w-96"
        >
          <h1 className="text-2xl text-center mb-3">
            Chat<span className="text-green-600 ml-2">App</span>
          </h1>
          <div className="mr-[74%] text-2xl text-white font-bold">Login</div>
          {/*Email */}

          <input type="text" placeholder="Email" className="input" value={email} onChange={(e) => {
            setEmail(e.target.value);
          }} required/>

          {/*Password*/}
          <input type="password" placeholder="Password" className="input" value={password} onChange={(e) => {
            setPassword(e.target.value);
          }} required/>

          {/*Text & Button */}
          <div className="flex justify-between gap-32 items-center">
            <p>
              New User?{" "}
              <Link to={"/signup"} className="text-blue-500 underline cursor-pointer">
                Signup
              </Link>
            </p>
            <input
              type="submit"
              value="Login"
              className="text-white bg-green-500 px-2 py-2  rounded-lg cursor-pointer"

            />
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
