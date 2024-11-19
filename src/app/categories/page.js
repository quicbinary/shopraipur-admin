"use client";
import Image from "next/image";
import { useState } from "react";

export default function CategoryList() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="bg-gray-100" data-menu-open={menuOpen}>
      <div className="flex">
        {/* Toggle Button for Small Screens */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-white bg-purple-600 p-3 rounded-md fixed top-4 left-4 lg:hidden z-50"
        >
          ☰ Menu
        </button>

        {/* Full-Screen Overlay */}
        {menuOpen && (
          <div
            onClick={() => setMenuOpen(false)}
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          ></div>
        )}

        {/* Main Content */}
        <div className="flex-grow p-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-semibold">Category</h2>
            <div className="flex items-center space-x-2">
            <Image
          src="/assets/logo.jpg"
          alt="Profile"
          width={150} 
          height={300}
          className="w-10 h-10 rounded-full"
        />
              <span className="font-semibold">Nikhil Mitra</span>
            </div>
          </div>

          {/* Category List Table */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Category List</h3>
            <table className="w-full text-left rounded-lg">
              <thead>
                <tr className="text-gray-600 border-b">
                  <th className="px-4 py-2">S. No.</th>
                  <th className="px-4 py-2">Category Image</th>
                  <th className="px-4 py-2">Category Name</th>
                  <th className="px-4 py-2">Total Products</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {/* Repeatable Rows */}
                <tr className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">1</td>
                  <td className="px-4 py-2">
                  <Image
          src="/assets/logo.jpg"
          alt="Profile"
          width={150} 
          height={300}
          className="w-10 h-10 rounded-full"
        />
                  </td>
                  <td className="px-4 py-2">Clothing</td>
                  <td className="px-4 py-2">110</td>
                  <td className="px-4 py-2 flex items-center space-x-2">
                    <button className="text-purple-500 hover:text-purple-700">
                      <span className="material-icons">delete</span>
                    </button>
                    <button className="bg-purple-500 text-white px-4 py-1 rounded hover:bg-purple-600">
                      Edit
                    </button>
                  </td>
                </tr>
                {/* Add more rows as needed */}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="flex justify-end mt-4 space-x-2">
              <button className="px-3 py-1 border rounded bg-gray-200">1</button>
              <button className="px-3 py-1 border rounded">2</button>
              <button className="px-3 py-1 border rounded">...</button>
              <button className="px-3 py-1 border rounded">10</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
