"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";

export default function ProductGrid() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch products from API
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/products?isApproved=true",
          {
            headers: {
              "Content-Type": "application/json",
              'kuchi':
                "98bg54656b6f5b03xdfgxcfg55f42e78e922a345cdg5erc403dfa42f8", // Replace with your API key
            },
            
          }
        );
        const sortedProducts = response.data.products.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setProducts(sortedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gray-100 p-8">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6">Filter Product</h1>
        {/* Filter Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Category
            </label>
            <select className="w-full border border-gray-300 rounded-lg p-2">
              <option value="">Select Category</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Subcategory
            </label>
            <select className="w-full border border-gray-300 rounded-lg p-2">
              <option value="">Select Subcategory</option>
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
        <div className="flex justify-center items-center space-x-2 mt-6">
          <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
            1
          </button>
          <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400">
            2
          </button>
          <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400">
            3
          </button>
          <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
