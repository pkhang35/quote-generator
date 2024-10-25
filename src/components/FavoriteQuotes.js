import React from "react";

const FavoriteQuotes = ({ favorites, onRemove }) => (
  <div className="mt-6">
    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
      Favorite Quotes
    </h2>
    <ul className="mt-4">
      {favorites.length === 0 ? (
        <li className="text-gray-500 dark:text-gray-300">
          No favorite quotes yet.
        </li>
      ) : (
        favorites.slice(0, 5).map((quote) => (
          <li
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
          </li>
        ))
      )}
    </ul>
  </div>
);

export default FavoriteQuotes;
