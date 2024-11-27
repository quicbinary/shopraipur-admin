'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';

export default function ProductGrid() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch products and views from API
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/products', {
          headers: {
            'Content-Type': 'application/json',
            kuchi: '98bg54656b6f5b03xdfgxcfg55f42e78e922a345cdg5erc403dfa42f8',
          },
        });
        const sortedProducts = response.data.products.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setProducts(sortedProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
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
        <h1 className="text-2xl font-bold mb-6">Product View</h1>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white border border-gray-300 rounded-lg shadow p-4"
            >
              {/* Product Image */}
              <div className="relative h-40 mb-4 flex items-center justify-center">
                <Image
                  src={product?.productImages[0] || '/placeholder.png'} // Use placeholder if image is missing
                  alt={product.productName}
                  layout="fill"
                  objectFit="contain"
                  className="rounded"
                />
              </div>

              {/* View Count */}
              <div className="flex items-center justify-between mb-3">
                <span className="bg-purple-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                  View Count
                </span>
                <span className="text-purple-600 font-semibold text-lg">
                  {product.views || 0} {/* Fallback to 0 if views are missing */}
                </span>
              </div>

              {/* Product Details */}
              <h3 className="text-lg font-bold text-gray-800">{product.productName}</h3>
              <p className="text-sm text-gray-600">
                {product?.productDescription?.length > 40
                  ? `${product?.productDescription?.slice(0, 40)}...`
                  : product.productDescription}
              </p>

              {/* Pricing */}
              <div className="mt-4">
                <span className="line-through text-gray-400">
                  {product.productOriginalPrice}
                </span>
                <span className="ml-2 text-purple-600 font-bold">
                  {product.productDiscountedPrice}
                </span>
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
