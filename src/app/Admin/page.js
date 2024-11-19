import React from "react";
import Image from "next/image";
function Page() {
  return (
    <div>
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
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Admin</h2>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="text-gray-600">
            <th className="py-3 border-b">Name</th>
            <th className="py-3 border-b">Email</th>
            <th className="py-3 border-b">Logo</th>
            <th className="py-3 border-b">Admin Type</th>
            <th className="py-3 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b">
            <td className="py-4">Nikhil Mitra</td>
            <td className="py-4">testemail@gmail.com</td>
            <td className="py-4"><span class="w-10 h-10 rounded-full bg-gray-300 inline-block"></span></td> 
            <td className="py-4">Chief Admin</td>
            <td className="py-4">
              <button className="bg-purple-600 text-white px-3 py-1 rounded-md mr-2">
                Change Password
              </button>
              <button className="text-red-500">
                <i className="fas fa-trash"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div>
      <div className="bg-white p-6 rounded-lg shadow-lg mt-6">
        <h3 className="text-xl font-semibold text-purple-600 mb-4">Add Admin</h3>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Input Fields */}
          <div>
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
            />
          </div>
          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
            />
          </div>
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
            />
          </div>
          <div>
            <label className="block text-gray-700">Confirm Password</label>
            <input
              type="password"
              className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
            />
          </div>
          <div>
            <label className="block text-gray-700">Admin Type</label>
            <select className="mt-1 block w-full border border-gray-300 rounded-lg p-2">
              <option>Select Admin Type</option>
              <option>Chief Admin</option>
              <option>Sub Admin</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700">Upload Logo</label>
            <input
              type="file"
              className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
            />
          </div>

          {/* Permissions Section */}
          <div className="col-span-2">
            <h4 className="text-gray-700 mb-2">Permissions</h4>
            <div className="grid grid-cols-3 gap-2">
              {[
                "Categories",
                "Products",
                "Views",
                "Approval",
                "Admins",
                "Ads",
                "Shops",
                "Cities",
              ].map((permission, index) => (
                <label key={index} className="flex items-center space-x-2">
                  <input type="checkbox" className="form-checkbox text-purple-600" />
                  <span>{permission}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="col-span-2 text-right">
            <button type="submit" className="bg-purple-600 text-white py-2 px-6 rounded-md">
              Submit
            </button>
          </div>
        </form>
      </div>
      </div>
    </div>
    
  );
}

export default Page;
 