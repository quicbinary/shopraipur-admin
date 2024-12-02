"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";

export default function ProductGrid() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/categories", {
          headers: {
            "Content-Type": "application/json",
            'kuchi': "98bg54656b6f5b03xdfgxcfg55f42e78e922a345cdg5erc403dfa42f8", // Replace with your API key
          },
        });
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Fetch products from API with pagination
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/products", {
          params: {
            category: selectedCategory,
            subcategory: selectedSubcategory,
            isApproved: true,
            limit: 10,
            page: currentPage,
          },
          headers: {
            "Content-Type": "application/json",
            'kuchi': "98bg54656b6f5b03xdfgxcfg55f42e78e922a345cdg5erc403dfa42f8", // Replace with your API key
          },
        });
        setProducts(response.data.products);
        setTotalPages(Math.ceil(response?.data?.pagination?.totalPages)); // Assuming 2 products per page
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory, selectedSubcategory, currentPage]);

  if (loading) {
    return <div>Loading...</div>;
  }

  // Find the subcategories for the selected category
  const selectedCategoryObj = categories.find(
    (category) => category._id === selectedCategory
  );
  const subcategories = selectedCategoryObj ? selectedCategoryObj.subcategories : [];

  return (
    <div className="bg-white-100 p-8">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6">Filter Product</h1>
        {/* Filter Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Category
            </label>
            <select
              className="w-full border border-gray-300 rounded-lg p-2"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Subcategory
            </label>
            <select
              className="w-full border border-gray-300 rounded-lg p-2"
              value={selectedSubcategory}
              onChange={(e) => setSelectedSubcategory(e.target.value)}
            >
              <option value="">Select Subcategory</option>
              {subcategories.map((subcategory, index) => (
                <option key={index} value={subcategory}>
                  {subcategory}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
          {products.map((product) => (
            <div
              key={product._id}
              className="flex flex-col bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden"
            >
              {/* Image Section */}
              <div className="relative h-40 mb-4 flex items-center justify-center">
                <Image
                  src={product.productImages[0]}
                  alt={product.productName}
                  layout="fill"
                  objectFit="contain"
                  className="rounded pt-4"
                />
              </div>

              {/* Product Details Section */}
              <div className="flex-grow px-4">
                <h3 className="text-lg font-bold text-gray-800">
                  {product.productName}
                </h3>
                <p className="text-sm text-gray-600">
                  {product.productDescription.length > 40
                    ? `${product.productDescription.slice(0, 40)}...`
                    : product.productDescription}
                </p>
              </div>

              {/* Price Section */}
              <div className="mt-auto px-4 py-4 bg-white">
                <div className="flex justify-between items-center">
                  <span className="line-through text-gray-400">
                    ₹{product.productOriginalPrice}
                  </span>
                  <span className="text-purple-600 font-bold text-lg">
                    ₹{product.productDiscountedPrice}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center space-x-2 mt-6">
          {totalPages > 1 && (
            <>
              {/* Previous Button */}
              <button
                disabled={currentPage === 1}
                className="px-3 py-1 border border-gray-300 rounded-lg text-gray-600"
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                &lt;
              </button>

              {/* Page Numbers */}
              {Array.from({ length: totalPages }, (_, index) => index + 1)
                .slice(Math.max(0, currentPage - 3), Math.min(totalPages, currentPage + 2))
                .map((page) => (
                  <button
                    key={page}
                    className={`px-3 py-1 rounded-lg ${
                      page === currentPage
                        ? "bg-purple-500 text-white"
                        : "bg-white text-gray-600 border border-gray-300"
                    }`}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                ))}

              {/* Next Button */}
              <button
                disabled={currentPage === totalPages}
                className="px-3 py-1 border border-gray-300 rounded-lg text-gray-600"
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                &gt;
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
