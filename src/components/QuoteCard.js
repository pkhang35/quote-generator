// components/QuoteCard.js
import React from "react";
import {
  AiOutlineReload,
  AiOutlineStar,
  AiOutlineShareAlt,
} from "react-icons/ai";

const QuoteCard = ({ quote, reloadQuote, onAddToFavorites }) => {
  const handleShare = () => {
    const text = encodeURIComponent(quote.text); // Lời khuyên bạn muốn chia sẻ
    const url = "http://localhost:3000/"; // URL giả lập
    const fbShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`;
    window.open(fbShareUrl, "_blank"); // Mở cửa sổ mới để chia sẻ
  };

  return (
    <div className="bg-gray-200 dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center">
      <p className="text-gray-700 dark:text-gray-400">ADVICE #{quote.id}</p>
      <p className="text-xl font-semibold text-gray-900 dark:text-white my-4">
        "{quote.text}"
      </p>
      <div className="flex justify-center space-x-4">
        <button
          onClick={reloadQuote}
          className="bg-blue-500 text-white p-3 rounded"
        >
          <AiOutlineReload size={20} />
        </button>
        <button
          className="bg-blue-500 text-white p-3 rounded"
          onClick={onAddToFavorites}
        >
          <AiOutlineStar size={20} />
        </button>
        <button
          onClick={handleShare}
          className="bg-blue-500 text-white p-3 rounded"
        >
          <AiOutlineShareAlt size={20} />
        </button>
      </div>
    </div>
  );
};

export default QuoteCard;
