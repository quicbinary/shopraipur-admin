"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import Image from "next/image";

export default function Page() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [categoryImage, setCategoryImage] = useState(null);

  const [isAddSubCategoryModalOpen, setIsAddSubCategoryModalOpen] =
    useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(""); // Selected category for subcategory
  const [subCategoryName, setSubCategoryName] = useState("");

  const openAddSubCategoryModal = () => {
    setIsAddSubCategoryModalOpen(true);
  };

  const closeAddSubCategoryModal = () => {
    setIsAddSubCategoryModalOpen(false);
    setSubCategoryName("");
    setSelectedCategoryId("");
  };

  const handleAddSubCategory = async (e) => {
    e.preventDefault();
  
    // Validate inputs
    if (!selectedCategoryId || !subCategoryName.trim()) {
      alert("Please select a category and enter a valid subcategory name.");
      return;
    }
  
    try {
      // Find the existing category from state to retrieve current subcategories
      const categoryToUpdate = categories.find(
        (category) => category._id === selectedCategoryId
      );
  
      if (!categoryToUpdate) {
        alert("Selected category not found.");
        return;
      }
  
      const updatedSubcategories = [
        ...categoryToUpdate.subcategories,
        subCategoryName.trim(),
      ];
  
      // Send a PUT request to update the subcategories
      const response = await axios.put(
        `http://localhost:3001/api/categories/${selectedCategoryId}`,
        { subcategories: updatedSubcategories }, // Pass the updated array
        {
          headers: {
            kuchi: `98bg54656b6f5b03xdfgxcfg55f42e78e922a345cdg5erc403dfa42f8`
          },
        }
      );
  
      console.log("API Response:", response.data); // Debugging: Check what the API returns
  
      // Update local state with the updated category data
      setCategories((prevCategories) =>
        prevCategories.map((category) =>
          category._id === selectedCategoryId
            ? { ...category, subcategories: updatedSubcategories }
            : category
        )
      );

  
      // Reset the modal and form state
      setSubCategoryName(""); // Clear subcategory name input
    } catch (error) {
      console.error("Error adding subcategory:", error);
      alert("There was an error adding the subcategory.");
    }
  };

  const handleDeleteSubCategory = async (categoryId, subCategoryName) => {
    try {
      // Find the selected category and remove the specific subcategory
      const categoryToUpdate = categories.find((cat) => cat._id === categoryId);
      const updatedSubcategories = categoryToUpdate.subcategories.filter(
        (sub) => sub !== subCategoryName
      );
  
      // Send the updated subcategories array to the server
      await axios.put(
       `http://localhost:3001/api/categories/${categoryId}`,
        { subcategories: updatedSubcategories },
        {
          headers: {
            kuchi: "98bg54656b6f5b03xdfgxcfg55f42e78e922a345cdg5erc403dfa42f8",
          },
        }
      );
  
      // Update local state
      setCategories((prevCategories) =>
        prevCategories.map((category) =>
          category._id === categoryId
            ? { ...category, subcategories: updatedSubcategories }
            : category
        )
      );
    } catch (error) {
      console.error("Error deleting subcategory:", error);
      alert("There was an error deleting the subcategory.");
    }
  };
  
  
  

  // Fetch categories data
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/categories",
          {
            headers: {
              kuchi: "98bg54656b6f5b03xdfgxcfg55f42e78e922a345cdg5erc403dfa42f8",
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
  }, [categories]);

  // Function to open the Add Modal
  const handleOpenAddModal = () => {
    setIsAddModalOpen(true);
  };

  // Function to close the Add Modal
  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
    setCategoryName("");
    setCategoryImage(null);
  };

  // Function to open the Edit Modal
  const handleOpenEditModal = (category) => {
    setEditingCategory({ ...category });
    setIsEditModalOpen(true);
  };

  // Function to close the Edit Modal
  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditingCategory(null);
  };

  // Other functions like deleteCategory, handleSaveEdit, handleAddCategory remain unchanged

  const deleteCategory = async (categoryId) => {
    try {
      await axios.delete(`http://localhost:3001/api/categories/${categoryId}`, {
        headers: {
          kuchi: "98bg54656b6f5b03xdfgxcfg55f42e78e922a345cdg5erc403dfa42f8",
        },
      });
      setCategories((prevCategories) =>
        prevCategories.filter((category) => category._id !== categoryId)
      );
    } catch (error) {
      console.error("Error deleting category:", error);
      setError("Failed to delete category.");
    }
  };

  const handleSaveEdit = async (updatedCategory) => {
    try {
      const response = await axios.put(
        `http://localhost:3001/api/categories/${updatedCategory._id}`,
        updatedCategory,
        {
          headers: {
            kuchi: "98bg54656b6f5b03xdfgxcfg55f42e78e922a345cdg5erc403dfa42f8",
          },
        }
      );
      setCategories((prevCategories) =>
        prevCategories.map((category) =>
          category._id === updatedCategory._id ? response.data : category
        )
      );
      handleCloseEditModal();
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCategoryImage(file); // Save the file for upload
      
    }
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
  
    if (!categoryName || !categoryImage) {
      alert("Please provide both category name and image.");
      return;
    }

    const newCategory = {
      name: categoryName,
      image: categoryImage,
      subcategories: [],
      totalProducts: 0,
    };

    try {
      // Step 1: Create FormData for the image upload
      const imageData = new FormData();
      imageData.append("file", categoryImage); // Assuming `categoryImage` is a File object
  
      // Step 2: Upload the image
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
      console.log("Upload response:", imageResponse.data);

      // Step 3: Check if image upload was successful and retrieve the file URL
      if (imageResponse.data.message === "File uploaded successfully") {
        const fileUrl = imageResponse.data.fileUrl; // Extract file URL from response
  
        // Step 4: Prepare the category data with the uploaded image URL
        const newCategory = {
          name: categoryName,
          image: fileUrl, // Use the uploaded image URL
          subcategories: [],
          totalProducts: 0,
        };
  
        // Step 5: Send the category data to the /api/categories endpoint
        const response = await axios.post(
          "http://localhost:3001/api/categories",
          newCategory,
          {
            headers: {
              kuchi: "98bg54656b6f5b03xdfgxcfg55f42e78e922a345cdg5erc403dfa42f8",
            },
          }
        );
  
        // Step 6: Update categories state and close the modal
        setCategories((prevCategories) => [...prevCategories, response.data]);
        handleCloseAddModal();
        alert("Category added successfully!");
      } else {
        alert("Image upload failed. Please try again.");
      }
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
      {/* Main UI */}
      <div className="flex-grow p-10 bg-gray-100 h-screen">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4 text-purple-600 font-montserrat">Category List</h3>

          <div className="flex justify-end space-x-4 mb-4">
            <button
              onClick={handleOpenAddModal}
              className="bg-purple-500 text-white px-6 py-2 rounded-md font-medium hover:bg-purple-600 transition font-montserrat"
            >
              Add Category
            </button>
            <button
                    className="bg-purple-500 text-white px-4 py-1 rounded hover:bg-purple-600 font-montserrat font-medium"
                    onClick={() => openAddSubCategoryModal()}
                  >
                    Add Subcategory
                  </button>
          </div>

          {/* Category Table */}
          <table className="w-full text-left rounded-lg font-medium font-montserrat">
            {/* Table Header */}
            <thead>
              <tr className="text-gray-600 border-b font-montserrat">
                <th className="px-4 py-2">S. No.</th>
                <th className="px-4 py-2">Category Image</th>
                <th className="px-4 py-2">Category Name</th>
                <th className="px-4 py-2">Total Products</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            {/* Table Body */}
            <tbody>
              {categories.map((category, index) => (
                <tr
                  key={category._id}
                  className="border-b hover:bg-gray-50 font-montserrat"
                >
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
                      <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500 font-montserrat">
                        No Image
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {category.name || "No Name"}
                  </td>
                  <td className="px-4 py-2">
                    {category.totalProducts || 0}
                  </td>
                  <td className="px-4 py-2 flex items-center space-x-2">
                    <button
                      className="bg-purple-500 text-white px-2 py-2 mt-3 rounded hover:bg-purple-600"
                      onClick={() => handleOpenEditModal(category)}
                    >
                      <FaRegEdit className="text-2xl"/>
                    </button>
                    <button
                      className="bg-red-500 text-white px-2 py-2 mt-3 rounded hover:bg-red-600"
                      onClick={() => deleteCategory(category._id)} 
                    >
                      <MdDelete className="text-2xl" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Modal */}
      {isAddModalOpen && (
        <AddModal
          isOpen={isAddModalOpen}
          onClose={handleCloseAddModal}
          onSubmit={handleAddCategory}
          categoryName={categoryName}
          setCategoryName={setCategoryName}
          setCategoryImage={setCategoryImage}
          handleImageChange={handleImageChange}
        />
      )}

      {/* Edit Modal */}
      {isEditModalOpen && editingCategory && (
        <EditModal
          isOpen={isEditModalOpen}
          onClose={handleCloseEditModal}
          category={editingCategory}
          setCategory={setEditingCategory}
          onSave={handleSaveEdit}
        />
      )}

{isAddSubCategoryModalOpen && (
  <AddSubCategoryModal
    isOpen={isAddSubCategoryModalOpen}
    onClose={closeAddSubCategoryModal}
    onSubmit={handleAddSubCategory}
    subCategoryName={subCategoryName} // Updated to match the prop name in the modal
    setSubCategoryName={setSubCategoryName} // Updated to match the prop name in the modal
    selectedCategoryId={selectedCategoryId} // Updated to match the prop name in the modal
    setSelectedCategoryId={setSelectedCategoryId} // Updated to match the prop name in the modal
    categories={categories} // Passing the list of categories
    handleDeleteSubCategory={handleDeleteSubCategory}
  />
)}

    </div>
  );
}


function AddModal({ isOpen, onClose, onSubmit, categoryName, setCategoryName, handleImageChange }) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40"
      onClick={onClose}
    >
      <div
        className="max-w-3xl mx-auto my-8 p-6 bg-white rounded-lg shadow-lg relative z-50"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
          onClick={onClose}
        >
          &#x2715;
        </button>
        <h2 className="text-2xl font-bold mb-6">Add Category</h2>
        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          onSubmit={onSubmit}
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

                onChange={handleImageChange}

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
  );
}


