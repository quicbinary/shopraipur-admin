"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";

export default function Page() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Modal visibility state
  const [editingCategory, setEditingCategory] = useState(null); // Category being edited
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); // Add modal visibility state
  const [categoryName, setCategoryName] = useState(""); // Add category name
  const [categoryImage, setCategoryImage] = useState(null); // Add category image
  
  // Open the Sub-Category Modal
  const openSubCategoryModal = () => {
    closeSubCategoryModal(true);
  };

  // Close the Sub-Category Modal
  const closeSubCategoryModal = () => {
    closeSubCategoryModal(false);
    deleteCategory(""); // Reset selected category
    setCategoryName(""); // Reset sub-category name
  };

  // Fetch categories data
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/categories",
          {
            headers: {
              kuchi: `98bg54656b6f5b03xdfgxcfg55f42e78e922a345cdg5erc403dfa42f8`,
            },
          }
        );
        const data = Array.isArray(response.data)
          ? response.data
          : [response.data];
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setError("Failed to fetch categories.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const deleteCategory = async (categoryId) => {
    try {
      // Make an API call to delete the category
      await axios.delete(`http://localhost:3001/api/categories/${categoryId}`, {
        headers: {
          kuchi: `98bg54656b6f5b03xdfgxcfg55f42e78e922a345cdg5erc403dfa42f8`,
        },
      });
      
      // Remove the category from the state after successful deletion
      setCategories((prevCategories) =>
        prevCategories.filter((category) => category._id !== categoryId)
      );
    } catch (error) {
      console.error("Error deleting category:", error);
      setError("Failed to delete category.");
    }
  };
  

  // Open the edit modal with the selected category
  const openEditModal = (category) => {
    setEditingCategory({ ...category }); // Clone the category for editing
    setIsEditModalOpen(true);
  };

  // Close the edit modal
  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditingCategory(null);
  };

  // Handle saving the edited category
  const handleSaveEdit = async (updatedCategory) => {
    try {
      const response = await axios.put(
        `http://localhost:3001/api/categories/${updatedCategory._id}`,
        updatedCategory,
        {
          headers: {
            kuchi: `98bg54656b6f5b03xdfgxcfg55f42e78e922a345cdg5erc403dfa42f8`,
          },
        }
      );
      // Update the categories list with the edited category
      setCategories((prevCategories) =>
        prevCategories.map((category) =>
          category._id === updatedCategory._id ? response.data : category
        )
      );
      closeEditModal(); // Close the modal after saving
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  // Open the Add Category modal
  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  // Close the Add Category modal
  const closeAddModal = () => {
    setIsAddModalOpen(false);
    setCategoryName(""); // Reset category name
    setCategoryImage(null); // Reset category image
  };

  // Handle form submission for adding a new category
  const handleAddCategory = async (e) => {
    e.preventDefault();

    if (!categoryName || !categoryImage) {
      // Simple validation to ensure both name and image are provided
      alert("Please provide both category name and image.");
      return;
    }

    const newCategory = {
      name: categoryName,
      image: categoryImage,
      subcategories: [], // You can add subcategories if needed
      totalProducts: 0, // Set an initial product count
    };

    try {
      const response = await axios.post(
        "http://localhost:3001/api/categories",
        newCategory,
        {
          headers: {
            kuchi: `98bg54656b6f5b03xdfgxcfg55f42e78e922a345cdg5erc403dfa42f8`,
          },
        }
      );

      // Add the new category to the categories state
      setCategories((prevCategories) => [...prevCategories, response.data]);
      closeAddModal(); // Close the modal after adding the category
    } catch (error) {
      console.error("Error adding category:", error);
      setError("Failed to add category.");
    }
  };

  if (loading) {
    return <div className="text-center mt-10">Loading categories...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }

  return (
    <div>
      <div className="bg-gray-100">
        <div className="flex">
          {/* Main Content */}
          <div className="flex-grow p-8">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-semibold">Category</h2>

              <div className="flex items-center space-x-2">
                <Image
                  src="/assets/logo.jpg"
                  alt="User Avatar"
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full"
                />
                <span className="font-semibold">Nikhil Mitra</span>
              </div>
            </div>

            {/* Category List Table */}
            <div className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Category List</h3>

              <div className="flex justify-end space-x-4 mb-4">
                <button
                  onClick={openAddModal} // Attach the openAddModal function
                  className="bg-purple-500 text-white px-6 py-2 rounded-md font-semibold hover:bg-purple-600 transition"
                >
                  Add Category
                </button>
                <button className="bg-purple-500 text-white px-6 py-2 rounded-md font-semibold hover:bg-purple-600 transition">
                  Add Sub-Category
                </button>
              </div>

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
  {categories.map((category, index) => (
    <tr key={category._id} className="border-b hover:bg-gray-50">
      <td className="px-4 py-2">{index + 1}</td>
      <td className="px-4 py-2">
        {category.image ? (
          <Image
            src={category.image}
            alt={category.name || "Category Image"}
            width={64}
            height={64}
            className="w-16 h-16 rounded-lg"
          />
        ) : (
          <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
            No Image
          </div>
        )}
      </td>
      <td className="px-4 py-2">{category.name || "No Name"}</td>
      <td className="px-4 py-2">{category.totalProducts || 0}</td>
      <td className="px-4 py-2 flex items-center space-x-2">
        <button
          className="bg-purple-500 text-white px-4 py-1 rounded hover:bg-purple-600"
          onClick={() => openEditModal(category)}
        >
          Edit
        </button>
        <button
          className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
          onClick={() => deleteCategory(category._id)}
        >
          Delete
        </button>
      </td>
    </tr>
  ))}
</tbody>

              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Add Category Modal */}
      {isAddModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40"
          onClick={closeAddModal}
        >
          <div
            className="max-w-3xl mx-auto my-8 p-6 bg-white rounded-lg shadow-lg relative z-50"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
              onClick={closeAddModal}
            >
              &#x2715;
            </button>
            <h2 className="text-2xl font-bold mb-6">Add Category</h2>
            <form
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              onSubmit={handleAddCategory}
            >
              <div>
                <label className="block text-sm font-medium mb-2">
                  Category Name
                </label>
                <input
                  type="text"
                  placeholder="Enter Category Name"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Upload Image
                </label>
                <div className="w-full h-32 border-dashed border-2 border-gray-300 flex items-center justify-center rounded-lg">
                  <input
                    type="file"
                    onChange={(e) =>
                      setCategoryImage(URL.createObjectURL(e.target.files[0]))
                    }
                    className="flex items-center w-full text-sm p-2"
                  />
                </div>
              </div>
              <div className="col-span-full">
                <button
                  type="submit"
                  className="w-full bg-purple-500 text-white rounded-lg px-6 py-3 font-semibold hover:bg-purple-600 transition"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Edit Modal */}
      {isEditModalOpen && editingCategory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-center text-purple-700 mb-4">
              Edit Category
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSaveEdit(editingCategory);
              }}
            >
              <div>
                <label className="block text-sm font-medium mb-2">
                  Category Name
                </label>
                <input
                  type="text"
                  value={editingCategory.name}
                  onChange={(e) =>
                    setEditingCategory({
                      ...editingCategory,
                      name: e.target.value,
                    })
                  }
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                />
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium mb-2">
                  Upload Image
                </label>
                <input
                  type="file"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  onChange={(e) =>
                    setEditingCategory({
                      ...editingCategory,
                      image: URL.createObjectURL(e.target.files[0]),
                    })
                  }
                />
              </div>
              <div className="flex justify-between mt-6">
                <button
                  type="submit"
                  className="px-4 py-2 text-white bg-purple-600 rounded-md hover:bg-purple-700 focus:outline-none"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={closeEditModal}
                  className="px-4 py-2 text-white bg-gray-600 rounded-md hover:bg-gray-700 focus:outline-none"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
