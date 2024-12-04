// pages/404.js

import React from 'react';

export default function Custom404() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
      <div className="container mx-auto p-6">
        {/* Heading */}
        <h1 className="text-4xl font-semibold text-gray-800 mb-4">Oops! Page Not Found</h1>

        {/* Description */}
        <p className="text-lg text-gray-600 mb-6">
          The page you're looking for doesn't exist.
        </p>

        {/* Button to redirect to home */}
       
      </div>
    </div>
  );
}
