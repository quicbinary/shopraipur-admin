"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { MdLocationOn } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai"; // Import cross icon from React Icons

export default function ShopApproval() {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedShop, setSelectedShop] = useState(null);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  console.log(startDate, endDate)

  const API_KEY = "98bg54656b6f5b03xdfgxcfg55f42e78e922a345cdg5erc403dfa42f8";

  // Fetch shops function
  const fetchShops = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:3001/api/shops?isApproved=false&page=${currentPage}&startDate=${startDate}&endDate=${endDate}`,
        {
          headers: {
            kuchi: `${API_KEY}`,
          },
        }
      );
      setShops(response.data);
    } catch (err) {
      setError("Failed to fetch shops");
    } finally {
      setLoading(false);
    }
  };
  

  // Fetch shops on initial render and when the page changes
  useEffect(() => {
    fetchShops();
  }, [currentPage, startDate, endDate]); // Added startDate and endDate as dependencies
  
  const approveShop = async (shopId) => {
    // Ask for confirmation before approving the shop
    const isConfirmed = window.confirm(
      "Are you sure you want to approve this shop?"
    );

    if (!isConfirmed) {
      return; // If not confirmed, do nothing
    }

    try {
      // Sending PUT request to approve the shop
      const response = await axios.put(
        `http://localhost:3001/api/shops/${shopId}`,
        {
          isApproved: true, // Set isApproved to true
        },
        {
          headers: {
            kuchi: `${API_KEY}`,
          },
        }
      );

      if (response.status === 200) {
        // Update the local state to reflect the approval
        setShops((prevShops) =>
          prevShops.map((shop) =>
            shop._id === shopId ? { ...shop, isApproved: true } : shop
          )
        );

        // Show alert to confirm the approval
        alert("Shop approved successfully!");

        // Refetch the list of shops after approval
        fetchShops(); // Now fetches updated shop data
      }
    } catch (error) {
      console.error("Failed to approve shop", error);
      alert("Failed to approve the shop. Please try again.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  const openModal = (shop) => {
    setSelectedShop(shop);
    setIsModalOpen(true);
  };

  return (
    <div className="p-6 w-full bg-white rounded-xl">
      {/* Filter Section */}
      <div className="bg-white px-10 py-10 rounded-lg shadow-lg mb-8 w-full">
        <h2 className="text-lg font-semibold mb-4">Filter</h2>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Select Category
            </label>
            <select className="mt-1 block w-full p-2 border border-gray-300 rounded-lg">
              <option>Select Category</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                From
              </label>
              <input
                type="date"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                To
              </label>
              <input
  type="date"
  className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
  value={endDate}
  onChange={(e) => setEndDate(e.target.value)}
/>
            </div>
          </div>
        </div>
      </div>

      {/* Shop Approval Section */}
      <h2 className="text-lg font-bold mb-4">Shop Approval</h2>
      {shops.length > 0 ? (
        shops.map((shop) => (
          <div
            key={shop._id}
            className="flex mt-8 w-full justify-around bg-gray-200 border-black rounded-lg border-b p-4"
          >
            <div className="bg-white w-[35%] items-center p-3 shadow-lg rounded-lg flex gap-3">
              <a href={`/shopdetail/${shop._id}`}>
                <Image
                  src={shop.shopLogo || "/assets/placeholder.png"}
                  alt={shop.shopName}
                  width={120}
                  height={120}
                  className="rounded-lg"
                />
              </a>
              <div>
                <h3 className="text-lg font-semibold">{shop.shopName}</h3>
                <div className="text-gray-500 flex items-center gap-1">
                  <MdLocationOn className="text-red-500" size={20} />
                  <span>{shop.area || "N/A"}</span>
                </div>
              </div>
            </div>

            <div className="flex space-x-10 items-center justify-between">
              <button
                className="px-10 py-2 bg-purple-500 text-white rounded-lg"
                onClick={() => openModal(shop)}
              >
                View
              </button>
              <button
                className="px-10 py-2 bg-purple-500 text-white rounded-lg"
                onClick={() => approveShop(shop._id)}
              >
                Approve
              </button>
              <a href={`/Buttons/Deleteshop/${shop._id}`}>
                <button className="px-10 py-2 bg-purple-500 text-white rounded-lg">
                  Delete
                </button>
              </a>
            </div>
          </div>
        ))
      ) : (
        <div className="bg-white p-6 rounded-lg text-center">
          No shops pending approval
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center space-x-2 mt-6">
        <button
          disabled={currentPage === 1}
          className="px-3 py-1 border border-gray-300 rounded-lg text-gray-600"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        >
          &lt;
        </button>
        <button className="px-3 py-1 bg-purple-500 text-white rounded-lg">
          {currentPage}
        </button>
        <button
          className="px-3 py-1 border border-gray-300 rounded-lg text-gray-600"
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          &gt;
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <Modal shop={selectedShop} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
}

const Modal = ({ shop, onClose }) => {
  if (!shop) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <AiOutlineClose size={24} />
        </button>

        <Image
          src={shop.shopLogo || "/assets/placeholder.png"}
          alt={shop.shopName}
          width={120}
          height={120}
          className="rounded-lg mb-4 mx-auto"
        />

        <h3 className="text-2xl font-semibold mb-4 text-gray-800">
          {shop.shopName}
        </h3>
        <div className="text-gray-600 mb-4">
          <p>
            <strong>Location:</strong> {shop.area || "N/A"}
          </p>
          <p>
            <strong>Address:</strong> {shop.address || "N/A"}
          </p>
          <p>
            <strong>Owner Name:</strong> {shop.ownerName || "N/A"}
          </p>
          <p>
            <strong>Phone Number:</strong> {shop.phoneNumber || "N/A"}
          </p>
          <p>
            <strong>GST:</strong> {shop.gst || "N/A"}
          </p>
          <p>
            <strong>Product Limit:</strong> {shop.productLimit || "N/A"}
          </p>
          <p>
            <strong>Approval Status:</strong>{" "}
            {shop.isApproved ? "Approved" : "Pending"}
          </p>
        </div>
      </div>
    </div>
  );
};
