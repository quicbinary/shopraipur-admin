"use client"
import { useState } from 'react';
import Image from 'next/image';
export default function AdsApproval() {
  const [adType, setAdType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  return (
    <div className="p-6 bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8">
        <h1 className="text-2xl font-bold mb-6">Ads Approval</h1>
        {/* Ad Type and Select Date Section */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Ad Type</label>
            <select
              value={adType}
              onChange={(e) => setAdType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="">Select Ad Type</option>
              <option value="banner">Homepage Banner</option>
              <option value="sidebar">Sidebar</option>
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Select Date</label>
            <input
              type="date"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
            <input
              type="date"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>
        {/* Homepage Banner Section */}
<h2 className="text-xl font-semibold mb-4">Homepage Banner ADS</h2>
<div className="grid grid-cols-1 gap-4">
  <div className="border border-gray-300 rounded-lg p-4 bg-gray-50">
    <div className="flex justify-between items-start">
      <Image
        src="/assets/banner.png"
        alt="User"
        width={200}
        height={400}
        className="w-60 h-50 mt-10 rounded-md border"
      />
      <div className="flex-2 mt-12">
        <label className="block text-sm font-medium text-gray-700 mb-1">Select Date</label>
        <div className="flex gap-4">
          <input
            type="date"
            className="w-40 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="date"
            className="w-40 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
      </div>
    </div>
    {/* Action Buttons */}
    <div className="ml-80 gap-8 flex">
      <button className="px-4 py-2 bg-purple-500 text-white rounded-md shadow hover:bg-purple-600">
        View
      </button>
      <button className="px-4 py-2 bg-purple-500 text-white rounded-md shadow hover:bg-purple-600">
        Approve
      </button>
      <button className="px-4 py-2 bg-red-500 text-white rounded-md shadow hover:bg-red-600">
        Delete
      </button>
      <button className="px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600">
        Download
      </button>
    </div>
  </div>
</div>
</div>
        {/* Pagination */}
        <div className="flex justify-center mt-6">
          <nav className="flex gap-2">
            <button className="px-3 py-1 border rounded-md hover:bg-gray-200">&lt;</button>
            <button className="px-3 py-1 border rounded-md bg-gray-200">1</button>
            <button className="px-3 py-1 border rounded-md hover:bg-gray-200">2</button>
            <button className="px-3 py-1 border rounded-md hover:bg-gray-200">...</button>
            <button className="px-3 py-1 border rounded-md hover:bg-gray-200">10</button>
            <button className="px-3 py-1 border rounded-md hover:bg-gray-200">&gt;</button>
          </nav>
        </div>
      </div>
  );
}
