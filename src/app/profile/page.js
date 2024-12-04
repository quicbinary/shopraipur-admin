"use client";
import React, { useEffect, useState } from "react";
import axios from "axios"; // Import axios
import { useRouter } from "next/navigation";

export default function ProfileHeader() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const apiKey = "98bg54656b6f5b03xdfgxcfg55f42e78e922a345cdg5erc403dfa42f8";
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Set user data to state
    } else {
      // router.push("/notfound"); // Redirect to 404 page if no user is found
    }
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:3001/api/admins/${user._id}`,
        {
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
            kuchi: apiKey,
          },
        }
      );

      // Handle the response (you can redirect, show a success message, etc.)
      alert("Password updated successfully!");
    } catch (error) {
      setError("Error updating password");
      console.error("There was an error updating the password:", error);
    }
  };

  return (
    <div className="bg-gray-100 h-screen p-10 w-full flex-1 justify-center items-center">
      <div className="bg-white rounded-lg shadow-md p-6 flex flex-col sm:flex-row items-center gap-6 mb-8">
        <div
          className="relative w-12 h-12 rounded-md inline-flex items-center justify-center"
          style={{ backgroundColor: user?.color }}
        >
          <span className="text-white font-bold text-xl">
            {user?.adminName?.charAt(0)?.toUpperCase()}
          </span>
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-semibold font-montserrat">
            {user?.adminName}
          </h2>
        </div>
        <div className="flex flex-col items-center">
          <p className="bg-purple-100 px-3 py-1 text-purple-600 font-montserrat font-medium">
            {user?.role}
          </p>
        </div>
      </div>

      <div className="w-full bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-purple-600 mb-4 font-montserrat">
          Edit Profile
        </h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          <div>
            <label className="block text-sm text-gray-600 mb-2 font-medium font-montserrat">
              Name
            </label>
            <input
              type="text"
              placeholder={user?.adminName}
              className="w-full border border-gray-300 rounded-lg p-2 font-medium font-montserrat text-sm"
              readOnly
            />
          </div>
          <div>
            <label className="block font-medium font-montserrat text-sm text-gray-600 mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder={user?.email}
              className="w-full border border-gray-300 rounded-lg p-2 font-medium font-montserrat text-sm"
              readOnly
            />
          </div>
          <div>
            <label className="block font-medium font-montserrat text-sm text-gray-600 mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 font-medium font-montserrat text-sm"
            />
          </div>
          <div>
            <label className="block font-medium font-montserrat text-sm text-gray-600 mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 font-medium font-montserrat text-sm"
            />
          </div>

          {/* Show error message if passwords do not match */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="col-span-1 sm:col-span-2 text-right">
            <button
              type="submit"
              className="bg-purple-600 text-white px-6 py-2 rounded-md font-medium font-montserrat text-sm"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
