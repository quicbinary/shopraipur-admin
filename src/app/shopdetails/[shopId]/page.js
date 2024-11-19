"use client";  // This ensures this component is client-side

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";  // Correct hook to get dynamic params
import Head from "next/head";
import Image from "next/image";

export default function ShopDetails() {
  const [shop, setShop] = useState(null);
  const [products, setProducts] = useState([]);  // State for products
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { shopId } = useParams();  // Accessing dynamic shopId from the URL

  const API_KEY = "98bg54656b6f5b03xdfgxcfg55f42e78e922a345cdg5erc403dfa42f8";  // Use your actual API key

  // Fetch shop details when shopId is available
  useEffect(() => {
    if (!shopId) {
      return;  // Don't fetch if shopId is missing or undefined
    }

    const fetchShopData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/shops/${shopId}`, {
          headers: {
            kuchi: API_KEY,
          },
        });
        setShop(response.data);  // Update the state with the shop data
      } catch (err) {
        setError("Failed to fetch shop data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchShopData();  // Fetch shop data
  }, [shopId]);  // Only re-run the effect if shopId changes

  // Fetch products when shopId is available
  useEffect(() => {
    if (!shopId) {
      return;  // Don't fetch if shopId is missing or undefined
    }

    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/products?shopId=${shopId}`, {
          headers: {
            kuchi: API_KEY,
          },
        });
        setProducts(response.data);  // Update the state with the products data
      } catch (err) {
        setError("Failed to fetch products");
        console.error(err);
      }
    };

    fetchProducts();  // Fetch products data
  }, [shopId]);  // Only re-run the effect if shopId changes

  // Delete product function
  const deleteProduct = async (productId) => {
    // Ask for confirmation before deleting the product
    const isConfirmed = window.confirm("Are you sure you want to delete this product?");
    if (isConfirmed) {
      try {
        // Make API call to delete the product
        await axios.delete(`http://localhost:3001/api/products/${productId}`, {
          headers: {
            kuchi: API_KEY,
          },
        });
        
        // If the product is deleted, remove it from the state to update UI
        setProducts(products.filter((product) => product._id !== productId));
        alert("Product deleted successfully");
      } catch (error) {
        console.error("Error deleting product:", error);
        alert("Failed to delete the product");
      }
    }
  };

  if (loading) return <div>Loading...</div>;  // Show loading text while data is being fetched
  if (error) return <div>{error}</div>;  // Show error message if fetching fails
  if (!shop) return <div>No shop data available</div>;  // Show if no shop data is returned

  return (
    <>
      <Head>
        <title>{shop.shopName} - Shop Details</title>
        <link
          href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css"
        />
      </Head>
      <div className="bg-gray-100 flex min-h-screen">
        <div className="flex-1 p-8">
          {/* Header */}
         <Header/>
          {/* Shop Details */}
          <div className="bg-white shadow-lg mt-7 rounded-lg p-6 mb-10">
            <div className="flex items-center space-x-4">
              <Image
                src={shop.shopLogo}
                alt="Logo"
                width={40}
                height={40}
                className="w-20 h-20 rounded"
              />
              <div>
                <h2 className="shop-name text-2xl font-semibold">{shop.shopName}</h2>
                <p className="owner-name text-gray-500">{shop.ownerName}</p>
              </div>
            </div>
          </div>

          {/* Information Section */}
          <div className="bg-white shadow-lg mb-10 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-6">Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-gray-700">
              <div>
                <h4 className="font-semibold">Shop Name</h4>
                <p className="shop-name text-gray-500">{shop.shopName}</p>
              </div>
              <div>
                <h4 className="font-semibold">Owner Name</h4>
                <p className="owner-name text-gray-500">{shop.ownerName}</p>
              </div>
              <div>
                <h4 className="font-semibold">GST Number</h4>
                <p id="gst" className="text-gray-500">{shop.gst}</p>
              </div>
              <div>
                <h4 className="font-semibold">Phone Number</h4>
                <p id="phone" className="text-gray-500">{shop.phoneNumber}</p>
              </div>
              <div className="col-span-2">
                <h4 className="font-semibold">Area</h4>
                <p id="area" className="text-gray-500">{shop.area}</p>
              </div>
            </div>
          </div>

          {/* Product Section */}
          <div className="bg-white shadow-lg rounded-lg p-6 mt-10">
            <h3 className="text-xl font-semibold mb-6">Products</h3>

            {/* Product Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left table-auto">
                <thead>
                  <tr className="border-b">
                    <th className="p-4 text-gray-600 font-medium">Product Image</th>
                    <th className="p-4 text-gray-600 font-medium">Product Name</th>
                    <th className="p-4 text-gray-600 font-medium">Product Category</th>
                    <th className="p-4 text-gray-600 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {products && products.map((product) => (
                    <tr className="border-b" key={product._id}>
                      <td className="p-4">
                        <Image
                          src={product.productImage}  // Assuming the image is under the field 'productImage'
                          alt="Product Image"
                          width={80}
                          height={80}
                          className="w-28 h-20 object-cover rounded-md"
                        />
                      </td>
                      <td className="p-4 text-gray-700">{product.productName}</td>
                      <td className="p-4 text-gray-700">{product.productCategory}</td>
                      <td className="p-4">
                        <button 
                          className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600"
                          onClick={() => deleteProduct(product._id)}
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
    </>
  );
}

// Header component
function Header() {
  return (
    <div className="flex justify-between items-center bg-white p-5 rounded-lg shadow-lg mb-8 w-full">
      <h1 className="text-2xl font-semibold text-gray-800">Shop</h1>
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
