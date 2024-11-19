// components/ShopApproval.js
import Image from 'next/image';

export default function ShopApproval() {
  return (
    <div className="p-6 w-full ">
      {/* Filter Section */}
      <div className="bg-white px-10 py-10 rounded-lg shadow-lg mb-8 w-full">
        <h2 className="text-lg font-semibold mb-4">Filter</h2>
        <div className="grid grid-cols-2 gap-10">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Select Category
            </label>
            <select className="mt-1 block w-full p-2 border border-gray-300 rounded-lg">
              <option>Select Category</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <label className="block text-sm font-medium text-gray-700">From</label>
              <input
                type="date"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">To</label>
              <input
                type="date"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
          </div>
        </div>
      

      {/* Shop Approval Section */}
      
        <h2 className="text-lg font-bold mb-4">Shop Approval</h2>
        <h2 className="font-semibold">Shop Details</h2>
        <div className="space-y-6 flex mt-8">
          <div className="bg-white p-4">
            <a href="/shopdetail">
              <Image
                src="/assets/halfShirt.png"
                alt="Shop Image"
                width={256}
                height={144}
                className="rounded-lg mb-4 w-full"
              />
            </a>
            <h3 className="text-lg font-semibold">Shiddhivinayak Garments</h3>
            <div className="text-gray-500 flex items-center mt-2">
              <i className="fas fa-map-marker-alt text-red-500 mr-2"></i>
              <span>Landmark</span>
            </div>
          </div>
          <div className="flex space-x-8 items-center justify-between ml-28">
            <button className="px-10 py-3 bg-purple-500 text-white rounded-lg">View</button>
            <a
              href="/Buttons/Approvshop"
            >
              <button className="px-10 py-3 bg-purple-500 text-white rounded-lg">Approve</button>
            </a>
            <a href="/Buttons/Deleteshop">
              <button className="px-10 py-3 bg-purple-500 text-white p-5 rounded">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6 2a1 1 0 011-1h6a1 1 0 011 1v1h5a1 1 0 110 2h-1v11a2 2 0 01-2 2H4a2 2 0 01-2-2V5H1a1 1 0 110-2h5V2zm2 3a1 1 0 10-2 0v10a1 1 0 102 0V5zm6 0a1 1 0 10-2 0v10a1 1 0 102 0V5z" />
                </svg>
              </button>
            </a>
          </div>
        </div>
        {/* Pagination */}
        <div className="flex justify-center space-x-2 mt-6">
          <button className="px-3 py-1 border border-gray-300 rounded-lg text-gray-600">
            &lt;
          </button>
          <button className="px-3 py-1 bg-purple-500 text-white rounded-lg">1</button>
          <button className="px-3 py-1 border border-gray-300 rounded-lg text-gray-600">2</button>
          <button className="px-3 py-1 border border-gray-300 rounded-lg text-gray-600">...</button>
          <button className="px-3 py-1 border border-gray-300 rounded-lg text-gray-600">10</button>
          <button className="px-3 py-1 border border-gray-300 rounded-lg text-gray-600">&gt;</button>
        </div>
      </div>
    </div>
  );
}
