"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import axios from "axios";
import { MdLocationOn } from "react-icons/md";

export default function ProductApproval() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]); // For categories
  const [subcategories, setSubcategories] = useState([]); // For subcategories
  const [filters, setFilters] = useState({
    category: "",
    subcategory: "",
    fromDate: "",
    toDate: "",
  });
  const [selectedProduct, setSelectedProduct] = useState(null); // State to store selected product for modal
  const API_KEY = "98bg54656b6f5b03xdfgxcfg55f42e78e922a345cdg5erc403dfa42f8";

  useEffect(() => {
    fetchProducts();
  }, [filters]);

  // Fetch products function
  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/products?isApproved=false",
        {
          headers: {
            kuchi: `${API_KEY}`,
          },
        }
      );
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      alert("Failed to fetch products.");
    }
  };

  // Handle product approval
  const handleApprove = async (productId) => {
    const confirmApproval = confirm(
      "Are you sure you want to approve this product?"
    );
    if (!confirmApproval) return;

    try {
      await axios.put(
        `http://localhost:3001/api/products/${productId}`,
        { isApproved: true }, // Payload to update approval status
        {
          headers: {
            kuchi: `${API_KEY}`,
          },
        }
      );
      alert("Product approved successfully!");
      fetchProducts(); // Refresh product list after approval
    } catch (error) {
      console.error("Error approving product:", error);
      alert("Failed to approve the product.");
    }
  };

  const handleDelete = async (productId) => {
    const confirmDeletion = confirm(
      "Are you sure you want to delete this product? This action cannot be undone."
    );
    if (!confirmDeletion) return;
  
    try {
      await axios.delete(`http://localhost:3001/api/products/${productId}`, {
        headers: {
          kuchi: `${API_KEY}`,
        },
      });
      alert("Product deleted successfully!");
      fetchProducts(); // Refresh product list after deletion
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete the product.");
    }
  };

  // Handle filter change
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  // Handle view product modal
  const handleViewProduct = (product) => {
    setSelectedProduct(product);
  };

  // Close the product modal
  const closeModal = () => {
    setSelectedProduct(null);
  };

  return (
    <>
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-lg font-bold mb-4">Product Approval</h2>

        {/* Filter Section */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          {/* Category Filter */}
          <div>
            <label className="block font-medium text-black">
              Select Category
            </label>
            <select
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
              className="block w-full p-2 border border-gray-300 rounded-lg"
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Subcategory Filter */}
          <div>
            <label className="block text-black font-semibold">
              Select Subcategory
            </label>
            <select
              name="subcategory"
              value={filters.subcategory}
              onChange={handleFilterChange}
              className="block w-full border border-gray-300 rounded-lg p-2"
            >
              <option value="">Select Subcategory</option>
              {subcategories.map((subcategory) => (
                <option key={subcategory.id} value={subcategory.id}>
                  {subcategory.name}
                </option>
              ))}
            </select>
          </div>

          {/* Date Range Filter */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block font-medium text-black">From</label>
              <input
                type="date"
                name="fromDate"
                value={filters.fromDate}
                onChange={handleFilterChange}
                className="block w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block font-medium text-black">To</label>
              <input
                type="date"
                name="toDate"
                value={filters.toDate}
                onChange={handleFilterChange}
                className="block w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Products List */}
        <div className="space-y-6 flex flex-col">
          {products.length > 0 ? (
            products.map((product) => (
              <div
                key={product._id}
                className="flex flex-col lg:flex-row justify-between bg-white shadow-lg rounded-lg overflow-hidden border border-gray-300 mb-6 p-6"
              >
                {/* Product Image */}
                <div className="flex justify-center mb-4 lg:mb-0 lg:w-1/4">
                  <Image
                    src={
                      product.productImages && product.productImages[0]
                        ? product.productImages[0]
                        : "/assets/placeholder.png"
                    }
                    alt={product.productName}
                    width={150}
                    height={120}
                    className="rounded-lg"
                  />
                </div>

                {/* Product Details */}
                <div className="flex flex-col justify-between lg:w-3/4">
                  <h3 className="text-xl font-semibold mb-2">
                    {product.productName}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                    {product.productDescription?.length > 40
                      ? `${product.productDescription.substring(0, 40)}...`
                      : product.productDescription}
                  </p>
                  <div className="flex items-center mb-4">
                    <span className="text-lg font-bold text-purple-600">
                      ₹{product.productDiscountedPrice}
                    </span>
                    <span className="text-sm text-gray-500 ml-2 line-through">
                      ₹{product.productOriginalPrice}
                    </span>
                  </div>
                  <div className="flex space-x-4">
                    <button
                      className="px-6 py-2 bg-purple-500 text-white rounded-lg"
                      onClick={() => handleApprove(product._id)}
                    >
                      Approve
                    </button>
                    <button
                      className="px-6 py-2 bg-purple-500 text-white rounded-lg"
                      onClick={() => handleViewProduct(product)}
                    >
                      View
                    </button>
                    <button className="px-6 py-2 bg-purple-500 text-white rounded-lg" onClick={() => handleDelete(product._id)}>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No products found.</p>
          )}
        </div>
      </div>

      {selectedProduct && (
        <ProductModal product={selectedProduct} closeModal={closeModal} />
      )}
      </>
  );
}

const ProductModal = ({ product, closeModal }) => {
  const [selectedImage, setSelectedImage] = useState(
    product.productImages && product.productImages[0]
      ? product.productImages[0]
      : "/assets/placeholder.png"
  );

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white w-[80%] max-w-4xl rounded-lg overflow-hidden shadow-lg">
        {/* Close Button */}
        <div className="flex justify-end p-4">
          <button
            className="text-gray-400 hover:text-gray-800 text-2xl"
            onClick={closeModal}
          >
            &times;
          </button>
        </div>

        {/* Modal Content */}
        <div className="pb-6 flex flex-col md:flex-row">
          {/* Left Section: Main Image */}
          <div className="w-full md:w-1/2 flex flex-col items-center">
            <Image
              src={selectedImage}
              alt={product.productName}
              width={400}
              height={400}
              className="rounded-lg"
            />
            {/* Thumbnail Images */}
            <div className="flex mt-4 space-x-2">
              {product.productImages &&
                product.productImages.map((image, index) => (
                  <Image
                    key={index}
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    width={80}
                    height={80}
                    className="rounded-lg border cursor-pointer hover:scale-105"
                    onClick={() => handleImageClick(image)} // Handle thumbnail click
                  />
                ))}
            </div>
          </div>

          {/* Right Section: Product Details */}
          <div className="w-full md:w-1/2 md:pl-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              {product.productName}
            </h1>
            <div className="flex items-center space-x-4 mb-4">
              <span className="text-xl font-bold text-purple-600">
                ₹{product.productDiscountedPrice}
              </span>
              <span className="text-lg line-through text-gray-400">
                ₹{product.productOriginalPrice}
              </span>
              {product.isNegotiable && (
                <span className="text-sm text-green-600 bg-green-100 px-2 py-1 rounded">
                  Price Negotiable
                </span>
              )}
            </div>
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              Description
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {product.productDescription}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
