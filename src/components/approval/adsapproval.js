"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { FaTrashAlt } from "react-icons/fa";

export default function AdsApproval() {
  const [adType, setAdType] = useState("Banner Ad");
  const [ads, setAds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const adsPerPage = 5; // Number of ads to show per page
  const apiKey = "your-api-key-here"; // Replace with your actual API key

  // Fetch ads data based on selected adType and page
  const fetchAds = async () => {
    if (adType) {
      try {
        const queryParams = new URLSearchParams({
          adType,
          isApproved: "false",
          fromDate,
          toDate,
          page: currentPage,
          limit: adsPerPage,
        }).toString();

        const response = await axios.get(
          `http://localhost:3001/api/ads?${queryParams}`,
          {
            headers: {
              kuchi: `98bg54656b6f5b03xdfgxcfg55f42e78e922a345cdg5erc403dfa42f8`,
            },
          }
        );

        setAds(response.data.ads);
        setTotalPages(response?.data?.pagination?.totalPages);
      } catch (error) {
        console.error("Error fetching ads data", error);
      }
    }
  };

  useEffect(() => {
    fetchAds();
  }, [adType, fromDate, toDate, currentPage]);



  const handleApprove = async (adId) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to approve this ad?"
    );

    if (isConfirmed) {
      try {
        const updatedAds = ads.map((ad) =>
          ad._id === adId ? { ...ad, isApproved: true } : ad
        );
        setAds(updatedAds);

        alert("Ad Approved!");

        await axios.put(
          `http://localhost:3001/api/ads/${adId}`,
          { isApproved: true },
          {
            headers: {
              kuchi: `98bg54656b6f5b03xdfgxcfg55f42e78e922a345cdg5erc403dfa42f8`,
            },
          }
        );

        fetchAds();
      } catch (error) {
        console.error("Error approving ad", error);
      }
    }
  };

  const handleDelete = async (adId) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this ad?"
    );

    if (isConfirmed) {
      try {
        await axios.delete(`http://localhost:3001/api/ads/${adId}`, {
          headers: {
            kuchi: `98bg54656b6f5b03xdfgxcfg55f42e78e922a345cdg5erc403dfa42f8`,
          },
        });

        setAds((prevAds) => prevAds.filter((ad) => ad._id !== adId));
        alert("Ad Deleted!");
      } catch (error) {
        console.error("Error deleting ad", error);
      }
    }
  };

  const handleDownload = (url) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = url.substring(url.lastIndexOf("/") + 1);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="pt-10">
      <div className="bg-white shadow-md rounded-lg p-8">
        <h1 className="text-2xl font-bold mb-6">Ads Approval</h1>
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ad Type
            </label>
            <select
              value={adType}
              onChange={(e) => setAdType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="Banner Ad">Homepage Banner</option>
              <option value="Story Ad">Story Ad</option>
              <option value="Shorts Ad">Shorts Ad</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              From
            </label>
            <input
              type="date"
              className="w-40 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              To
            </label>
            <input
              type="date"
              className="w-40 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
          </div>
        </div>

        {ads.length > 0 ? (
          ads.map((ad) => (
            <div
              key={ad._id}
              className="border border-gray-300 rounded-lg p-4 bg-gray-50"
            >
              <div className="flex justify-between items-center">
                {ad.type === "Video" ? (
                  <div className="w-40 h-54">
                    <video
                      width="100%"
                      height="auto"
                      controls
                      className="rounded-md border h-60"
                    >
                      <source src={ad.url} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                ) : (
                  <Image
                    src={ad.url}
                    alt="Ad image"
                    width={200}
                    height={400}
                    className="w-60 h-50 rounded-md border"
                  />
                )}

                <div className="flex justify-center items-center gap-6">
                  <button className="px-4 py-2 bg-purple-500 text-white rounded-md shadow hover:bg-purple-600">
                    View
                  </button>
                  <button
                    onClick={() => handleApprove(ad._id)}
                    className="px-4 py-2 bg-purple-500 text-white rounded-md shadow hover:bg-purple-600"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleDelete(ad._id)}
                    className="px-4 py-3 bg-purple-500 text-white rounded-md shadow hover:bg-red-600"
                  >
                    <FaTrashAlt /> {/* Replace with React icon for delete */}
                  </button>
                  <button
                    onClick={() => handleDownload(ad.url, ad.type)}
                    className="px-4 py-2 bg-purple-500 text-white rounded-md shadow hover:bg-blue-600"
                  >
                    Download
                  </button>
                </div>

                <div className="flex gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Select Start Date
                    </label>
                    <input
                      type="date"
                      className="w-40 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                      value={ad.startDate ? ad.startDate.slice(0, 10) : ""}
                      onChange={(e) =>
                        handleDateChange(ad._id, "startDate", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Select End Date
                    </label>
                    <input
                      type="date"
                      className="w-40 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                      value={ad.endDate ? ad.endDate.slice(0, 10) : ""}
                      onChange={(e) =>
                        handleDateChange(ad._id, "endDate", e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-lg text-gray-500">
            No ads for approval
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
      </div>
    </div>
  );
}
