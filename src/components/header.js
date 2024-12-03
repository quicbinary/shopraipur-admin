// components/Header.js
"use client";
import { useState, useEffect } from "react";

export default function Header({ title }) {
  const [user, setUser] = useState("");

  useEffect(() => {
    // Retrieve username from localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser); // Default to 'User' if no name is found
    }
  }, []);

  return (
    <header className="flex justify-between items-center p-6 bg-white rounded-md shadow-md">
      <h1 className="text-xl font-semibold text-gray-800 font-montserrat">{title}</h1>
      <div className="flex items-center space-x-4">
        <div className="flex items-center">
          <div
            className="relative w-10 h-10 rounded-full inline-flex items-center justify-center"
            style={{ backgroundColor: user.color }}
          >
            <span className="text-white font-bold text-lg">
              {user?.adminName?.charAt(0)?.toUpperCase()}
            </span>
          </div>
          <span className="text-md font-montserrat font-semibold text-gray-700 ml-2">
            {user?.adminName}
          </span>
        </div>
      </div>
    </header>
  );
}
