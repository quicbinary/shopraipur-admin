"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { MdLocationOn } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";

export default function ShopApproval() {
  const [shops, setShops] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedShop, setSelectedShop] = useState(null);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [totalPages, setTotalPages] = useState(1); // Default to 1 page initially

  const API_KEY = "98bg54656b6f5b03xdfgxcfg55f42e78e922a345cdg5erc403dfa42f8";

  const fetchShops = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        `http://localhost:3001/api/shops?isApproved=false&page=${currentPage}&limit=5&startDate=${startDate}&endDate=${endDate}&category=${selectedCategory}`,
        {
          headers: { kuchi: API_KEY },
        }
      );

      // Ensure shops are sorted by 'createdAt' in descending order (most recent first)
      const sortedShops = response.data.shops.sort((a, b) => {
        // Check if 'createdAt' is a valid date, then sort by descending order
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return dateB - dateA; // Descending order
      });

      setShops(sortedShops);

      // Set totalPages based on the API response
      setTotalPages(response?.data?.pagination?.totalPages || 1); // Fallback to 1 if not provided
    } catch (err) {
      setError("Failed to fetch shops");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/categories", {
        headers: { kuchi: API_KEY },
      });
      setCategories(response.data);
    } catch (err) {
      console.error("Failed to fetch categories", err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchShops();
  }, [currentPage, startDate, endDate, selectedCategory]);

  const approveShop = async (shopId) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to approve this shop?"
    );
    if (!isConfirmed) return;

    try {
      const response = await axios.put(
        `http://localhost:3001/api/shops/${shopId}`,
        { isApproved: true },
        { headers: { kuchi: API_KEY } }
      );

      if (response.status === 200) {
        setShops((prevShops) =>
          prevShops.map((shop) =>
            shop._id === shopId ? { ...shop, isApproved: true } : shop
          )
        );
        alert("Shop approved successfully!");
        fetchShops();
      }
    } catch (error) {
      console.error("Failed to approve shop", error);
      alert("Failed to approve the shop. Please try again.");
    }
  };

  const deleteShop = async (shopId) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this shop?"
    );
    if (!isConfirmed) return;

    try {
      const response = await axios.delete(
        `http://localhost:3001/api/shops/${shopId}`,
        { headers: { kuchi: API_KEY } }
      );

      if (response.status === 200) {
        setShops((prevShops) =>
          prevShops.filter((shop) => shop._id !== shopId)
        );
        alert("Shop deleted successfully!");
      }
    } catch (error) {
      console.error("Failed to delete shop", error);
      alert("Failed to delete the shop. Please try again.");
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
    <div className="p-6 w-full bg-white rounded-md shadow-md">
      {/* Filter Section */}
      <div className="bg-white px-10 py-10 mb-8 w-full">
        <h2 className="text-lg font-bold mb-4 text-purple-600">Filter</h2>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <label className="block text-sm font-medium">
              Select Category
            </label>
            <select
              className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category._id} value={category.name}>
                  {category.name}
                </option>
              ))}
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
      <h2 className="text-lg font-bold mb-4 text-purple-600">Shop Approval</h2>
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
              <button
                className="px-10 py-2 bg-purple-500 text-white rounded-lg"
                onClick={() => deleteShop(shop._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="bg-white p-6 rounded-lg text=-center">
          No shops pending approval
        </div>
      )}

      {/* Pagination */}
      
      
      <div className="flex justify-center space-x-2 mt-6">
  {totalPages > 1 && (
    <>
      {/* Previous Button */}
      <button
        disabled={currentPage === 1}
        className="px-3 py-1 border border-gray-300 rounded-lg text-gray-600"
        onClick={() => setCurrentPage(currentPage - 1)}
      >
        &lt;
      </button>

      {/* Page Numbers */}
      {Array.from({ length: totalPages }, (_, index) => index + 1)
        .slice(
          Math.max(0, currentPage - 3),
          Math.min(totalPages, currentPage + 2)
        )
        .map((page) => (
          <button
            key={page}
            className={`px-3 py-1 rounded-lg ${
              page === currentPage
                ? "bg-purple-500 text-white"
                : "bg-white text-gray-600 border border-gray-300"
            }`}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </button>
        ))}

      {/* Next Button */}
      <button
        disabled={currentPage === totalPages}
        className="px-3 py-1 border border-gray-300 rounded-lg text-gray-600"
        onClick={() => setCurrentPage(currentPage + 1)}
      >
        &gt;
      </button>
    </>
  )}
</div>


      {isModalOpen && (
        <Modal shop={selectedShop} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
}

function Modal({ shop, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-[90%] max-w-[800px] relative">
        {/* Close Icon in Top Right */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-700 hover:text-gray-900"
        >
          <AiOutlineClose size={24} />
        </button>

        {/* Shop Logo and Name Centered */}
        <div className="flex flex-col items-center mb-6">
          <Image
            src={shop.shopLogo}
            alt={`${shop.shopName} Logo`}
            className="w-24 h-24 rounded-full object-cover mb-4"
          />
          <h3 className="text-3xl font-semibold text-center">
            {shop.shopName}
          </h3>
        </div>

        {/* Shop Details */}
        <div className="mb-6">
          <p className="text-lg text-gray-700">
            <strong>Owner:</strong> {shop.ownerName}
          </p>
          <p className="text-lg text-gray-700">
            <strong>Phone Number:</strong> {shop.phoneNumber}
          </p>
          <p className="text-lg text-gray-700">
            <strong>Address:</strong> {shop.address}
          </p>
          <p className="text-lg text-gray-700">
            <strong>GST Number:</strong> {shop.gst}
          </p>
          <p className="text-lg text-gray-700">
            <strong>Area:</strong> {shop.area}
          </p>
          <p className="text-lg text-gray-700">
            <strong>Shop Categories:</strong>{" "}
            {shop.shopCategories
              ? shop.shopCategories.join(", ")
              : "Not specified"}
          </p>
          <p className="text-lg text-gray-700">
            <strong>Product Limit:</strong> {shop.productLimit}
          </p>
          <p className="text-lg text-gray-700">
            <strong>Approval Status:</strong>{" "}
            {shop.isApproved ? "Approved" : "Not Approved"}
          </p>
        </div>
      </div>
    </div>
  );
}
