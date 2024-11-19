// pages/approval.js
import Head from 'next/head';
import Header from "@/components/header";
import ShopApproval from "@/components/shopapproval";
import Productapproval from "@/components/productapproval"
import Adsapproval from "@/components/adsapproval";
export default function ApprovalPage() {
  return (
    <>
      <Head>
        <title>Approval UI</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css"
        />
      </Head>
<<<<<<< HEAD
      <div className="bg-gray-100 flex flex-col">
        <Header />
        <ShopApproval />
        <Productapproval/>
        <Adsapproval/>
=======
      <div className="bg-gray-100 flex">
        {/* Main Content */}
        <div className="flex-1">
       

          <div className="p-10 mx-auto">
            {/* Filter Section */}
            <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
              <h2 className="text-lg font-semibold mb-4">Filter</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Select Category
                  </label>
                  <select className="mt-1 block w-full p-2 border border-gray-300 rounded-lg">
                    <option>Select Category</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">From</label>
                    <input
                      type="date"
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">To</label>
                    <input
                      type="date"
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Shop Approval Section */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-lg font-bold mb-4">Shop Approval</h2>
              <h2 className="font-semibold">Shop Details</h2>

              {/* Shop Item */}
              <div className="space-y-6 flex mt-8">
                <div className="bg-white p-4 rounded-lg shadow w-72">
                  <a href="/shopdetail">
                    <Image
                      src="/assets/halfShirt.png"
                      alt="Shop Image"
                      width={256}
                      height={144}
                      className="rounded-lg mb-4 w-full"
                    />
                  </a>
                  <h3 className="text-lg font-semibold">Shiddhivinayak Garments</h3>
                  <div className="text-gray-500 flex items-center mt-2">
                    <i className="fas fa-map-marker-alt text-red-500 mr-2"></i>
                    <span>Landmark</span>
                  </div>
                </div>
                <div className="flex space-x-8 items-center justify-between ml-28">
                  <button className="px-10 py-3 bg-purple-500 text-white rounded-lg">
                    View
                  </button>
                  <a
                    href="/Buttons/Approvshop"
                    onClick={() =>
                      confirm('Are you sure you want to approve this shop?')
                    }
                  >
                    <button className="px-10 py-3 bg-purple-500 text-white rounded-lg">
                      Approve
                    </button>
                  </a>
                  <a href="/Buttons/Deleteshop">
                  <button className="px-10 py-3 bg-purple-500 text-white p-5 rounded">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M6 2a1 1 0 011-1h6a1 1 0 011 1v1h5a1 1 0 110 2h-1v11a2 2 0 01-2 2H4a2 2 0 01-2-2V5H1a1 1 0 110-2h5V2zm2 3a1 1 0 10-2 0v10a1 1 0 102 0V5zm6 0a1 1 0 10-2 0v10a1 1 0 102 0V5z"/>
            </svg>
          </button>
                  </a>
                </div>
              </div>
              {/* Pagination */}
              <div className="flex justify-center space-x-2 mt-6">
                <button className="px-3 py-1 border border-gray-300 rounded-lg text-gray-600">
                  &lt;
                </button>
                <button className="px-3 py-1 bg-purple-500 text-white rounded-lg">1</button>
                <button className="px-3 py-1 border border-gray-300 rounded-lg text-gray-600">
                  2
                </button>
                <button className="px-3 py-1 border border-gray-300 rounded-lg text-gray-600">
                  ...
                </button>
                <button className="px-3 py-1 border border-gray-300 rounded-lg text-gray-600">
                  10
                </button>
                <button className="px-3 py-1 border border-gray-300 rounded-lg text-gray-600">
                  &gt;
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="p-8 bg-gray-100  rounded-lg shadow-lg">
        {/* Product Approval section */}
      <div className="bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-lg font-bold mb-4">Products Approval</h2>
      
      <div className="grid grid-cols-4 gap-6">
        <div>
          <label className="block font-medium text-black">Select Category</label>
          <select className="block w-full p-2 border border-gray-300 rounded-lg">
            <option>Select Category</option>
          </select>
        </div>
        <div>
          <label className="block text-black font-semibold">Select</label>
          <select className="block w-full border border-gray-300 rounded-lg p-2">
            <option>Select Categories</option>
            <option>1</option>
            <option>2</option>
          </select>
        </div>
        <div>
          <label className="block text-black font-semibold">Select Subcategories</label>
          <select className="block w-full border border-gray-300 rounded-lg p-2">
            <option>Select Subcategories</option>
            <option>1</option>
            <option>2</option>
          </select>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block font-medium text-black">From</label>
            <input type="date" className="block w-full p-2 border border-gray-300 rounded-lg" />
          </div>
          <div>
            <label className="block font-medium text-black">To</label>
            <input type="date" className="block w-full p-2 border border-gray-300 rounded-lg" />
          </div>
        </div>
      </div>

      <div className="space-y-6 flex mt-8">
        <div className="bg-white p-4 rounded-lg shadow w-72">
          <a href="/product-detail">
            <Image src="/assets/kurta.png" alt="Shop Image" 
            width={150} 
            height={300}
            className="rounded-lg mb-4 w-64 h-36" />
          </a>
          <h4 className="font-semibold text-gray-800">Half Shirt</h4>
          <p className="text-sm text-gray-600">White Horizontal Line cotton shirt</p>
          <div className="flex justify-between items-center mt-4">
            <span className="text-gray-400 line-through">₹1800</span>
            <span className="text-purple-600 font-bold">₹700</span>
          </div>
        </div>

        <div className="flex space-x-8 items-center justify-between ml-28">
          <a href="/product-detail">
            <button className="px-10 py-3 bg-purple-500 text-white rounded-lg">View</button>
          </a>
          <button className="px-10 py-3 bg-purple-500 text-white rounded-lg">Approve</button>
          <button className="px-10 py-3 bg-purple-500 text-white p-5 rounded">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M6 2a1 1 0 011-1h6a1 1 0 011 1v1h5a1 1 0 110 2h-1v11a2 2 0 01-2 2H4a2 2 0 01-2-2V5H1a1 1 0 110-2h5V2zm2 3a1 1 0 10-2 0v10a1 1 0 102 0V5zm6 0a1 1 0 10-2 0v10a1 1 0 102 0V5z"/>
            </svg>
          </button>
        </div>
      </div>

      <div className="flex justify-center space-x-2 mt-6">
        <button className="px-3 py-1 border border-gray-300 rounded-lg text-gray-600">&lt;</button>
        <button className="px-3 py-1 bg-purple-500 text-white rounded-lg">1</button>
        <button className="px-3 py-1 border border-gray-300 rounded-lg text-gray-600">2</button>
        <button className="px-3 py-1 border border-gray-300 rounded-lg text-gray-600">...</button>
        <button className="px-3 py-1 border border-gray-300 rounded-lg text-gray-600">10</button>
        <button className="px-3 py-1 border border-gray-300 rounded-lg text-gray-600">&gt;</button>
      </div>
    </div>
    <div>
    <div className="mt-10 mx-auto bg-white shadow-lg rounded-lg p-8">
      <h1 className="text-2xl font-semibold mb-6">Ads Approval</h1>

      {/* Filter Section */}
      <div className="flex space-x-4 mb-8">
        <div className="w-1/2">
          <label className="block text-gray-600">Ad Type</label>
          <select
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            onChange={(e) => redirectToPage(e.target.value)}
          >
            <option value="#">Select Ad Type</option>
            <option value="homepage">Homepage Banner ADS</option>
            <option value="ProductADS">Promoted Products Ads</option>
            <option value="storyADS">Story Ads</option>
            <option value="shortADS">Short Video Ads</option>
          </select>
        </div>
        <div className="w-1/2 flex space-x-2">
          <div className="w-1/2">
            <label className="block text-gray-600">Select Date</label>
            <input
              type="date"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="w-1/2">
            <label className="block text-gray-600 invisible">To</label>
            <input
              type="date"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
      </div>

      {/* Banner Section */}
      <h2 className="text-xl font-semibold mb-4">Homepage Banner ADS</h2>

      {/* Ads Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead className="border-b">
            <tr>
              <th className="px-6 py-4 text-left text-gray-600 font-medium">
                Banner Image
              </th>
              <th className="px-6 py-4 text-gray-600 font-medium"></th>
              <th className="px-6 py-4 text-gray-600 font-medium">Select Date</th>
            </tr>
          </thead>
          <tbody>
            {/* Single Ad Row */}
            <tr className="border-b">
              {/* Banner Image Column */}
              <td className="px-6 py-4">
                <Image
                  src="/assets/Banner.png"
                  alt="Banner Image"
                  width={200}
                  height={100}
                  className="w-26 h-24 rounded"
                />
              </td>

              {/* Actions Column */}
              <td className="px-6 py-4 mt-5 space-x-2 flex items-center">
                <a href="banner.html">
                  <button className="bg-purple-500 text-white px-10 py-3 rounded-md">
                    View
                  </button>
                </a>
                <button className="bg-purple-500 text-white px-10 py-3 rounded-md">
                  Approve
                </button>
                <button className="bg-purple-500 text-white p-2 rounded-md">
                  <svg
                    className="w-16 h-8"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M6 2a1 1 0 011-1h6a1 1 0 011 1v1h5a1 1 0 110 2h-1v11a2 2 0 01-2 2H4a2 2 0 01-2-2V5H1a1 1 0 110-2h5V2zm2 3a1 1 0 10-2 0v10a1 1 0 102 0V5zm6 0a1 1 0 10-2 0v10a1 1 0 102 0V5z" />
                  </svg>
                </button>
                <button className="bg-purple-500 text-white p-2 rounded-md">
                  <svg
                    width="60"
                    height="32"
                    viewBox="0 0 29 29"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.4997 21.4466L5.95801 12.9049L8.34967 10.4278L12.7913 14.8695V0.946594H16.208V14.8695L20.6497 10.4278L23.0413 12.9049L14.4997 21.4466ZM4.24967 28.2799C3.31009 28.2799 2.50604 27.9457 1.83751 27.2771C1.16898 26.6086 0.834147 25.804 0.833008 24.8633V19.7383H4.24967V24.8633H24.7497V19.7383H28.1663V24.8633C28.1663 25.8028 27.8321 26.6075 27.1635 27.2771C26.495 27.9468 25.6904 28.2811 24.7497 28.2799H4.24967Z"
                      fill="white"
                    />
                  </svg>
                </button>
              </td>

              {/* Date Selection and Update Column */}
              <td className="px-6 py-4">
                <div className="flex flex-col items-start space-y-2">
                  <div className="flex space-x-2">
                    <input
                      type="date"
                      className="w44 p-3 border border-gray-300 rounded-md text-center"
                    />
                    <input
                      type="date"
                      className="w-44 p-3 border border-gray-300 rounded-md text-center"
                    />
                  </div>
                </div>
              </td>
            </tr>
            {/* Repeat Ad Rows as needed */}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-6 flex justify-center space-x-2">
        <button className="px-3 py-1 rounded bg-gray-200 text-gray-600">
          &lt;
        </button>
        <button className="px-3 py-1 rounded bg-purple-500 text-white">1</button>
        <button className="px-3 py-1 rounded bg-gray-200 text-gray-600">2</button>
        <button className="px-3 py-1 rounded bg-gray-200 text-gray-600">...</button>
        <button className="px-3 py-1 rounded bg-gray-200 text-gray-600">9</button>
        <button className="px-3 py-1 rounded bg-gray-200 text-gray-600">10</button>
        <button className="px-3 py-1 rounded bg-gray-200 text-gray-600">
          &gt;
        </button>
      </div>
    </div>
    </div>
>>>>>>> 4fdb71af6e4704a5df087711764625e1a76d161b
      </div>
    </>
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
