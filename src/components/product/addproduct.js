"use client";
import React, { useState, useEffect } from "react";
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

  const [shops, setShops] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  // Fetch data for shops and categories on component mount
  useEffect(() => {
    const fetchShops = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/shops", {
          headers: {
            kuchi: "98bg54656b6f5b03xdfgxcfg55f42e78e922a345cdg5erc403dfa42f8",
          },
        });
        setShops(response.data.shops);
      } catch (error) {
        console.error("Error fetching shops:", error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/categories",
          {
            headers: {
              kuchi:
                "98bg54656b6f5b03xdfgxcfg55f42e78e922a345cdg5erc403dfa42f8",
            },
          }
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchShops();
    fetchCategories();
  }, []);

  // Update subcategories based on selected category
  useEffect(() => {
    if (formData.productCategory) {
      const selectedCategory = categories.find(
        (category) => category.name === formData.productCategory
      );
      setSubCategories(selectedCategory ? selectedCategory.subcategories : []);
    }
  }, [formData.productCategory, categories]);

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
      // Step 1: Get the image file from formData
      const imageFile = formData.productImages; // Assuming the file is stored in formData.productImages
      if (!imageFile) {
        alert("Please upload an image.");
        return;
      }

      // Step 2: Create FormData for the image upload
      const imageData = new FormData();
      imageData.append("file", imageFile);
      // Step 3: Upload the image
      const imageResponse = await axios.post(
        "http://localhost:3001/api/upload",
        imageData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Set Content-Type for file upload
            kuchi: "98bg54656b6f5b03xdfgxcfg55f42e78e922a345cdg5erc403dfa42f8", // Optional header
          },
        }
      );

      // Step 4: Check if image upload was successful and retrieve the file URL
      if (imageResponse.data.message === "File uploaded successfully") {
        const fileUrl = imageResponse.data.fileUrl; // Extract file URL from response

        // Step 5: Prepare the product data to be sent as JSON
        const productData = {
          productName: formData.productName,
          productDescription: formData.productDescription,
          productCategory: formData.productCategory,
          productSubCategory: formData.productSubCategory,
          productOriginalPrice: formData.productOriginalPrice,
          productDiscountedPrice: formData.productDiscountedPrice,
          fixedPrice: formData.fixedPrice,
          negotiatablePrice: formData.negotiatablePrice,
          tags: formData.tags.split(",").map((tag) => tag.trim()), // Split tags by comma and trim spaces
          productImages: [fileUrl], // Include the uploaded image URL in the productImages array
          shopId: formData.shopId, // If applicable
        };

        console.log(productData.shopId);

        // Step 6: Send the product data as a JSON object to the /api/products/ endpoint
        const response = await axios.post(
          "http://localhost:3001/api/products/",
          productData, // Send the product data as JSON
          {
            headers: {
              "Content-Type": "application/json", // Set Content-Type to application/json
              kuchi:
                "98bg54656b6f5b03xdfgxcfg55f42e78e922a345cdg5erc403dfa42f8", // Optional header
            },
          }
        );

        // Step 7: Handle successful product creation
        console.log("Product added successfully:", response.data);
        alert(response.data.message);
      } else {
        alert("Image upload failed. Please try again.");
      }
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product. Please try again.");
    }
  };

  return (
    <div className="p-8 flex items-center justify-center bg-white-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full">
        <h1 className="text-2xl font-bold mb-6">Add Product</h1>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                {shops.map((shop) => (
                  <option key={shop._id} value={shop._id}>
                    {shop.shopName}
                  </option>
                ))}
              </select>
            </div>

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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Original Price
              </label>
              <input
                type="number"
                name="productOriginalPrice"
                value={formData.productOriginalPrice}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg p-2"
                placeholder="Enter original price"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Discounted Price
              </label>
              <input
                type="number"
                name="productDiscountedPrice"
                value={formData.productDiscountedPrice}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg p-2"
                placeholder="Enter discounted price"
              />
            </div>

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
                {categories.map((category) => (
                  <option key={category._id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product Sub Categories
              </label>
              <select
                name="productSubCategory"
                value={formData.productSubCategory}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg p-2"
                disabled={!formData.productCategory}
              >
                <option value="">Select Product Sub Categories</option>
                {subCategories.map((subCategory, index) => (
                  <option key={index} value={subCategory}>
                    {subCategory}
                  </option>
                ))}
              </select>
            </div>

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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Upload Product Image
              </label>
              <input
                type="file"
                name="productImages"
                onChange={handleFileChange}
                className="w-full border border-gray-300 rounded-lg p-2"
              />
            </div>

            <div>
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
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        fixedPrice: e.target.checked,
                        negotiatablePrice: !e.target.checked, // Uncheck the other
                      })
                    }
                    className="mr-2"
                  />
                  Fixed
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="negotiatablePrice"
                    checked={formData.negotiatablePrice}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        negotiatablePrice: e.target.checked,
                        fixedPrice: !e.target.checked, // Uncheck the other
                      })
                    }
                    className="mr-2"
                  />
                  Negotiable
                </label>
              </div>
            </div>
          </div>

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
