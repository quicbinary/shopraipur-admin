"use client";

import { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";
import bcrypt from "bcryptjs";

export default function LoginForm() {
    const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const apiKey = "98bg54656b6f5b03xdfgxcfg55f42e78e922a345cdg5erc403dfa42f8"; // Replace with your actual API key
  const apiUrl = `http://localhost:3001/api/vendor?email=${email}`; // Replace with your API endpoint

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!email || !password) {
      alert("Please fill in both fields.");
      return;
    }
  
    try {
      const response = await axios.get(apiUrl, {
        headers: {
          "Content-Type": "application/json",
           kuchi: apiKey
        },
      });
  
      const user = response?.data[0];
  
      if (user) {
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (isPasswordMatch) {
          // Store user data in localStorage
          localStorage.setItem("user", JSON.stringify(user));
  
          // Redirect to home page
          router.push("/dashboard");
        } else {
          setErrorMessage("Invalid password, please try again.");
        }
      } else {
        setErrorMessage("User not found, please check your email.");
      }
    } catch (error) {
      console.error("Error during login:", error.message);
      setErrorMessage("An error occurred. Please try again later.");
    }
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      {/* Left Section with Image */}
      <div className="p-6 flex items-center justify-center bg-gray-100 rounded-sm shadow-md">
        <Image
          src="/assets/image.png" // Replace this with the path to your image
          alt="Login Illustration"
          width={500}
          height={500}
          className="rounded-lg"
        />
      </div>

      {/* Right Section with Login Form */}
      <div className="p-8 flex flex-col items-start">
        <div className="text-purple-600 text-xl font-bold mb-4">SHOPRAIPUR</div>
        <h2 className="text-6xl font-bold text-purple-600 mb-2">ADMIN LOGIN</h2>
        <p className="mb-6">Enter the credentials to login to the admin portal</p>
        <form onSubmit={handleSubmit} className="w-full flex flex-col items-start">
          {/* Email Field */}
          <div className="mb-4 flex items-center border bg-gray-200 rounded p-2 w-full">
            <FaUser className="pr-2 text-2xl text-black" />
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-200 w-full p-1 focus:outline-none placeholder-black"
            />
          </div>

          {/* Password Field */}
          <div className="mb-6 flex items-center border bg-gray-200 rounded p-2 w-full">
            <FaLock className="pr-2 text-2xl text-black" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-200 w-full p-1 focus:outline-none placeholder-black"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition duration-200"
          >
            Login
          </button>
        </form>
        {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
      </div>
    </div>
  );
}
