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
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageLimit, setPageLimit] = useState(10); // Limit the number of products per page
  const API_KEY = "98bg54656b6f5b03xdfgxcfg55f42e78e922a345cdg5erc403dfa42f8";

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [filters, currentPage, pageLimit]);

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
      let url = `http://localhost:3001/api/products?isApproved=false&page=${currentPage}&limit=5`;

      if (category) url += `&category=${category}`;
      if (subcategory) url += `&subcategory=${subcategory}`;
      if (fromDate) url += `&fromDate=${fromDate}`;
      if (toDate) url += `&toDate=${toDate}`;

      const response = await axios.get(url, {
        headers: {
          kuchi: `${API_KEY}`,
        },
      });
      setProducts(response.data.products);
      setTotalPages(Math.ceil(response?.data?.pagination?.totalPages)); // Set total pages for pagination
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

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold font-montserrat mb-4 text-purple-600">Product Approval</h2>

      {/* Filter Section */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        {/* Category Filter */}
        <div>
          <label className="block font-medium font-montserrat text-sm text-gray-700 ">
            Select Category
          </label>
          <select
            name="category"
            value={filters.category}
            onChange={handleFilterChange}
            className="block w-full text-md p-2 border border-gray-300 rounded-lg font-medium font-montserrat"
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
            <label className="block font-medium font-montserrat text-sm text-gray-700">Subcategory</label>
            <select
              name="subcategory"
              value={filters.subcategory}
              onChange={handleFilterChange}
              className="block w-full text-md p-2 border border-gray-300 rounded-lg font-medium font-montserrat"
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
          <label className="block font-medium text-sm font-montserrat text-gray-700">From Date</label>
          <input
            type="date"
            name="fromDate"
            value={filters.fromDate}
            onChange={handleFilterChange}
            className="block w-full text-sm p-2 border border-gray-300 rounded-lg font-medium font-montserrat"
          />
        </div>
        <div>
          <label className="block font-medium text-sm font-montserrat text-gray-700">To Date</label>
          <input
            type="date"
            name="toDate"
            value={filters.toDate}
            onChange={handleFilterChange}
            className="block w-full text-sm p-2 border border-gray-300 rounded-lg font-medium font-montserrat"
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
                <h3 className="text-xl font-medium font-montserrat mb-2">
                  {product.productName}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-2 mb-4 font-medium font-montserrat">
                  {product.productDescription?.length > 40
                    ? `${product.productDescription.substring(0, 40)}...`
                    : product.productDescription}
                </p>
                <div className="flex items-center mb-4">
                  <span className="text-lg font-medium font-montserrat text-purple-600">
                    ₹{product.productDiscountedPrice}
                  </span>
                  <span className="text-sm text-gray-500 ml-2 line-through font-medium font-montserrat">
                    ₹{product.productOriginalPrice}
                  </span>
                </div>

                {/* Action Buttons */}
              </div>

              <div className="flex gap-6 mt-4 items-center">
                <button
                  onClick={() => handleViewProduct(product)}
                  className="px-4 py-2 h-10 bg-purple-500 text-white rounded-lg font-medium font-montserrat"
                >
                  View
                </button>

                <button
                  onClick={() => handleApproveProduct(product._id)}
                  className="px-4 py-2 h-10 bg-purple-500 text-white rounded-lg font-medium font-montserrat"
                >
                  Approve
                </button>

                <button
                  onClick={() => handleDeleteProduct(product._id)}
                  className="px-4 py-2 h-10 bg-purple-500 text-white rounded-lg font-medium font-montserrat"
                >
                  <FaTrashAlt />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="font-medium font-montserrat text-center text-gray-700">No products available for approval.</p>
        )}
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
              .slice(
                Math.max(0, currentPage - 3),
                Math.min(totalPages, currentPage + 2)
              )
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
  );
}
