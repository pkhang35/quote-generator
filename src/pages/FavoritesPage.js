import React from "react";

const FavoritesPage = ({ favorites, onRemove }) => {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
        {" "}
        {/* Thêm lớp text-gray-900 và dark:text-white */}
        Favorite Quotes
      </h2>
      {favorites.length > 0 ? (
        favorites.map((quote) => (
          <div
            key={quote.id}
            className="flex justify-between bg-gray-700 dark:bg-gray-800 p-4 rounded mb-2"
          >
            <span className="text-white dark:text-gray-300">
              "{quote.text}"
            </span>
            <button
              onClick={() => onRemove(quote.id)}
              className="text-red-500 hover:text-red-400"
            >
              Remove
            </button>
          </div>
        ))
      ) : (
        <p className="text-gray-500 dark:text-gray-300">
          {" "}
          {/* Thêm dark:text-gray-300 để hiển thị đúng màu trong chế độ tối */}
          Chưa có lời khuyên nào trong danh sách yêu thích.
        </p>
      )}
    </div>
  );
};

export default FavoritesPage;
