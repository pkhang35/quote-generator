import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { FiSun } from "react-icons/fi";

const Header = ({ isCollapsed, onSearch }) => {
  return (
    <header
      className={`bg-gray-300 dark:bg-gray-900 p-4 flex justify-between items-center transition-all duration-300 ${
        isCollapsed ? "ml-16" : "ml-60"
      }`}
    >
      <div className="flex items-center">
        <h1 className="text-lg font-bold">Quote Generator</h1>
        <div className="relative ml-4">
          <AiOutlineSearch className="absolute top-1/2 left-2 transform -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search"
            className="pl-8 pr-4 py-2 rounded-md bg-gray-100 dark:bg-gray-700"
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
      </div>
      <button className="p-2 rounded-full bg-gray-200 dark:bg-gray-700">
        <FiSun size={24} />
      </button>
    </header>
  );
};

export default Header;
