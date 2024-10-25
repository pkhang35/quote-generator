// components/SearchBar.js
import React from "react";

const SearchBar = ({ onSearch }) => {
  return (
    <div className="relative mb-6 max-w-md mx-auto">
      <input
        type="text"
        placeholder="Search"
        onChange={(e) => onSearch(e.target.value)} // Gọi hàm onSearch khi nhập từ khóa
        className="w-full p-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-blue-500"
      />
    </div>
  );
};

export default SearchBar;
