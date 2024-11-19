"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
// Category List Component
export default function CategoryList() {
  // State to hold the categories and pagination info
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [categoriesPerPage] = useState(10); // Show 10 categories per page
  const [isLoading, setIsLoading] = useState(false); // State to track loading

  const API_KEY = "98bg54656b6f5b03xdfgxcfg55f42e78e922a345cdg5erc403dfa42f8"; // Replace with your actual API key

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("http://192.168.1.7:3001/api/categories/", {
          headers: {
            kuchi: `${API_KEY}`, // Adding the API key in the Authorization header
          },
        });
        setCategories(response.data); // Update the state with the fetched categories
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
      setIsLoading(false);
    };

    fetchCategories();
  }, []);

  const handleDelete = async (categoryId) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this category?");
    if (isConfirmed) {
      try {
        await axios.delete(`http://192.168.1.7:3001/api/categories/${categoryId}`, {
          headers: {
            kuchi: `${API_KEY}`, // Adding the API key in the Authorization header
          },
        });

        setCategories(categories.filter((category) => category._id !== categoryId));

        alert("Category deleted successfully.");
      } catch (error) {
        console.error("Error deleting category:", error);
        alert("There was an error deleting the category.");
      }
    }
  };

  const indexOfLastCategory = currentPage * categoriesPerPage;
  const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
  const currentCategories = categories.slice(indexOfFirstCategory, indexOfLastCategory);

  const totalPages = Math.ceil(categories.length / categoriesPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handlePrevNext = (type) => {
    if (type === "prev" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
    if (type === "next" && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const pageNumbers = [];
  const maxPageButtons = 3;

  if (totalPages <= 3) {
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  } else {
    pageNumbers.push(1);
    if (currentPage > 2) {
      pageNumbers.push("...");
    }
    const start = Math.max(currentPage - 1, 2);
    const end = Math.min(currentPage + 1, totalPages - 1);
    for (let i = start; i <= end; i++) {
      pageNumbers.push(i);
    }
    if (currentPage < totalPages - 1) {
      pageNumbers.push("...");
    }
    pageNumbers.push(totalPages);
  }

  return (
    <div className="bg-gray-100">
      <div className="flex">
        {/* Category List Table */}
        <div className="bg-white shadow-md rounded-lg p-10 mt-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Category List</h3>
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <table className="w-full text-left rounded-lg">
              <thead>
                <tr className="text-gray-600 border-b">
                  <th className="px-4 py-2">S. No.</th>
                  <th className="px-4 py-2">Category Image</th>
                  <th className="px-4 py-2">Category Name</th>
                  <th className="px-4 py-2">Total Products</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentCategories.map((category, index) => (
                  <tr key={category._id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">
                      <Image
                        src="/assets/logo.jpg"
                        alt="Category Image"
                        width={40}
                        height={40}
                        className="w-14 h-14"
                      />
                    </td>
                    <td className="px-4 py-2">{category.name}</td>
                    <td className="px-4 py-2">{category.totalProducts}</td>
                    <td className="px-4 py-2 flex items-center space-x-2 mt-3">
                      <button className="bg-purple-500 text-white px-4 py-1 rounded hover:bg-purple-600">
                        Edit
                      </button>
                      <button
                        className="flex items-center text-red-500 hover:text-red-700 space-x-1"
                        onClick={() => handleDelete(category._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {totalPages > 1 && (
            <div className="flex justify-center mt-4 space-x-2">
              <button
                className={`px-3 py-1 border rounded bg-gray-200 ${currentPage === 1 ? "cursor-not-allowed opacity-50" : ""}`}
                onClick={() => handlePrevNext("prev")}
                disabled={currentPage === 1}
              >
                Prev
              </button>
              {pageNumbers.map((number, index) => (
                <button
                  key={index}
                  className={`px-3 py-1 border rounded ${currentPage === number ? "bg-gray-300" : "bg-gray-200"}`}
                  onClick={() => paginate(number === "..." ? currentPage : number)}
                  disabled={number === "..."}
                >
                  {number}
                </button>
              ))}
              <button
                className={`px-3 py-1 border rounded bg-gray-200 ${currentPage === totalPages ? "cursor-not-allowed opacity-50" : ""}`}
                onClick={() => handlePrevNext("next")}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
