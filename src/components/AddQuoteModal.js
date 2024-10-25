// components/AddQuoteModal.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const AddQuoteModal = ({ isOpen, closeModal, addQuote }) => {
  const [newQuote, setNewQuote] = useState("");
  const navigate = useNavigate(); // Tạo instance của navigate

  const handleSave = () => {
    if (newQuote.trim()) {
      addQuote(newQuote.trim());
      setNewQuote(""); // Xóa nội dung sau khi lưu
      closeModal(); // Đóng modal
      navigate("/"); // Quay về trang chủ
    }
  };

  return (
    isOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg max-w-lg w-full">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            {" "}
            {/* Thêm lớp text-gray-900 và dark:text-white */}
            Thêm lời khuyên
          </h2>
          <textarea
            value={newQuote}
            onChange={(e) => setNewQuote(e.target.value)}
            placeholder="Nhập lời khuyên..."
            className="w-full p-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-blue-500"
            rows="4"
          />
          <div className="mt-4 flex justify-end space-x-4">
            <button
              onClick={closeModal}
              className="px-4 py-2 bg-gray-500 text-white rounded"
            >
              Hủy
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Lưu
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default AddQuoteModal;
