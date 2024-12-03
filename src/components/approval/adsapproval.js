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
    <div>
      <div className="bg-white shadow-md rounded-lg p-8">
        <h1 className="text-xl font-semibold mb-6 text-purple-600 font-montserrat">Ads Approval</h1>
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1 font-montserrat">
              Ad Type
            </label>
            <select
              value={adType}
              onChange={(e) => setAdType(e.target.value)}
              className="w-96 font-medium font-montserrat px-4 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="Banner Ad">Homepage Banner</option>
              <option value="Story Ad">Story Ad</option>
              <option value="Shorts Ad">Shorts Ad</option>
              <option value="Promoted Products">Promoted Products</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 font-montserrat">
              From
            </label>
            <input
              type="date"
              className="font-montserrat w-40 px-4 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 font-montserrat">
              To
            </label>
            <input
              type="date"
              className="font-montserrat w-40 px-4 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
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
                      className="rounded-md border h-60 font-montserrat"
                    >
                      <source src={ad.url} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                ) : (
                  // promoted products start here
                  <div className="shadow-md max-w-64 p-4 font-medium font-montserrat">
                    <Image
                      src={
                        adType === "Promoted Products"
                          ? ad.productId.productImages[0]
                          : ad.url
                      }
                      alt="Ad image"
                      width={adType === "Promoted Products" ? 100 : 200}
                      height={adType === "Promoted Products" ? 200 : 400}
                      className="w-60 h-50 rounded-md border font-medium font-montserrat"
                    />
                    {adType === "Promoted Products" && (
                      <>
                        <p>{ad?.productId?.productName}</p>
                        <p>{ad?.productId?.productDescription}</p>
                      </>
                    )}
                  </div>
                )}

                <div className="flex justify-between items-center gap-4">
                  <button className="px-4 py-2 bg-purple-500 text-white rounded-md shadow hover:bg-purple-600 font-montserrat font-medium">
                    View
                  </button>
                  <button
                    onClick={() => handleApprove(ad._id)}
                    className="px-4 py-2 bg-purple-500 text-white rounded-md shadow hover:bg-purple-600 font-montserrat font-medium"
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
                    className="px-4 py-2 bg-purple-500 text-white rounded-md shadow hover:bg-blue-600 font-montserrat font-medium"
                  >
                    Download
                  </button>
                </div>

                <div className="flex gap-4">
                  <div>
                    <label className="block text-sm text-gray-700 mb-1 font-medium font-montserrat">
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
                    <label className="block text-sm font-medium font-montserrat text-gray-700 mb-1">
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
          <div className="text-center text-lg text-gray-500 font-medium font-montserrat">
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
