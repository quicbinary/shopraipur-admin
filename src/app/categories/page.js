"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { FaTrashAlt } from "react-icons/fa"; // Importing the trash bin icon from react-icons
import axios from "axios"; // Importing axios for API requests

// Category List Component
export default function CategoryList() {
  // State to hold the categories and pagination info
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [categoriesPerPage] = useState(10); // Show 10 categories per page
  const [isLoading, setIsLoading] = useState(false); // State to track loading

  // Define your API key (this could be from an environment variable for security)
  const API_KEY = "98bg54656b6f5b03xdfgxcfg55f42e78e922a345cdg5erc403dfa42f8"; // Replace with your actual API key

  // Fetch categories from API when component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("http://localhost:3001/api/categories/", {
          headers: {
            kuchi: `${API_KEY}`, // Adding the API key in the Authorization header
          },
        });
        setCategories(response.data); // Update the state with the fetched categories
        console.log(response.data)
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
      setIsLoading(false);
    };

    fetchCategories();
  }, []); // Empty array means this runs only once when the component mounts

  // Handle delete category
  const handleDelete = async (categoryId) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this category?");
    if (isConfirmed) {
      try {
        await axios.delete(`http://192.168.1.7:3001/api/categories/${categoryId}`, {
          headers: {
            kuchi: `${API_KEY}`, // Adding the API key in the Authorization header
          },
        });

        // After successful deletion, remove the category from the state
        setCategories(categories.filter(category => category._id !== categoryId));

        alert("Category deleted successfully.");
      } catch (error) {
        console.error("Error deleting category:", error);
        alert("There was an error deleting the category.");
      }
    }
  };

  // Calculate the current page categories
  const indexOfLastCategory = currentPage * categoriesPerPage;
  const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
  const currentCategories = categories.slice(indexOfFirstCategory, indexOfLastCategory);

  // Calculate total number of pages
  const totalPages = Math.ceil(categories.length / categoriesPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle previous and next button logic
  const handlePrevNext = (type) => {
    if (type === "prev" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
    if (type === "next" && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Generate page numbers with ellipsis
  const pageNumbers = [];
  const maxPageButtons = 3; // Show 3 page buttons

  if (totalPages <= 3) {
    // If there are 3 or fewer pages, show them all
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  } else {
    // Show first page, last page, and pages around the current page
    pageNumbers.push(1);
    if (currentPage > 2) {
      pageNumbers.push("...");
    }
    const start = Math.max(currentPage - 1, 2); // Start showing page numbers from current - 1
    const end = Math.min(currentPage + 1, totalPages - 1); // End showing page numbers at current + 1
    for (let i = start; i <= end; i++) {
      pageNumbers.push(i);
    }
    if (currentPage < totalPages - 1) {
      pageNumbers.push("...");
    }
    pageNumbers.push(totalPages);
  }

  return (
    <div className="bg-gray-100 h-screen items-center">
      {/* Main Content */}
      <div className="flex-grow p-10">

        {/* Reusing Dashboard Header in Category Section */}
        <Header />

        {/* Category List Table */}
        <div className="bg-white shadow-md rounded-lg p-10 mt-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Category List</h3>
          {isLoading ? (
            <div>Loading...</div> // Show loading state
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
                {/* Dynamically render categories for the current page */}
                {currentCategories.map((category, index) => (
                  <tr key={category._id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">
                      <Image
                        src={category.image}
                        alt="Category Image"
                        width={40}
                        height={40}
                        className="w-14 h-14"
                      />
                    </td>
                    <td className="px-4 py-2">{category.name}</td>
                    <td className="px-4 py-2">{category.totalProducts}</td>
                    <td className="px-4 py-2 flex items-center space-x-2 mt-3">
                      {/* Edit Button */}
                      <button className="bg-purple-500 text-white px-4 py-1 rounded hover:bg-purple-600">
                        Edit
                      </button>
                      {/* Delete Button with React Icons Trash Bin Icon */}
                      <button
                        className="flex items-center text-red-500 hover:text-red-700 space-x-1"
                        onClick={() => handleDelete(category._id)} // Delete on click
                      >
                        <FaTrashAlt /> {/* Using React Icon for trash bin */}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* Pagination (Only show if totalPages > 1) */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-4 space-x-2">
              {/* Previous Button */}
              <button
                className={`px-3 py-1 border rounded bg-gray-200 ${currentPage === 1 ? "cursor-not-allowed opacity-50" : ""}`}
                onClick={() => handlePrevNext("prev")}
                disabled={currentPage === 1}
              >
                Prev
              </button>

              {/* Page Number Buttons */}
              {pageNumbers.map((number, index) => (
                <button
                  key={index}
                  className={`px-3 py-1 border rounded ${currentPage === number ? 'bg-gray-300' : 'bg-gray-200'}`}
                  onClick={() => paginate(number === "..." ? currentPage : number)} // Skip "..." and navigate to the current page
                  disabled={number === "..."} // Disable "..."
                >
                  {number}
                </button>
              ))}

              {/* Next Button */}
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

// Header Component (reused from Dashboard)
function Header() {
  return (
    <div className="flex justify-between items-center bg-white p-5 rounded-lg shadow-lg mb-8 w-full">
      <h1 className="text-2xl font-semibold text-gray-800">Category</h1>
      <div className="flex items-center space-x-2">
        <Image
          src="/assets/logo.jpg"
          alt="Profile"
          width={150}
          height={300}
          className="w-10 h-10 rounded-full"
        />
        <span className="font-semibold text-gray-800">Nikhil Mitra</span>
      </div>
    </div>
  );
}
