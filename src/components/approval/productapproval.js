"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import axios from "axios";
import { FaTrashAlt } from "react-icons/fa";

export default function ProductApproval() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalProduct, setModalProduct] = useState(null);

  const [filters, setFilters] = useState({
    category: "",
    subcategory: "",
    fromDate: "",
    toDate: "",
  });
  const [selectedProduct, setSelectedProduct] = useState(null);
  const API_KEY = "98bg54656b6f5b03xdfgxcfg55f42e78e922a345cdg5erc403dfa42f8";

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [filters]);

  useEffect(() => {
    const selectedCategory = categories.find(
      (category) => category.name === filters.category
    );
    if (selectedCategory && selectedCategory.subcategories) {
      setSubcategories(selectedCategory.subcategories);
    } else {
      setSubcategories([]);
    }
  }, [filters.category, categories]);

  const fetchProducts = async () => {
    try {
      const { category, subcategory, fromDate, toDate } = filters;
      let url = `http://localhost:3001/api/products?isApproved=false`;

      if (category) url += `&category=${category}`;
      if (subcategory) url += `&subcategory=${subcategory}`;
      if (fromDate) url += `&fromDate=${fromDate}`;
      if (toDate) url += `&toDate=${toDate}`;

      const response = await axios.get(url, {
        headers: {
          kuchi: `${API_KEY}`,
        },
      });
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      alert("Failed to fetch products.");
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/categories", {
        headers: { kuchi: API_KEY },
      });
      setCategories(response.data);
    } catch (err) {
      console.error("Failed to fetch categories", err);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleApproveProduct = async (productId) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to approve this product?"
    );
    if (isConfirmed) {
      try {
        // Make the PUT request to approve the product
        await axios.put(
          `http://localhost:3001/api/products/${productId}`,
          { isApproved: true },
          { headers: { kuchi: API_KEY } }
        );

        // Fetch the updated products list after approval
        fetchProducts();
      } catch (error) {
        console.error("Error approving product:", error);
      }
    }
  };

  const handleDeleteProduct = async (productId) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (isConfirmed) {
      try {
        await axios.delete(`http://localhost:3001/api/products/${productId}`, {
          headers: { kuchi: API_KEY },
        });
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product._id !== productId)
        );
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  const handleViewProduct = (product) => {
    setModalProduct(product);
    setIsModalOpen(true);
  };

  return (
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
              <option key={category._id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Subcategory Filter */}
        {filters.category && (
          <div>
            <label className="block font-medium text-black">Subcategory</label>
            <select
              name="subcategory"
              value={filters.subcategory}
              onChange={handleFilterChange}
              className="block w-full p-2 border border-gray-300 rounded-lg"
            >
              <option value="">Select Subcategory</option>
              {subcategories.map((subcategory, index) => (
                <option key={index} value={subcategory}>
                  {subcategory}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Date Range Filters */}
        <div>
          <label className="block font-medium text-black">From Date</label>
          <input
            type="date"
            name="fromDate"
            value={filters.fromDate}
            onChange={handleFilterChange}
            className="block w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div>
          <label className="block font-medium text-black">To Date</label>
          <input
            type="date"
            name="toDate"
            value={filters.toDate}
            onChange={handleFilterChange}
            className="block w-full p-2 border border-gray-300 rounded-lg"
          />
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

              <div className="flex flex-col justify-around lg:w-3/4">
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

                {/* Action Buttons */}
              </div>

              <div className="flex gap-6 mt-4 items-center">
                <button
                  onClick={() => handleViewProduct(product)}
                  className="px-4 py-2 h-10 bg-purple-500 text-white rounded-lg"
                >
                  View
                </button>

                <button
                  onClick={() => handleApproveProduct(product._id)}
                  className="px-4 py-2 h-10 bg-purple-500 text-white rounded-lg"
                >
                  Approve
                </button>

                <button
                  onClick={() => handleDeleteProduct(product._id)}
                  className="px-4 py-2 h-10 bg-purple-500 text-white rounded-lg"
                >
                  <FaTrashAlt />{" "}
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="flex justify-center items-center h-20">
            <p>No products available in the selected date range</p>
          </div>
        )}
      </div>
      {isModalOpen && (
        <ProductModal
          product={modalProduct}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
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