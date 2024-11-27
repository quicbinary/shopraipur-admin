import React from 'react';
import Image from 'next/image';
import { MdEmail, MdLocationOn, MdPhone, MdLock } from 'react-icons/md'; // Importing icons from react-icons

export default function ProfileHeader() {
  return (
    <div>
      <div className="flex justify-between items-center p-6 bg-white shadow-lg">
        <h1 className="text-2xl font-bold">Ads</h1>
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium">Nikhil Mitra</span>
          <Image
            src="/assets/logo.jpg"
            alt="User"
            width={40}
            height={40}
            className="rounded-full"
          />
        </div>
      </div>

      <div className="bg-gray-100 p-8 w-full flex-1 justify-center items-center">
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col sm:flex-row items-center gap-6 mb-8">
          <Image
            src="/assets/logo.jpg"
            alt="Profile"
            width={100}
            height={100}
            className="w-24 h-24 rounded-lg object-cover"
          />
          <div className="flex-1">
            <h2 className="text-2xl font-semibold">Nikhil Mitra</h2>
            <div className="text-gray-500 mt-2">
              <p className="flex">
                <MdEmail className="mr-2 w-4" /> testemail@gmail.com
              </p>
              <p className="flex">
                <MdLocationOn className="mr-2 w-4" /> New Delhi, India
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-gray-500">
              <p className="flex">
                <MdPhone className="mr-2 w-4" />+91-93922 92922
              </p>
            </div>
            <div className="text-gray-500">
              <p className="flex">
                <MdLock className="mr-2 w-4" />*******************
              </p>
            </div>
          </div>
        </div>

        <div className="w-full bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-purple-600 mb-4">Edit Profile</h2>
          <form className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-gray-600 mb-2">Name</label>
              <input
                type="text"
                placeholder="Nikhil Mitra"
                className="w-full border border-gray-300 rounded-lg p-2"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-2">Email</label>
              <input
                type="email"
                placeholder="testemail@gmail.com"
                className="w-full border border-gray-300 rounded-lg p-2"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-2">Password</label>
              <input
                type="password"
                placeholder="Enter Password"
                className="w-full border border-gray-300 rounded-lg p-2"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-2">Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm your password"
                className="w-full border border-gray-300 rounded-lg p-2"
              />
            </div>
            <div className="col-span-1 sm:col-span-2 text-right">
              <button
                type="submit"
                className="bg-purple-600 text-white px-6 py-2 rounded-lg"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
