"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import Header from "@/components/header";

export default function Dashboard() {
  const [selectedAdType, setSelectedAdType] = useState(""); // Default to empty
  const [adsData, setAdsData] = useState([]); // To store ad data from the API
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const [limit] = useState(10); // Number of ads per page

  // Fetch data from the API
  useEffect(() => {
    const fetchAds = async () => {
      if (!selectedAdType) {
        setAdsData([]);
        return; // Don't fetch if no adType is selected
      }
      setLoading(true);
      try {
        const adsResponse = await axios.get("http://localhost:3001/api/ads", {
          headers: {
            kuchi: "98bg54656b6f5b03xdfgxcfg55f42e78e922a345cdg5erc403dfa42f8",
          },
          params: {
            isApproved: true,
            page: currentPage,
            limit: limit,
            adType: selectedAdType, // Pass selectedAdType to the API
          },
        });

        console.log("Ads API Response:", adsResponse.data);
        setAdsData(adsResponse.data.ads || []); // Update the ads data
      } catch (error) {
        console.error("Error fetching data:", error);
        if (axios.isAxiosError(error)) {
          console.error("Response data:", error.response?.data);
          console.error("Status code:", error.response?.status);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAds();
  }, [selectedAdType, currentPage, limit]); // Include selectedAdType in dependencies

  // Handle ad type change
  const handleAdTypeChange = (event) => {
    setSelectedAdType(event.target.value);
    setCurrentPage(1); // Reset to the first page when the ad type changes
  };

  return (
    <div className="min-h-screen bg-gray-50 p-10">
      {/* Main Content */}
      <main>
        {/* Header */}
        <div className="w-full mb-6">
          <Header title={"Views"} />
        </div>
        {/* Select Section */}
        <div className="bg-white p-6 mb-8 rounded-lg shadow-md">
          <label
            htmlFor="adType"
            className="block text-xl font-medium text-purple-600 mb-2 font-montserrat"
          >
            Select Ad Type
          </label>
          <select
            id="adType"
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500 font-medium font-montserrat text-sm"
            value={selectedAdType}
            onChange={handleAdTypeChange}
          >
            <option value="">Select Ad Type</option>
            <option value="Shorts Ad">Short Video Views</option>
            <option value="Promoted Products">Promoted Products</option>
            <option value="Story Ad">Story Views</option>
            <option value="Banner Ad">Banner Ads</option>
          </select>
        </div>

        {/* Conditional Content */}
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : (
          <>
            {selectedAdType === "Shorts Ad" && (
              <AdSection
                title="Short Video Views"
                adsData={adsData}
                type="Short Video"
                isVideo={true}
              />
            )}

            {selectedAdType === "Story Ad" && (
              <AdSection
                title="Story Video Views"
                adsData={adsData}
                type="Story Video"
                isVideo={true}
              />
            )}

            {selectedAdType === "Promoted Products" && (
              <AdSection
                title="Promoted Products"
                adsData={adsData}
                type="Promoted Products"
              />
            )}

            {selectedAdType === "Banner Ad" && (
              <AdSection
                title="Banner Ads"
                adsData={adsData}
                type="Banner Ads"
              />
            )}
          </>
        )}
      </main>
    </div>
  );
}


function AdSection({ title, adsData, type, isVideo = false }) {
  return (
    <section className="mb-12">
      <h2 className="text-xl font-semibold mb-6 text-purple-600 font-montserrat">
        {title}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {adsData?.length > 0 ? (
          adsData.map((ad) => (
            <div
              key={ad._id}
              className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center justify-center"
            >
              {isVideo ? (
                <video
                  src={ad.url}
                  controls
                  className="w-32 h-32 rounded-lg mb-4"
                ></video>
              ) : (
                <Image
                  src={ad.url || ad.productId.productImages[0]}
                  alt={ad.title || "Ad"}
                  width={150}
                  height={150}
                  className={`object-fill h-36 w-full rounded-md mb-4`}
                />
              )}
              <div className="bg-purple-500 text-white px-4 py-1 rounded-full text-sm font-medium font-montserrat mb-2">
                {type === "Promoted Products" ? ad.productName : "View Count"}
              </div>
              <span className="text-md font-semibold text-purple-600 font-montserrat">
                {ad.views?.toLocaleString() || "0"} Views
              </span>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 font-medium font-montserrat text-sm">
            No {type} available
          </p>
        )}
      </div>
    </section>
  );
}
