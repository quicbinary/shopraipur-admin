import Head from "next/head";
import Image from "next/image";
export default function Shops() {
  return (
    <>
      <Head>
        <title>Shops</title>
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
          <header className="flex justify-between items-center pb-4 border-b border-gray-300">
            <h1 className="text-2xl font-semibold">Shops</h1>
            <div className="flex items-center space-x-2">
              <span>Nikhil Mitra</span>
              <Image
                src="/assets/logo.jpg"
                alt="Profile"
                width={40}
                height={40}
                className="rounded-full w-10 h-10"
              />
            </div>
          </header>

          {/* Shop Details */}
          <div className="bg-white shadow-lg mt-7 rounded-lg p-6 mb-10">
            <div className="flex items-center space-x-4">
              <Image
                src="/assets/shoplogo.png"
                alt="Logo"
                width={40}
                height={40}
                className="w-20 h-20 rounded"
              />
              <div>
                <h2 className="shop-name text-2xl font-semibold">
                  Dignity Fashion
                </h2>
                <p className="owner-name text-gray-500">Nikhil Mitra</p>
              </div>
            </div>
          </div>

          {/* Information Section */}
          <div className="bg-white shadow-lg mb-10 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-6">Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-gray-700">
              <div>
                <h4 className="font-semibold">Shop Name</h4>
                <p className="shop-name text-gray-500">Dignity Fashion</p>
              </div>
              <div>
                <h4 className="font-semibold">Owner Name</h4>
                <p className="owner-name text-gray-500">Dignity Fashion</p>
              </div>
              <div>
                <h4 className="font-semibold">GST Number</h4>
                <p id="gst" className="text-gray-500">
                  4 8 5 7 4 8 5 7 4 5 8 4
                </p>
              </div>
              <div>
                <h4 className="font-semibold">Phone Number</h4>
                <p id="phone" className="text-gray-500">+91 83292 82392</p>
              </div>
              <div className="col-span-2">
                <h4 className="font-semibold">Area</h4>
                <p id="area" className="text-gray-500">
                  Mahalpara road,
                  <br />
                  Baikunthpur, Chhattisgarh
                </p>
              </div>
              {/* Product Limit Section */}
              <div className="mt-8 flex items-center space-x-4">
                <div>
                  <h4 className="font-semibold">Product Limit 200</h4>
                  <input
                    type="number"
                    placeholder="Enter Product Limit"
                    className="border border-gray-300 rounded-md px-4 py-2 w-full md:w-1/2"
                  />
                  <button className="bg-purple-500 text-white font-semibold ml-2 px-8 py-2 rounded-md hover:bg-purple-600">
                    Set Limit
                  </button>
                </div>
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
                    <th className="p-4 text-gray-600 font-medium">
                      Products Image
                    </th>
                    <th className="p-4 text-gray-600 font-medium">
                      Products Name
                    </th>
                    <th className="p-4 text-gray-600 font-medium">
                      Products Category
                    </th>
                    <th className="p-4 text-gray-600 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {[...Array(8)].map((_, i) => (
                    <tr className="border-b" key={i}>
                      <td className="p-4">
                        <Image
                          src="/assets/halfShirt.png"
                          alt="Product Image"
                          width={40}
                          height={40}
                          className="w-28 h-20 object-cover rounded-md"
                        />
                      </td>
                      <td className="p-4 text-gray-700">Half Shirt</td>
                      <td className="p-4 text-gray-700">Clothing</td>
                      <td className="p-4">
                        <button className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="mt-6 flex justify-center items-center space-x-2">
              <button className="px-3 py-1 rounded-md text-gray-500 bg-gray-200 hover:bg-gray-300">
                ❮
              </button>
              {[...Array(10)].map((_, i) => (
                <button
                  key={i}
                  className={`px-3 py-1 rounded-md ${
                    i === 0
                      ? "text-white bg-purple-500 hover:bg-purple-600"
                      : "text-gray-500 bg-gray-200 hover:bg-gray-300"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button className="px-3 py-1 rounded-md text-gray-500 bg-gray-200 hover:bg-gray-300">
                ❯
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
