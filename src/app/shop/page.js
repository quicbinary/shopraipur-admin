"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { FaTrashAlt, FaMapMarkerAlt } from "react-icons/fa"; // Import React Icons for trash and location
import Link from "next/link"; // Import Link for navigation
import Header from "@/components/header"

const Shops = () => {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [shopsPerPage] = useState(8);
  const API_KEY = "98bg54656b6f5b03xdfgxcfg55f42e78e922a345cdg5erc403dfa42f8";

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/shops?isApproved=true", {
          headers: { kuchi: `${API_KEY}` },
        });
        setShops(response.data.shops);
      } catch (error) {
        console.error("Error fetching shops:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchShops();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const indexOfLastShop = currentPage * shopsPerPage;
  const indexOfFirstShop = indexOfLastShop - shopsPerPage;
  const currentShops = shops.slice(indexOfFirstShop, indexOfLastShop);
  const totalPages = Math.ceil(shops.length / shopsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  if (totalPages <= 3) {
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  } else {
    pageNumbers.push(1);
    if (currentPage > 2) {
      pageNumbers.push("...");
    }
    const start = Math.max(currentPage - 1, 2);
    const end = Math.min(currentPage + 1, totalPages - 1);
    for (let i = start; i <= end; i++) {
      pageNumbers.push(i);
    }
    if (currentPage < totalPages - 1) {
      pageNumbers.push("...");
    }
    pageNumbers.push(totalPages);
  }

  return (
    <div className="bg-gray-100 h-screen">
      <div className="flex-grow p-10">
       {/* Header */}
       <div className="felx w-full mb-6">
      <Header/>
      </div>
        <div className="bg-white shadow-md rounded-lg p-6 mt-8">
          <h3 className="text-lg font-semibold font-montserrat text-purple-500 mb-4">
            Shops List
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {currentShops.map((shop) => (
              <div
                key={shop._id}
                className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg items-center flex flex-col transition-shadow duration-300"
              >
                <Link href={`/shopdetails/${shop._id}`}>
                  <Image
                    src={shop.shopLogo || "https://via.placeholder.com/150"}
                    alt="Shop Logo"
                    className="rounded-lg mb-4"
                    width={250}
                    height={200}
                  />
                </Link>
                <h3 className="text-lg font-semibold font-montserrat">{shop.shopName}</h3>
                <div className="text-gray-500 font-medium font-montserrat flex items-center mt-2">
                  <FaMapMarkerAlt className="text-red-500 mr-2" />
                  <span>{shop.area}</span>
                </div>
              </div>
            ))}
          </div>
          {shops.length > shopsPerPage && (
            <div className="flex justify-center items-center mt-8 space-x-2">
              <button
                className={`px-3 py-1 border rounded-md ${
                  currentPage === 1 ? "cursor-not-allowed opacity-50" : ""
                }`}
                onClick={() =>
                  currentPage > 1 && setCurrentPage(currentPage - 1)
                }
                disabled={currentPage === 1}
              >
                Prev
              </button>
              {pageNumbers.map((number, index) => (
                <button
                  key={index}
                  className={`px-3 py-1 border rounded ${
                    currentPage === number ? "bg-gray-300" : "bg-gray-200"
                  }`}
                  onClick={() =>
                    paginate(number === "..." ? currentPage : number)
                  }
                  disabled={number === "..."}
                >
                  {number}
                </button>
              ))}
              <button
                className={`px-3 py-1 border rounded-md ${
                  currentPage === totalPages
                    ? "cursor-not-allowed opacity-50"
                    : ""
                }`}
                onClick={() =>
                  currentPage < totalPages && setCurrentPage(currentPage + 1)
                }
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shops;
