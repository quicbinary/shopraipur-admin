import React, { useState } from "react";
import axios from "axios";
import Header from "../header";

export default function AdsPage() {
  const [formData, setFormData] = useState({
    adType: "",
    url: "",
    startDate: "",
    endDate: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, url: e.target.files[0] });
  };

  const handleSubmit = async () => {
    try {
      const file = formData.url;
      if (!file) {
        alert("Please upload a video.");
        return;
      }

      const mediaData = new FormData();
      mediaData.append("file", file);

      console.log("Uploading file...");

      const uploadResponse = await axios.post(
        "http://localhost:3001/api/upload",
        mediaData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            kuchi: "98bg54656b6f5b03xdfgxcfg55f42e78e922a345cdg5erc403dfa42f8",
          },
        }
      );

      console.log("Upload response:", uploadResponse.data);

      if (uploadResponse.data.message !== "File uploaded successfully") {
        alert("Video upload failed. Please try again.");
        return;
      }

      const mediaUrl = uploadResponse.data.fileUrl;
      if (!mediaUrl) {
        alert("File URL not returned from server.");
        return;
      }

      const adData = {
        type: "Image",
        url: mediaUrl,
        adType: formData.adType,
        startDate: formData.startDate,
        endDate: formData.endDate,
        isApproved: false,
        shopId: "escrwc3rvwecf",
      };

      const response = await axios.post(
        "http://localhost:3001/api/ads/",
        adData,
        {
          headers: {
            "Content-Type": "application/json",
            kuchi: "98bg54656b6f5b03xdfgxcfg55f42e78e922a345cdg5erc403dfa42f8",
          },
        }
      );

      alert("Ad submitted successfully!");
      console.log("Ad submission response:", response.data);
    } catch (error) {
      console.error(
        "Error during ad submission:",
        error.response || error.message
      );
      alert("Failed to submit ad. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10 font-medium font-montserrat">
      <div className="w-full mb-6">
        <Header title={"Ads"} />
      </div>
      <div className="bg-white rounded-lg shadow-md p-10">
        <h2 className="text-2xl font-bold mb-6 text-purple-600">Post New Ad</h2>
        <div className="space-y-4">
          <div>
            <label className="block mb-1">Ad Type</label>
            <select
              name="adType"
              value={formData.adType}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="">Select Ad Type</option>
              <option value="Banner Ad">Banner Ad</option>
              <option value="Short Ad">Short Ad</option>
              <option value="Story Ad">Story Ad</option>
            </select>
          </div>
          <div>
            <label className="block mb-1">Banner/Story File</label>
            <div className="w-full h-24 border-2 border-dashed border-gray-300 flex items-center justify-center rounded text-gray-500 cursor-pointer">
              Upload File
              <input type="file" name="url" onChange={handleFileChange} />
            </div>
          </div>
          <div>
            <label className="block mb-1">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block mb-1">End Date</label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div className="flex justify-end">
            <button
              onClick={handleSubmit}
              className="px-6 py-3 bg-purple-600 text-white font-semibold rounded hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              Submit Ad
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
