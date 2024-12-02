import React from "react";
import Image from "next/image";
// ManageBannerAds Component
export const ManageBannerAds = ({ adsData, handleDelete }) => {
  return (
    <div className="p-8">
      <div className="p-8 bg-white rounded-lg shadow-lg">
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-4 text-left text-sm font-medium border-b">Banner Image</th>
                <th className="p-4 text-left text-sm font-medium border-b">Banner ID</th>
                <th className="p-4 text-center text-sm font-medium border-b">Delete</th>
                <th className="p-4 text-left text-sm font-medium border-b">Select Date</th>
              </tr>
            </thead>
            <tbody>
              {adsData.map((ad, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="p-4 border-b">
                    <Image
                      src={ad.url}
                      alt={`Banner ${index + 1}`}
                      width={100}
                      height={100}
                      className="h-74 w-40 rounded-lg object-cover"
                    />
                  </td>
                  <td className="p-4 border-b">{ad._id}</td>
                  <td className="p-4 border-b text-center">
                    <button
                      onClick={() => handleDelete(ad._id)}
                      className="bg-red-500 hover:bg-red-600 text-white rounded-lg p-2"
                    >
                      Delete
                    </button>
                  </td>
                  <td className="p-4 border-b">
                    <div className="flex space-x-2">
                      <input
                        type="date"
                        value={ad.startDate ? ad.startDate.slice(0, 10) : ""}
                        className="w-full text-sm border border-gray-300 rounded-lg p-2"
                        readOnly
                      />
                      <input
                        type="date"
                        value={ad.endDate ? ad.endDate.slice(0, 10) : ""}
                        className="w-full text-sm border border-gray-300 rounded-lg p-2"
                        readOnly
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// ManageShortVideoAds Component
export const ManageShortVideoAds = ({ adsData, handleDelete }) => {
  return (
    <div className="p-8">
      <div className="p-8 bg-white rounded-lg shadow-lg">
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-4 text-left text-sm font-medium border-b">Short Video</th>
                <th className="p-4 text-left text-sm font-medium border-b">Video ID</th>
                <th className="p-4 text-center text-sm font-medium border-b">Delete</th>
                <th className="p-4 text-left text-sm font-medium border-b">Select Date</th>
              </tr>
            </thead>
            <tbody>
              {adsData.map((ad, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="p-4 border-b">
                    <video
                      src={ad.url}
                      controls
                      className="h-74 w-40 rounded-lg object-cover"
                    />
                  </td>
                  <td className="p-4 border-b">{ad._id}</td>
                  <td className="p-4 border-b text-center">
                    <button
                      onClick={() => handleDelete(ad._id)}
                      className="bg-red-500 hover:bg-red-600 text-white rounded-lg p-2"
                    >
                      Delete
                    </button>
                  </td>
                  <td className="p-4 border-b">
                    <div className="flex space-x-2">
                      <input
                        type="date"
                        value={ad.startDate ? ad.startDate.slice(0, 10) : ""}
                        className="w-full text-sm border border-gray-300 rounded-lg p-2"
                        readOnly
                      />
                      <input
                        type="date"
                        value={ad.endDate ? ad.endDate.slice(0, 10) : ""}
                        className="w-full text-sm border border-gray-300 rounded-lg p-2"
                        readOnly
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// ManageStoryAds Component
export const ManageStoryAds = ({ adsData, handleDelete }) => {
  return (
    <div className="p-8">
      <div className="p-8 bg-white rounded-lg shadow-lg">
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-4 text-left text-sm font-medium border-b">Story Video</th>
                <th className="p-4 text-left text-sm font-medium border-b">Video ID</th>
                <th className="p-4 text-center text-sm font-medium border-b">Delete</th>
                <th className="p-4 text-left text-sm font-medium border-b">Select Date</th>
              </tr>
            </thead>
            <tbody>
              {adsData.map((ad, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="p-4 border-b">
                    <video
                      src={ad.url}
                      controls
                      className="h-74 w-40 rounded-lg object-cover"
                    />
                  </td>
                  <td className="p-4 border-b">{ad._id}</td>
                  <td className="p-4 border-b text-center">
                    <button
                      onClick={() => handleDelete(ad._id)}
                      className="bg-red-500 hover:bg-red-600 text-white rounded-lg p-2"
                    >
                      Delete
                    </button>
                  </td>
                  <td className="p-4 border-b">
                    <div className="flex space-x-2">
                      <input
                        type="date"
                        value={ad.startDate ? ad.startDate.slice(0, 10) : ""}
                        className="w-full text-sm border border-gray-300 rounded-lg p-2"
                        readOnly
                      />
                      <input
                        type="date"
                        value={ad.endDate ? ad.endDate.slice(0, 10) : ""}
                        className="w-full text-sm border border-gray-300 rounded-lg p-2"
                        readOnly
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// ManagePromotedAds Component
export const ManagePromotedAds = ({ adsData, handleDelete }) => {


  return (
    <div className="p-8">
      <div className="p-8 bg-white rounded-lg shadow-lg">
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-4 text-left text-sm font-medium border-b">Promoted Product Image</th>
                <th className="p-4 text-left text-sm font-medium border-b">Ad ID</th>
                <th className="p-4 text-center text-sm font-medium border-b">Delete</th>
                <th className="p-4 text-left text-sm font-medium border-b">Select Date</th>
              </tr>
            </thead>
            <tbody>
              {adsData.map((ad, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="p-4 border-b">
                    <Image
                      src={ad?.productId?.productImages[0]}
                      alt={`Promoted ${index + 1}`}
                      width={100}
                      height={100}
                      className="h-74 w-40 rounded-lg object-cover"
                    />
                  </td>
                  <td className="p-4 border-b">{ad._id}</td>
                  <td className="p-4 border-b text-center">
                    <button
                      onClick={() => handleDelete(ad._id)}
                      className="bg-red-500 hover:bg-red-600 text-white rounded-lg p-2"
                    >
                      Delete
                    </button>
                  </td>
                  <td className="p-4 border-b">
                    <div className="flex space-x-2">
                      <input
                        type="date"
                        value={ad.startDate ? ad.startDate.slice(0, 10) : ""}
                        className="w-full text-sm border border-gray-300 rounded-lg p-2"
                        readOnly
                      />
                      <input
                        type="date"
                        value={ad.endDate ? ad.endDate.slice(0, 10) : ""}
                        className="w-full text-sm border border-gray-300 rounded-lg p-2"
                        readOnly
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};