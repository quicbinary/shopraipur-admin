"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";

export default function Dashboard() {
  const [selectedAdType, setSelectedAdType] = useState("");
  const [adsData, setAdsData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch data from the API
  useEffect(() => {
    const fetchAds = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:3001/api/ads", {
          headers: {
            kuchi: `98bg54656b6f5b03xdfgxcfg55f42e78e922a345cdg5erc403dfa42f8`,
          },
        });
        setAdsData(response.data); // Assuming the response data is an array
      } catch (error) {
        console.error("Error fetching ads data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAds();
  }, []);

  // Handle ad type change
  const handleAdTypeChange = (event) => {
    setSelectedAdType(event.target.value);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <header className="p-6 bg-white shadow-md flex items-center justify-between">
        <h1 className="text-2xl font-bold">Views</h1>
        <div className="flex items-center">
          <Image
            src="/assets/logo.jpg"
            alt="Profile"
            width={100}
            height={100}
            className="w-10 h-10 rounded-full"
          />
          <span className="ml-3 font-medium">Nikhil Mitra</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-6">
        {/* Select Section */}
        <div className="bg-white p-6 rounded-lg shadow mb-10">
          <label
            htmlFor="adType"
            className="block text-lg font-medium text-gray-700 mb-2"
          >
            Select Ad Type
          </label>
          <select
            id="adType"
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={selectedAdType}
            onChange={handleAdTypeChange}
          >
            <option value="">Select Ad Type</option>
            <option value="shortVideoViews">Short Video Views</option>
            <option value="promotedProducts">Promoted Products</option>
            <option value="storyViews">Story Views</option>
          </select>
        </div>

        {/* Conditional Content */}
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : (
          <>
            {selectedAdType === "shortVideoViews" && (
              <section className="mb-12">
                <h2 className="text-xl font-bold mb-6">Short Video Views</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {adsData.ads.filter((ad) => ad.type === "Video")
                    .map((video) => (
                      <div
                        key={video._id}
                        className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center justify-center"
                      >
                        <video
                          src={video.url}
                          controls
                          className="w-32 h-32 rounded-lg mb-4"
                        ></video>
                        <div className="bg-purple-500 text-white px-4 py-1 rounded-full text-sm font-medium mb-2">
                          View Count
                        </div>
                        <span className="text-xl font-bold text-purple-600">
                          {video.views.toLocaleString()}
                        </span>
                      </div>
                    ))}
                </div>
              </section>
            )}

            {selectedAdType === "promotedProducts" && (
              <section>
                <h2 className="text-xl font-bold mb-6">
                  Promoted Products Views
                </h2>
                {/* Add your logic for promoted products if required */}
              </section>
            )}

            {selectedAdType === "storyViews" && (
              <section>
                <h2 className="text-xl font-bold mb-6">Story Views</h2>
                {/* Add your logic for stories if required */}
              </section>
            )}
          </>
        )}
      </main>
      {/* Promoted Products Views Section
      {selectedAdType === 'promotedProducts' && (
          <section>
            <h2 className="text-xl font-bold mb-6">Promoted Products Views</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white shadow-md rounded-lg p-4 text-center border"
                >
                  <div className="relative w-full h-40 mb-4">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={100}
                      height={100}
                      className="object-cover w-full h-full rounded-md"
                    />
                  </div>
                  <h2 className="text-lg font-bold text-gray-800">
                    {product.name}
                  </h2>
                  <p className="text-sm text-gray-500 whitespace-pre-line mb-2">
                    {product.description}
                  </p>
                  <p className="text-lg font-bold text-gray-800 mb-4">
                    {product.price}
                  </p>
                  <button className="bg-purple-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-600">
                    View Count
                  </button>
                  <p className="mt-2 text-lg font-bold text-purple-600">
                    {product.views.toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )} */}
    </div>
  );
}
