import React from "react";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { AiOutlineHome, AiOutlinePlus, AiOutlineHeart } from "react-icons/ai";
import { Link } from "react-router-dom"; // Import Link

const Sidebar = ({ isSidebarOpen, toggleSidebar, openAddQuoteModal }) => {
  return (
    <aside
      className={`bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-200 transition-all duration-300 ${
        isSidebarOpen ? "w-64" : "w-20"
      }`}
    >
      <div className="p-4 flex justify-between items-center">
        <h1
          className={`text-xl font-bold transition-all duration-300 ${
            isSidebarOpen ? "block" : "hidden"
          }`}
        >
          Quote Generator
        </h1>
        <button
          onClick={toggleSidebar}
          className="text-gray-700 dark:text-gray-200"
        >
          <HiOutlineMenuAlt3 size={28} />
        </button>
      </div>
      <nav className="mt-4">
        <ul>
          <li className="flex items-center p-4 hover:bg-gray-300 dark:hover:bg-gray-800">
            <Link to="/" className="flex items-center w-full">
              <AiOutlineHome size={24} />
              <span
                className={`ml-4 transition-all duration-300 ${
                  isSidebarOpen ? "block" : "hidden"
                }`}
              >
                Trang chủ
              </span>
            </Link>
          </li>
          <li
            className="flex items-center p-4 hover:bg-gray-300 dark:hover:bg-gray-800"
            onClick={openAddQuoteModal}
          >
            <div className="flex items-center w-full">
              <AiOutlinePlus size={24} />
              <span
                className={`ml-4 transition-all duration-300 ${
                  isSidebarOpen ? "block" : "hidden"
                }`}
              >
                Thêm lời khuyên
              </span>
            </div>
          </li>
          <li className="flex items-center p-4 hover:bg-gray-300 dark:hover:bg-gray-800">
            <Link to="/favorites" className="flex items-center w-full">
              <AiOutlineHeart size={24} />
              <span
                className={`ml-4 transition-all duration-300 ${
                  isSidebarOpen ? "block" : "hidden"
                }`}
              >
                Yêu thích
              </span>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
