// src/components/QuoteCard.js
import React from "react";
import { AiOutlineReload } from "react-icons/ai"; // Icon cho New Quote
import { AiOutlineStar } from "react-icons/ai"; // Icon cho Add to Favorites
import { AiOutlineShareAlt } from "react-icons/ai"; // Icon cho Share

const QuoteCard = ({ quote, onRefresh, onAddToFavorites, onShare }) => (
  <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center text-white">
    <p className="text-green-400 uppercase tracking-wide mb-2">
      Advice #{quote.id}
    </p>
    <p className="text-xl font-semibold mb-4">"{quote.text}"</p>
    <div className="flex justify-center gap-4">
      <button
        className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded flex items-center"
        onClick={onRefresh}
      >
        <AiOutlineReload className="mr-2" /> New Quote
      </button>
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded flex items-center"
        onClick={onAddToFavorites}
      >
        <AiOutlineStar className="mr-2" /> Add to Favorites
      </button>
      <button
        className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded flex items-center"
        onClick={onShare}
      >
        <AiOutlineShareAlt className="mr-2" /> Share
      </button>
    </div>
  </div>
);

export default QuoteCard;
