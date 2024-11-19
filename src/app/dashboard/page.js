"use client";
import Image from "next/image";

export default function Dashboard() {

  return (
    <div className="flex bg-gray-100 min-h-screen">

      {/* Main Content */}
      <div className="flex-1 p-10 flex flex-col items-center rounded-lg">
        {/* Header */}
        <Header />

        {/* Cards Container */}
        <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-7xl">
          <div className="flex flex-col gap-8 items-center">
            <StatsCard
              title="Total Users (LOGIN)"
              value="150 USERS"
              icon="fas fa-user"
              buttonLabel="View Users"
            />
            <StatsCard
              title="Total Shops"
              value="120 SHOPS"
              icon="fas fa-store"
              buttonLabel="View Shops"
            />
            <StatsCard
              title="Total Products"
              value="130 PRODUCTS"
              icon="fas fa-shopping-bag"
              buttonLabel="View Products"
            />
            <StatsCard
              title="Total Product Views"
              value="1200000 VIEWS"
              icon="fas fa-chart-line"
              buttonLabel="View Stats"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="flex justify-between items-center bg-white py-6 px-10 rounded-lg shadow-lg mb-8 w-full">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <div className="flex items-center space-x-2">
        <Image
          src="/assets/logo.jpg"
          alt="Profile"
          width={150} 
          height={300}
          className="w-10 h-10 rounded-full"
        />
        <span>Nikhil Mitra</span>
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