function EditModal({ isOpen, onClose, category, onSave }) {
  if (!isOpen || !category) return null;

  const [editedCategory, setEditedCategory] = useState(category);

  useEffect(() => {
    setEditedCategory(category); // Update when the category changes
  }, [category]);

  const handleSave = () => {
    onSave(editedCategory);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-purple-700 mb-4">
          Edit Category
        </h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSave();
          }}
        >
          <div>
            <label className="block text-sm font-medium mb-2">
              Category Name
            </label>
            <input
              type="text"
              value={editedCategory.name}
              onChange={(e) =>
                setEditedCategory({
                  ...editedCategory,
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
                setEditedCategory({
                  ...editedCategory,
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
              onClick={onClose}
              className="px-4 py-2 text-white bg-gray-600 rounded-md hover:bg-gray-700 focus:outline-none"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function AddSubCategoryModal({
  isOpen,
  onClose,
  onSubmit,
  subCategoryName,
  setSubCategoryName,
  selectedCategoryId,
  setSelectedCategoryId,
  categories, // List of categories
  handleDeleteSubCategory, // Function to handle subcategory deletion
}) {
  if (!isOpen) return null; // Do not render if modal is not open

  // Find the selected category to get its subcategories
  const selectedCategory = categories.find(
    (category) => category._id === selectedCategoryId
  );

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40 overflow-auto"
      onClick={onClose}
    >
      <div
        className="my-8 max-h-full w-full max-w-lg bg-white rounded-lg shadow-lg relative z-50 overflow-y-auto"
        onClick={(e) => e.stopPropagation()} // Prevent click events from propagating to the background
      >
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-purple-600 hover:text-purple-700"
          onClick={onClose}
        >
          &#x2715;
        </button>
  
        {/* Modal Title Add Subcategory */}
        <h2 className="text-2xl pt-6 text-purple-600 font-bold mb-6 text-center">
          Add Subcategory
        </h2>
  
        {/* Subcategory Form */}
        <form onSubmit={onSubmit} className="grid gap-6 px-6 py-4">
          {/* Category Selection */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Select Category
            </label>
            <select
              value={selectedCategoryId}
              onChange={(e) => setSelectedCategoryId(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
              required
            >
              <option value="">-- Select a Category --</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
  
          {/* Subcategory Name */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Subcategory Name
            </label>
            <input
              type="text"
              placeholder="Enter Subcategory Name"
              value={subCategoryName}
              onChange={(e) => setSubCategoryName(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
              required
            />
          </div>
  
          {/* Existing Subcategories */}
          {selectedCategory && selectedCategory.subcategories.length > 0 && (
            <div>
              <label className="block text-sm font-medium mb-2">
                Existing Subcategories
              </label>
              <ul className="border border-gray-300 rounded-lg p-4 max-h-40 overflow-y-auto">
                {selectedCategory.subcategories.map((subCategory, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center mb-2 last:mb-0"
                  >
                    <span>{subCategory}</span>
                    <button
                      type="button"
                      onClick={() =>
                        handleDeleteSubCategory(selectedCategoryId, subCategory)
                      }
                      className="text-red-500 hover:text-red-700"
                    >
                      <MdDelete className="text-2xl" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
  
          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-purple-500 text-white rounded-lg px-6 py-3 font-semibold hover:bg-purple-600 transition"
            >
              Add Subcategory
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}  