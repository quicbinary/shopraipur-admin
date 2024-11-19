// components/Shops.js
import Image from 'next/image';

const Shops = () => {
  return (
    <>
    <div className="flex justify-between items-center bg-white py-6 px-10 rounded-lg shadow-lg w-full">
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <div className="flex items-center space-x-2">
              <Image
                  src="/assets/logo.jpg"
                  alt="Profile"
                  width={150}
                  height={300}
                  className="w-10 h-10 rounded-full" />
              <span>Nikhil Mitra</span>
          </div>
      </div>
      <div className="bg-gray-100 min-h-screen flex justify-center">
              <div className="rounded-lg mt-5 shadow-lg bg-white px-5 py-4 w-full max-w-screen-xl">
                  {/* Filter Section */}
                  <section className="mt-8">
                      <h2 className="text-xl font-semibold mb-4">Filter Shops</h2>
                      <select className="w-full md:w-1/4 border border-gray-300 rounded-md px-4 py-2">
                          <option>Filter Category</option>
                          {/* Add more options as needed */}
                      </select>
                  </section>

                  {/* Shops Grid */}
                  <section className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                      {Array.from({ length: 8 }).map((_, index) => (
                          <div key={index} className="bg-white p-4 rounded-lg shadow">
                              <a href="/shopdetail">
                                  <Image
                                      src="/assets/halfShirt.png"
                                      alt="Shop Image"
                                      className="rounded-lg mb-4"
                                      width={256}
                                      height={144} />
                              </a>
                              <h3 className="text-lg font-semibold">Shiddhivinayak Garments</h3>
                              <div className="text-gray-500 flex items-center mt-2">
                                  <i className="fas fa-map-marker-alt text-red-500 mr-2"></i>
                                  <span>Landmark</span>
                              </div>
                          </div>
                      ))}
                  </section>

                  {/* Pagination */}
                  <div className="flex justify-center items-center mt-8 space-x-2">
                      <button className="px-3 py-1 border rounded-md text-gray-500 hover:bg-gray-200">
                          1
                      </button>
                      <button className="px-3 py-1 border rounded-md text-gray-500 hover:bg-gray-200">
                          2
                      </button>
                      <button className="px-3 py-1 border rounded-md text-gray-500 hover:bg-gray-200">
                          ...
                      </button>
                      <button className="px-3 py-1 border rounded-md text-gray-500 hover:bg-gray-200">
                          10
                      </button>
                  </div>
              </div>
          </div></>
  );
};

export default Shops;
