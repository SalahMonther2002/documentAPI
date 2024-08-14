import React from 'react';
import logo from './assets/google-docs.png';

export default function Header() {
  return (
    <header className="flex justify-between items-center bg-white px-8 py-4 shadow-sm">
      <div className="flex items-center space-x-4">
        <img
          src={logo}
          alt="Logo"
          className="h-8"
        />
        <span className="text-xl font-semibold text-gray-800">Document</span>
      </div>

      <div className="flex items-center space-x-4">
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200 ease-in-out">
          Go to Docs
        </button>
        <button className="bg-blue-800 text-white px-4 py-2 rounded-md hover:bg-blue-900 transition duration-200 ease-in-out">
          Try Docs for Work
        </button>
      </div>
    </header>
  );
}
