"use client";
import { useEffect, useState } from "react";
import axios from "axios"; // Importing axios
import Image from "next/image";
export default function Dashboard() {
  const [shopsCount, setShopsCount] = useState(null);
  const [productsCount, setProductsCount] = useState(null);
  const [totalProductViews, setTotalProductViews] = useState(0)
  const [error, setError] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [user, setUser] = useState(null);
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setNotFound(true); // Mark as not found if no user is stored
    }
  }, []);

  if (notFound) {
    return <p>404 - oops</p>; 
  }

  const API_KEY = '98bg54656b6f5b03xdfgxcfg55f42e78e922a345cdg5erc403dfa42f8'; 

  // Fetch the number of shops and products from respective APIs using axios
  useEffect(() => {
    // Fetch Total Shops using axios
    axios
      .get("http://localhost:3001/api/shops", {
        headers: { kuchi: `${API_KEY}` },
      }) // Replace with your actual API URL
      .then((response) => {
        setShopsCount(response.data.shops.length); // Assuming response.data contains the total count or other useful data
        console.log(response.data);
      })
      .catch((err) => {
        setError("Failed to fetch shops");
        console.error("Error fetching shops:", err);
      });

    // Fetch Total Products using axios
    axios
      .get("http://localhost:3001/api/products", {
        headers: { kuchi: `${API_KEY}` },
      }) // Replace with your actual API URL
      .then((response) => {
        // Calculate the total products based on the length of the products array
        setProductsCount(response.data.products.length);
        const totalViews = response.data.products.reduce((sum, product) => {
          return sum + (product.views || 0); // Add product.views, defaulting to 0 if undefined
        }, 0);
        setTotalProductViews(totalViews);

      })
      .catch((err) => {
        setError("Failed to fetch products");
        console.error("Error fetching products:", err);
      });
  }, []); // Empty dependency array to run once when the component mounts

  // Display loading or error messages while fetching
  if (error) {
    return <div>Error: {error}</div>;
  }

  if (shopsCount === null || productsCount === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* Main Content */}
      <div className="flex-1 p-10 flex flex-col items-center rounded-lg">
        {/* Cards Container */}
        <div className="bg-white p-10 rounded-lg shadow-lg w-full ">
          <div className="flex flex-col gap-8 items-center font-montserrat font-medium">
            <StatsCard
              title="Total Shops"
              value={`${shopsCount} ${shopsCount > 1 ? 'Shops' : 'Shop'}`}
              icon="fas fa-store"
              buttonLabel="View Shops"
            />
            <StatsCard
              title="Total Products"
              value={`${productsCount} ${productsCount > 1 ? 'Products' : 'Product'}`}
              icon="fas fa-shopping-bag"
              buttonLabel="View Products"
            />
            <StatsCard
              title="Total Product Views"
              value={`${totalProductViews} Views`}
              icon="fas fa-chart-line"
              buttonLabel="View Stats"
            />
          </div>
        </div>
      </div>
    </div>
  );
}



function StatsCard({ title, value, icon, buttonLabel }) {
  return (
    <div className="bg-gray-50 p-8 rounded-lg shadow-md flex flex-col items-center w-full sm:w-3/4 lg:w-1/2">
      <div className="flex items-center justify-between w-full">
        <div>
          <h2 className="text-lg font-semibold mb-2">{title}</h2>
          <p className="text-purple-600 font-bold">{value}</p>
        </div>
        <div className="text-purple-600 text-4xl">
          <i className={icon}></i>
        </div>
      </div>
      <button className="mt-4 bg-purple-600 text-white px-4 py-2 rounded">
        {buttonLabel}
      </button>
    </div>
  );
}
