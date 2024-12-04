// pages/AdsPage.js
import React from "react";
import Header from "../header";

export default function AdsPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-10">
        {/* Header */}
      <div className="felx w-full mb-6">
      <Header title={"Ads"}/>
      </div>
      <div className=" bg-white rounded-lg shadow-md p-10">
        {/* Sponsorship Ads Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Sponsorship Ads</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            {/* 2nd Banner Home */}
            <div className="space-y-4">
              <div>
                <label className="block font-medium mb-1">Banner Image</label>
                <div className="w-full h-24 border-2 border-dashed border-gray-300 flex items-center justify-center rounded text-gray-500 cursor-pointer">
                  Upload Banner Image
                  <input type="file" className="hidden" />
                </div>
              </div>
              <div>
                <label className="block font-medium mb-1">Select Date</label>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="date"
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <input
                    type="date"
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>
            </div>

            {/* Short Video Ads */}
            <div className="space-y-4">
              <div>
                <label className="block font-medium mb-1">Short Video</label>
                <div className="w-full h-24 border-2 border-dashed border-gray-300 flex items-center justify-center rounded text-gray-500 cursor-pointer">
                  Upload Short Video
                  <input type="file" className="hidden" />
                </div>
              </div>
              <div>
                <label className="block font-medium mb-1">Product URL</label>
                <input
                  type="text"
                  placeholder="Enter Product URL"
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            {/* Add Ads Button */}
            <div className="flex justify-end">
              <button className="px-6 py-3 bg-purple-600 text-white font-semibold rounded hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500">
                Add Ads
              </button>
            </div>
          </div>
        </section>

        {/* Story Ads Section */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Story Ads</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            {/* Story Image */}
            <div className="space-y-4">
              <div>
                <label className="block font-medium mb-1">Story Ads</label>
                <div className="w-full h-24 border-2 border-dashed border-gray-300 flex items-center justify-center rounded text-gray-500 cursor-pointer">
                  Upload Story
                  <input type="file" className="hidden" />
                </div>
              </div>
              <div>
                <label className="block font-medium mb-1">Product URL</label>
                <input
                  type="text"
                  placeholder="Enter Product URL"
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            {/* Select Date */}
            <div className="space-y-4">
              <div>
                <label className="block font-medium mb-1">Select Date</label>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="date"
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <input
                    type="date"
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>
            </div>

            {/* Add Ads Button */}
            <div className="flex justify-end">
              <button className="px-6 py-3 bg-purple-600 text-white font-semibold rounded hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500">
                Add Ads
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
