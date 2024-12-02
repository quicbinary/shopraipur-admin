"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  ManageBannerAds,
  ManageShortVideoAds,
  ManageStoryAds,
  ManagePromotedAds,
} from "./manageads";

const SelectAdType = () => {
  const [adsData, setAdsData] = useState([]); // State to store ads data
  const [loading, setLoading] = useState(false); // To manage loading state
  const [error, setError] = useState(null); // To manage error state
  const [selectedAdType, setSelectedAdType] = useState("Banner Ad"); // State for selected ad type
  const [pageTitle, setPageTitle] = useState("Manage Banner Ads");
  const [page, setPage] = useState(1); // Current page
  const [limit, setLimit] = useState(1); // Items per page
  const [totalPages, setTotalPages] = useState(1); // Total pages from API response

  const titles = {
    shortVideo: "Manage Short Video Ads",
    storyAds: "Manage Story Ads",
    bannerAds: "Manage Banner Ads",
    promotedAds: "Manage Promoted Ads",
  };

  // Fetch ads data from the API based on adType, page, and limit
  const fetchAds = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `http://localhost:3001/api/ads`, // API endpoint
        {
          params: {
            isApproved: true,
            adType: selectedAdType,
            page,
            limit,
          },
          headers: {
            "Content-Type": "application/json",
            kuchi: "98bg54656b6f5b03xdfgxcfg55f42e78e922a345cdg5erc403dfa42f8", // Replace with your API key
          },
        }
      );

      const sortedAds = response.data.ads.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      ); // Sort ads by created date
      setAdsData(sortedAds);
      setTotalPages(response.data.pagination.totalPages); // Set total pages
    } catch (error) {
      console.error("Error fetching ads:", error);
      setError(error.message); // Handle any errors
    } finally {
      setLoading(false); // Stop loading once the data is fetched
    }
  };

  useEffect(() => {
    fetchAds();
  }, [selectedAdType, page, limit]);

  // Handle ad type change from dropdown
  const handleAdTypeChange = (event) => {
    const selectedType = event.target.value;
    setSelectedAdType(selectedType);
    setPageTitle(titles[selectedType] || "Select Ad Type");
    setPage(1); // Reset to first page when ad type changes
  };

  // Handle delete functionality
  const handleDelete = async (adId) => {
    if (!window.confirm("Are you sure you want to delete this ad?")) return;

    try {
      const response = await axios.delete(
        `http://localhost:3001/api/ads/${adId}`,
        {
          headers: {
            "Content-Type": "application/json",
            kuchi: "98bg54656b6f5b03xdfgxcfg55f42e78e922a345cdg5erc403dfa42f8", // Replace with your API key
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

  // Render the appropriate ad component based on the selected ad type
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

  // Show loading or error message if needed
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-8">
      <div className="p-8 bg-white rounded-lg shadow-lg">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-4 mb-6">
          <h1 className="text-2xl font-semibold">{pageTitle}</h1>
        </div>

        {/* Dropdown for Ad Type Selection */}
        <div className="mb-6">
          <select
            className="w-full md:w-1/3 text-sm border border-gray-300 rounded-lg p-2"
            value={selectedAdType}
            onChange={handleAdTypeChange}
          >
            <option value="Banner Ad">Banner Ads</option>
            <option value="Shorts Ad">Short Video Ads</option>
            <option value="Story Ad">Story Ads</option>
            <option value="Promoted Products">Promoted Ads</option>
          </select>
        </div>

        {/* Render the appropriate ad component */}
        <div>{renderAdComponent()}</div>

        {/* Pagination Controls */}
        <div className="flex justify-between items-center mt-6">
          <button
            disabled={page <= 1}
            className={`px-4 py-2 rounded-md ${
              page <= 1 ? "bg-gray-300" : "bg-blue-500 text-white"
            }`}
            onClick={() => setPage(page - 1)}
          >
            Previous
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button
            disabled={page >= totalPages}
            className={`px-4 py-2 rounded-md ${
              page >= totalPages ? "bg-gray-300" : "bg-blue-500 text-white"
            }`}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>
      </div>         
    </div>
  );
};

export default SelectAdType;
                                                                   