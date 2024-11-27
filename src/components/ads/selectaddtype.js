"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Ensure axios is imported
import { ManageBannerAds, ManageShortVideoAds, ManageStoryAds, ManagePromotedAds } from "./manageads"; // Import new component

const SelectAdType = () => {
  const [adsData, setAdsData] = useState([]); // State to store ads data
  const [loading, setLoading] = useState(true); // To manage loading state
  const [error, setError] = useState(null); // To manage error state
  const [selectedAdType, setSelectedAdType] = useState("bannerAds"); // State for selected ad type
  const [pageTitle, setPageTitle] = useState("Manage Banner Ads");

  const titles = {
    shortVideo: "Manage Short Video Ads",
    storyAds: "Manage Story Ads",
    bannerAds: "Manage Banner Ads",
    promotedAds: "Manage Promoted Ads", // Title for Promoted Ads
  };

  // Fetch ads data from the API
  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/ads', {
          headers: {
            'Content-Type': 'application/json',
            kuchi: '98bg54656b6f5b03xdfgxcfg55f42e78e922a345cdg5erc403dfa42f8', // Replace with your API key
          },
        });
        const sortedAds = response.data.ads.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // Sort ads by created date
        setAdsData(sortedAds); // Set the ads data
      } catch (error) {
        console.error('Error fetching ads:', error);
        setError(error.message); // Handle any errors
      } finally {
        setLoading(false); // Stop loading once the data is fetched
      }
    };

    fetchAds(); // Call the fetch function
  }, []);

  // Handle ad type change from dropdown
  const handleAdTypeChange = (event) => {
    const selectedType = event.target.value;
    setSelectedAdType(selectedType);
    setPageTitle(titles[selectedType] || "Select Ad Type");
  };

  // Filter ads data based on the selected ad type
  const filterAdsByType = (adType) => {
    return adsData.filter(ad => ad.adType === adType); // Filter the ads based on adType
  };

  // Handle delete functionality
  const handleDelete = async (adId) => {
    if (!window.confirm("Are you sure you want to delete this ad?")) return;

    try {
      const response = await axios.delete( `http://localhost:3001/api/ads/${adId}`, 
        {
        headers: {"Content-Type": "application/json",
          kuchi: `98bg54656b6f5b03xdfgxcfg55f42e78e922a345cdg5erc403dfa42f8`, // Replace with your API key
        },
      });

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
      case "shortVideo":
        return <ManageShortVideoAds adsData={filterAdsByType("Shorts Ad")} handleDelete={handleDelete} />;
      case "storyAds":
        return <ManageStoryAds adsData={filterAdsByType("Story Ad")} handleDelete={handleDelete} />;
      case "bannerAds":
        return <ManageBannerAds adsData={filterAdsByType("Banner Ad")} handleDelete={handleDelete} />;
      case "promotedAds":
        return <ManagePromotedAds adsData={filterAdsByType("Promoted Products")} handleDelete={handleDelete} />;
      default:
        return <div className="text-gray-600">Please select an ad type to manage.</div>;
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
            <option value="" disabled>
              Select Ad Type
            </option>
            <option value="bannerAds">Banner Ads</option>
            <option value="shortVideo">Short Video Ads</option>
            <option value="storyAds">Story Ads</option>
            <option value="promotedAds">Promoted Ads</option> {/* New option for Promoted Ads */}
          </select>
        </div>

        {/* Render the appropriate ad component */}
        <div>{renderAdComponent()}</div>
      </div>
    </div>
  );
};

export default SelectAdType;