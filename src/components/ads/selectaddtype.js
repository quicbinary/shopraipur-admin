"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  ManageBannerAds,
  ManageShortVideoAds,
  ManageStoryAds,
  ManagePromotedAds,
} from "./manageads";
import Header from "../header";

const SelectAdType = () => {
  const [adsData, setAdsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedAdType, setSelectedAdType] = useState("Banner Ad");
  const [pageTitle, setPageTitle] = useState("Manage Banner Ads");
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [totalPages, setTotalPages] = useState(1);

  const titles = {
    shortVideo: "Manage Short Video Ads",
    storyAds: "Manage Story Ads",
    bannerAds: "Manage Banner Ads",
    promotedAds: "Manage Promoted Ads",
  };

  const fetchAds = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`http://localhost:3001/api/ads`, {
        params: {
          isApproved: true,
          adType: selectedAdType,
          page: currentPage,
          limit,
        },
        headers: {
          "Content-Type": "application/json",
          kuchi: "98bg54656b6f5b03xdfgxcfg55f42e78e922a345cdg5erc403dfa42f8",
        },
      });

      const sortedAds = response.data.ads.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setAdsData(sortedAds);
      setTotalPages(response?.data?.pagination?.totalPages);
    } catch (error) {
      console.error("Error fetching ads:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAds();
  }, [selectedAdType, currentPage, limit]);

  const handleAdTypeChange = (event) => {
    const selectedType = event.target.value;
    setSelectedAdType(selectedType);
    setPageTitle(titles[selectedType] || "Select Ad Type");
    setCurrentPage(1);
  };

  const handleDelete = async (adId) => {
    if (!window.confirm("Are you sure you want to delete this ad?")) return;

    try {
      const response = await axios.delete(
        `http://localhost:3001/api/ads/${adId}`,
        {
          headers: {
            "Content-Type": "application/json",
            kuchi: "98bg54656b6f5b03xdfgxcfg55f42e78e922a345cdg5erc403dfa42f8",
          },
        }
      );

      if (response.status === 200) {
        const updatedAds = adsData.filter((ad) => ad._id !== adId);
        setAdsData(updatedAds);
        alert("Ad deleted successfully!");
      }
    } catch (error) {
      console.error("Error deleting ad:", error);
      alert("Failed to delete the ad. Please try again.");
    }
  };

  const renderAdComponent = () => {
    switch (selectedAdType) {
      case "Shorts Ad":
        return (
          <ManageShortVideoAds adsData={adsData} handleDelete={handleDelete} />
        );
      case "Story Ad":
        return (
          <ManageStoryAds adsData={adsData} handleDelete={handleDelete} />
        );
      case "Banner Ad":
        return (
          <ManageBannerAds adsData={adsData} handleDelete={handleDelete} />
        );
      case "Promoted Products":
        return (
          <ManagePromotedAds adsData={adsData} handleDelete={handleDelete} />
        );
      default:
        return (
          <div className="text-gray-600">
            Please select an ad type to manage.
          </div>
        );
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-10 bg-gray-100">
      {/* Header */}
      <div className="felx w-full mb-6">
      <Header/>
      </div>
      <div className="p-8 bg-white rounded-lg shadow-md">
        <div className="flex justify-between items-center border-b pb-4 mb-6">
          <h1 className="font-semibold  font-montserrat text-xl text-purple-600">{pageTitle}</h1>
        </div>

        <div className="mb-6">
          <select
            className="w-full md:w-1/3 text-sm border border-gray-300 rounded-lg p-2 font-medium font-montserrat"
            value={selectedAdType}
            onChange={handleAdTypeChange}
          >
            <option value="Banner Ad">Banner Ads</option>
            <option value="Shorts Ad">Short Video Ads</option>
            <option value="Story Ad">Story Ads</option>
            <option value="Promoted Products">Promoted Ads</option>
          </select>
        </div>

        <div>{renderAdComponent()}</div>

        {/* Pagination */}
        <div className="flex justify-center space-x-2 mt-6">
          {totalPages > 1 && (
            <>
              <button
                disabled={currentPage === 1}
                className="px-3 py-1 border border-gray-300 rounded-lg text-gray-600"
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                &lt;
              </button>

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
};

export default SelectAdType;
