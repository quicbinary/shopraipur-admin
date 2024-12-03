"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";

function Page() {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);

  // States for Add Admin form
  const [formData, setFormData] = useState({
    adminName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // States for password change modal
  const [showModal, setShowModal] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [passwordData, setPasswordData] = useState({
    newPassword: "",
    confirmNewPassword: "",
  });

  const fetchAdmins = async () => {
    try {
      const apiKey =
        "98bg54656b6f5b03xdfgxcfg55f42e78e922a345cdg5erc403dfa42f8";
      const response = await axios.get("http://localhost:3001/api/admins", {
        headers: {
          kuchi: `${apiKey}`,
        },
      });
      setAdmins(response.data);
    } catch (error) {
      console.error("Error fetching admins:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  // Add Admin functionality
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;

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

    try {
      const apiKey =
        "98bg54656b6f5b03xdfgxcfg55f42e78e922a345cdg5erc403dfa42f8";
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

      setAdmins((prev) => [...prev, response.data]);
      setSuccessMessage("Admin added successfully!");
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

  // Password change functionality
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const handleOpenModal = (admin) => {
    setSelectedAdmin(admin);
    setShowModal(true);
    setPasswordData({ newPassword: "", confirmNewPassword: "" });
    setErrorMessage(null);
    setSuccessMessage(null);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedAdmin(null);
  };

  const handleSubmitPassword = async () => {
    const { newPassword, confirmNewPassword } = passwordData;
    setErrorMessage(null);
    setSuccessMessage(null);

    if (newPassword !== confirmNewPassword) {
      setErrorMessage("Passwords do not match!");
      return;
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
    if (!passwordRegex.test(newPassword)) {
      setErrorMessage(
        "Password must be at least 8 characters, include an uppercase letter, a number, and a special character."
      );
      return;
    }

    try {
      const apiKey =
        "98bg54656b6f5b03xdfgxcfg55f42e78e922a345cdg5erc403dfa42f8";
      await axios.put(
        `http://localhost:3001/api/admins/${selectedAdmin._id}`,
        { password: newPassword },
        {
          headers: { kuchi: `${apiKey}` },
        }
      );
      setSuccessMessage("Password updated successfully!");
      setTimeout(handleCloseModal, 2000);
    } catch (error) {
      setErrorMessage("Error updating password: " + error.message);
    }
  };
  // Function to handle admin deletion
  const handleDeleteAdmin = async (adminId) => {
    try {
      const apiKey =
        "98bg54656b6f5b03xdfgxcfg55f42e78e922a345cdg5erc403dfa42f8";
      await axios.delete(`http://localhost:3001/api/admins/${adminId}`, {
        headers: { kuchi: `${apiKey}` },
      });
      setAdmins((prev) => prev.filter((admin) => admin._id !== adminId)); // Update state to remove admin
    } catch (error) {
      console.error("Error deleting admin:", error);
    }
  };

  return (
    <div className="p-10 bg-gray-100">
      {/* Admin Table */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-6 text-purple-600 font-montserrat">Admin</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table className="w-full text-left border-collapse font-medium font-montserrat text-sm">
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
                    <button
                      onClick={() => handleOpenModal(admin)}
                      className="bg-purple-600 text-white px-3 py-1 rounded-sm mr-2"
                    >
                      Change Password
                    </button>
                    <button
                      onClick={() => handleDeleteAdmin(admin._id)}
                      className="bg-red-600 text-white px-3 py-1 rounded-sm"
                    >
                      Remove
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
        <div className="bg-white p-6 rounded-lg shadow-md mt-6">
          <h3 className="text-xl font-montserrat font-semibold text-purple-600 mb-4">
            Add Admin
          </h3>
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          {successMessage && <p className="text-green-500">{successMessage}</p>}
          <form
            onSubmit={handleFormSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div>
              <label className="block text-gray-700 font-medium font-montserrat text-sm">Name</label>
              <input
                type="text"
                name="adminName"
                value={formData.adminName}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-lg p-2 font-medium font-montserrat text-sm"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium font-montserrat text-sm">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-lg p-2 font-medium font-montserrat text-sm"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium font-montserrat text-sm">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-lg p-2 font-medium font-montserrat text-sm"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium font-montserrat text-sm">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-lg p-2 font-medium font-montserrat text-sm"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium font-montserrat text-sm">Role</label>
              <input
                type="text"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-lg p-2 font-medium font-montserrat text-sm"
              />
            </div>
            <div className="col-span-full">
              <button
                type="submit"
                className="bg-purple-600 text-white px-4 py-2 rounded-md font-medium font-montserrat text-sm"
              >
                Add Admin
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Password Change Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4 font-montserrat">
              Change Password for {selectedAdmin?.adminName}
            </h2>
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            {successMessage && (
              <p className="text-green-500">{successMessage}</p>
            )}
            <div>
              <label className="block text-gray-700 font-medium font-montserrat text-sm">New Password</label>
              <input
                type="password"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                className="mt-1 block w-full border border-gray-300 rounded-lg p-2 font-medium font-montserrat text-sm"
              />
            </div>
            <div>
              <label className="block text-gray-700 mt-4 font-medium font-montserrat text-sm">
                Confirm New Password
              </label>
              <input
                type="password"
                name="confirmNewPassword"
                value={passwordData.confirmNewPassword}
                onChange={handlePasswordChange}
                className="mt-1 block w-full border border-gray-300 rounded-lg p-2 font-medium font-montserrat text-sm"
              />
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleCloseModal}
                className="text-gray-600 px-4 py-2 mr-2 font-medium font-montserrat text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitPassword}
                className="bg-purple-600 text-white px-4 py-2 rounded-md font-medium font-montserrat text-sm"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Page;
