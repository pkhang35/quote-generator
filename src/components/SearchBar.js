// src/components/SearchBar.js
import React from "react";

const SearchBar = ({ onSearch }) => (
  <div className="mb-8 relative">
    <input
      type="text"
      placeholder="Search for quotes..."
      className="w-full p-4 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-green-500 shadow-md"
      onChange={(e) => onSearch(e.target.value)}
    />
  </div>
);

export default SearchBar;
