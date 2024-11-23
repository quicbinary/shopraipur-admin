"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";

function Page() {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);

  // State for Add Admin form
  const [formData, setFormData] = useState({
    adminName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const fetchAdmins = async () => {
    try {
      const apiKey ="98bg54656b6f5b03xdfgxcfg55f42e78e922a345cdg5erc403dfa42f8"; // Replace with your actual API key
      const response = await axios.get("http://localhost:3001/api/admins", {
        headers: {
          kuchi: `${apiKey}`, // Pass the API key
        },
      });
      setAdmins(response.data); // Store the fetched data in state
    } catch (error) {
      console.error("Error fetching admins:", error);
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  // Fetch admin data from API
  useEffect(() => {
    fetchAdmins();
  }, []);

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    // Validation
    const passwordRegex = /^(?=.[A-Z])(?=.\d)(?=.[!@#$%^&]).{8,}$/; // At least 1 uppercase, 1 number, 1 special character, 8+ chars

    if (!passwordRegex.test(formData.password)) {
      setErrorMessage(
        "Password must be at least 8 characters long, contain an uppercase letter, a number, and a special character."
      );
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match!");
      return;
    }

    const emailExists = admins.some(
      (admin) => admin.email.toLowerCase() === formData.email.toLowerCase()
    );
    if (emailExists) {
      setErrorMessage("Email already exists!");
      return;
    }

    // Submit data to the API
    try {
      const apiKey =
        "98bg54656b6f5b03xdfgxcfg55f42e78e922a345cdg5erc403dfa42f8"; // Replace with your actual API key
      const response = await axios.post(
        "http://localhost:3001/api/admins",
        {
          adminName: formData.adminName,
          email: formData.email,
          password: formData.password,
          role: formData.role,
        },
        {
          headers: {
            kuchi: `${apiKey}`,
          },
        }
      );

      // Append new admin to the list
      setAdmins((prev) => [...prev, response.data]);
      setSuccessMessage("Admin added successfully!");

      // Reset form
      setFormData({
        adminName: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "",
      });

      await fetchAdmins();
    } catch (error) {
      setErrorMessage("Error adding admin: " + error.message);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center bg-white py-6 px-10 rounded-lg shadow-lg mb-8 w-full">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <div className="flex items-center space-x-2">
          <Image
            src="/assets/logo.jpg"
            alt="Profile"
            width={150}
            height={300}
            className="w-10 h-10 rounded-full"
          />
          <span>Nikhil Mitra</span>
        </div>
      </div>

      {/* Admin Table */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6">Admin</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-gray-600">
                <th className="py-3 border-b">Name</th>
                <th className="py-3 border-b">Email</th>
                <th className="py-3 border-b">Logo</th>
                <th className="py-3 border-b">Admin Type</th>
                <th className="py-3 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {admins.map((admin) => (
                <tr key={admin._id} className="border-b">
                  <td className="py-4">{admin?.adminName}</td>
                  <td className="py-4">{admin?.email}</td>
                  <td className="py-4">
                    <div
                      className="relative w-10 h-10 rounded-full inline-flex items-center justify-center"
                      style={{ backgroundColor: admin.color }}
                    >
                      <span className="text-white font-bold text-lg">
                        {admin?.adminName?.charAt(0)?.toUpperCase()}
                      </span>
                    </div>
                  </td>
                  <td className="py-4">{admin.role}</td>
                  <td className="py-4">
                    <button className="bg-purple-600 text-white px-3 py-1 rounded-sm mr-2">
                      Change Password
                    </button>
                    <button className="text-red-500">
                      <i className="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Add Admin Form */}
      <div>
        <div className="bg-white p-6 rounded-lg shadow-lg mt-6">
          <h3 className="text-xl font-semibold text-purple-600 mb-4">
            Add Admin
          </h3>
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          {successMessage && <p className="text-green-500">{successMessage}</p>}
          <form
            onSubmit={handleFormSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div>
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                name="adminName"
                value={formData.adminName}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
              />
            </div>
            <div>
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
              />
            </div>
            <div>
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
              />
            </div>
            <div>
              <label className="block text-gray-700">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
              />
            </div>
            <div>
              <label className="block text-gray-700">Admin Type</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
              >
                <option value="">Select Admin Type</option>
                <option value="Super Admin">SuperAdmin</option>
                <option value="Admin">Admin</option>
              </select>
            </div>

            <div className="col-span-2 text-right">
              <button
                type="submit"
                className="bg-purple-600 text-white py-2 px-6 rounded-sm"
              >
                Add Admin
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Page;