import React, { useState } from "react";

const AddQuote = ({ onAdd }) => {
  const [newQuote, setNewQuote] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(newQuote);
    setNewQuote("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <input
        type="text"
        placeholder="Add a new quote..."
        value={newQuote}
        onChange={(e) => setNewQuote(e.target.value)}
        className="w-full p-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-green-500"
      />
      <button
        type="submit"
        className="mt-2 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
      >
        Add Quote
      </button>
    </form>
  );
};

export default AddQuote;
