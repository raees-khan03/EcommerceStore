import axios from "axios";
import React, { useState } from "react";

const Login = ({ backendURL, setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const formHandler = async (e) => {
    e.preventDefault();

    console.log("Sending:", email, password); // Debug

    try {
      const res = await axios.post(backendURL + "/api/user/admin", {
        email,
        password,
      });
      if (res.data.success) {
        setToken(res.data.token);
        localStorage.setItem("token", res.data.token);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full">
      <div className="bg-white shadow-md rounded-lg px-8 py-6 max-w-md ">
        <h1 className="text-2xl font-bold mb-4 text-center">Admin Panel</h1>

        <form onSubmit={formHandler}>
          <div className="min-w-72 mb-4 ">
            <p className="text-sm font-medium text-gray-700 mb-2">
              Email Address
            </p>
            <input
              type="email"
              className="w-full rounded-md px-3 py-2 border border-gray-300 outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="min-w-72 mb-4">
            <p className="text-sm font-medium text-gray-700 mb-2">Password</p>
            <input
              type="password"
              className="w-full rounded-md px-3 py-2 border border-gray-300 outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-md"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
