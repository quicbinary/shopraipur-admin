// components/ProductApproval.js
"use client";

import Image from 'next/image';
import Link from 'next/link';

export default function ProductApproval() {
  const handleApprove = () => {
    if (confirm('Are you sure you want to approve this product?')) {
      // Handle approval logic here
      console.log('Product approved');
    }
  };

  return (
    <section className="p-8 bg-gray-100 rounded-lg shadow-lg mt-8">
      {/* Product Approval Section */}
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-lg font-bold mb-4">Products Approval</h2>

        {/* Filter Section */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <div>
            <label className="block font-medium text-black">Select Category</label>
            <select className="block w-full p-2 border border-gray-300 rounded-lg">
              <option>Select Category</option>
              {/* Add more options as needed */}
            </select>
          </div>
          <div>
            <label className="block text-black font-semibold">Select</label>
            <select className="block w-full border border-gray-300 rounded-lg p-2">
              <option>Select Option</option>
              <option>1</option>
              <option>2</option>
              {/* Add more options as needed */}
            </select>
          </div>
          <div>
            <label className="block text-black font-semibold">Select Subcategories</label>
            <select className="block w-full border border-gray-300 rounded-lg p-2">
              <option>Select Subcategories</option>
              <option>1</option>
              <option>2</option>
              {/* Add more options as needed */}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block font-medium text-black">From</label>
              <input type="date" className="block w-full p-2 border border-gray-300 rounded-lg" />
            </div>
            <div>
              <label className="block font-medium text-black">To</label>
              <input type="date" className="block w-full p-2 border border-gray-300 rounded-lg" />
            </div>
          </div>
        </div>

        {/* Products List */}
        <div className="space-y-6 flex flex-col">
          {/* Single Product Card */}
          <div className="bg-white p-4 rounded-lg shadow w-72">
            <Link href="/product-detail">
              <div>
                <Image
                  src="/assets/kurta.png"
                  alt="Product Image"
                  width={256}
                  height={144}
                  className="rounded-lg mb-4 w-full h-36 object-cover"
                />
              </div>
            </Link>
            <h4 className="font-semibold text-gray-800">Half Shirt</h4>
            <p className="text-sm text-gray-600">White Horizontal Line cotton shirt</p>
            <div className="flex justify-between items-center mt-4">
              <span className="text-gray-400 line-through">₹1800</span>
              <span className="text-purple-600 font-bold">₹700</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-8 items-center justify-between">
            <Link href="/product-detail">
              <div>
                <button className="px-10 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600">
                  View
                </button>
              </div>
            </Link>
            <button
              onClick={handleApprove}
              className="px-10 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
            >
              Approve
            </button>
            <Link href="/Buttons/DeleteProduct">
              <div>
                <button className="px-10 py-3 bg-purple-500 text-white p-5 rounded-lg hover:bg-purple-600">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6 2a1 1 0 011-1h6a1 1 0 011 1v1h5a1 1 0 110 2h-1v11a2 2 0 01-2 2H4a2 2 0 01-2-2V5H1a1 1 0 110-2h5V2zm2 3a1 1 0 10-2 0v10a1 1 0 102 0V5zm6 0a1 1 0 10-2 0v10a1 1 0 102 0V5z" />
                  </svg>
                </button>
              </div>
            </Link>
          </div>
        </div>

        {/* Pagination */}
        <div className="flex justify-center space-x-2 mt-6">
          <button className="px-3 py-1 rounded bg-gray-200 text-gray-600 hover:bg-gray-300">
            &lt;
          </button>
          <button className="px-3 py-1 rounded bg-purple-500 text-white hover:bg-purple-600">1</button>
          <button className="px-3 py-1 rounded bg-gray-200 text-gray-600 hover:bg-gray-300">2</button>
          <button className="px-3 py-1 rounded bg-gray-200 text-gray-600 hover:bg-gray-300">...</button>
          <button className="px-3 py-1 rounded bg-gray-200 text-gray-600 hover:bg-gray-300">9</button>
          <button className="px-3 py-1 rounded bg-gray-200 text-gray-600 hover:bg-gray-300">10</button>
          <button className="px-3 py-1 rounded bg-gray-200 text-gray-600 hover:bg-gray-300">
            &gt;
          </button>
        </div>
      </div>
    </section>
  );
}
