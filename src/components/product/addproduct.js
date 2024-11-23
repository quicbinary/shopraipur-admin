"use client"
import React, { useState } from "react";
import axios from "axios";

export default function AddProduct() {
  const [formData, setFormData] = useState({
    productName: "",
    productDescription: "",
    productCategory: "",
    productSubCategory: "",
    productOriginalPrice: "",
    productDiscountedPrice: "",
    fixedPrice: false,
    negotiatablePrice: false,
    tags: "",
    shopId: "",
    productImages: null,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, productImages: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      for (let key in formData) {
        if (key === "tags") {
          data.append(key, formData[key].split(",").map((tag) => tag.trim()));
        } else {
          data.append(key, formData[key]);
        }
      }

      const response = await axios.post(
        "http://localhost:3001/api/products/",
        {
          headers: {
            "Content-Type": "application/json",
            kuchi:
              "98bg54656b6f5b03xdfgxcfg55f42e78e922a345cdg5erc403dfa42f8", // Replace with your API key
          },
        },
        data
      );

      console.log("Product added successfully:", response.data);
      alert(response.data.message);
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product. Please try again.");
    }
  };

  return (
    <div className="p-8 flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full">
        <h1 className="text-2xl font-bold mb-6">Add Product</h1>
        <form onSubmit={handleSubmit}>
          {/* Grid Container */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Select Shop */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Shop
              </label>
              <select
                name="shopId"
                value={formData.shopId}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg p-2"
              >
                <option value="">Select the shop</option>
                <option value="6730c60269131e0987efb285">Shop 1</option>
              </select>
            </div>

            {/* Product Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product Name
              </label>
              <input
                type="text"
                name="productName"
                value={formData.productName}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg p-2"
                placeholder="Enter product name"
              />
            </div>

            {/* Original Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Original Price
              </label>
              <input
                type="text"
                name="productOriginalPrice"
                value={formData.productOriginalPrice}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg p-2"
                placeholder="Enter original price"
              />
            </div>

            {/* Discounted Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Discounted Price
              </label>
              <input
                type="text"
                name="productDiscountedPrice"
                value={formData.productDiscountedPrice}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg p-2"
                placeholder="Enter discounted price"
              />
            </div>

            {/* Upload Product Image */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Upload Product Image
              </label>
              <input
                type="file"
                onChange={handleFileChange}
                className="w-full border border-gray-300 rounded-lg p-2"
              />
            </div>

            {/* Add Tags */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Add Tags
              </label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg p-2"
                placeholder="Enter tags, separated by commas"
              />
            </div>

            {/* Product Description */}
            <div className="col-span-1 md:col-span-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product Description
              </label>
              <textarea
                name="productDescription"
                value={formData.productDescription}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg p-2"
                placeholder="Enter product description"
              ></textarea>
            </div>

            {/* Product Categories */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product Categories
              </label>
              <select
                name="productCategory"
                value={formData.productCategory}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg p-2"
              >
                <option value="">Select Product Categories</option>
                <option value="Electronics">Electronics</option>
              </select>
            </div>

            {/* Product Sub Categories */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product Sub Categories
              </label>
              <select
                name="productSubCategory"
                value={formData.productSubCategory}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg p-2"
              >
                <option value="">Select Product Sub Categories</option>
                <option value="Home Entertainment">Home Entertainment</option>
              </select>
            </div>

            {/* Price Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price Type
              </label>
              <div className="flex items-center gap-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="fixedPrice"
                    checked={formData.fixedPrice}
                    onChange={handleInputChange}
                    className="mr-2"
                  />{" "}
                  Fixed
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="negotiatablePrice"
                    checked={formData.negotiatablePrice}
                    onChange={handleInputChange}
                    className="mr-2"
                  />{" "}
                  Negotiable
                </label>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              className="w-44 bg-purple-600 text-white py-2 rounded-lg font-medium hover:bg-purple-700"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
