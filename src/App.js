import React, { useState, useEffect } from "react";
import QuoteCard from "./components/QuoteCard";
import SearchBar from "./components/SearchBar";
import AddQuote from "./components/AddQuote";
import FavoriteQuotes from "./components/FavoriteQuotes";
import ThemeToggle from "./components/ThemeToggle";

const App = () => {
  const [quote, setQuote] = useState({ id: 0, text: "" });
  const [favorites, setFavorites] = useState([]);
  const [allQuotes, setAllQuotes] = useState([]); // Danh sách tất cả lời khuyên
  const [filteredQuotes, setFilteredQuotes] = useState([]); // Danh sách câu trích dẫn đã lọc

  // Load dữ liệu từ Local Storage khi ứng dụng khởi động
  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites);
    const savedQuotes = JSON.parse(localStorage.getItem("quotes")) || [];
    setAllQuotes(savedQuotes);
    setFilteredQuotes(savedQuotes); // Khởi tạo danh sách đã lọc
    fetchRandomQuote(savedQuotes); // Hiển thị lời khuyên ngẫu nhiên khi khởi động
  }, []);

  const fetchRandomQuote = (quotes) => {
    if (quotes.length > 0) {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      setQuote(quotes[randomIndex]); // Lấy lời khuyên ngẫu nhiên
    } else {
      setQuote({ id: 0, text: "No quotes available" }); // Thông báo khi không có lời khuyên
    }
  };

  const handleAddToFavorites = () => {
    if (!favorites.some((fav) => fav.id === quote.id)) {
      const newFavorites = [...favorites, quote];
      setFavorites(newFavorites);
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
    }
  };

  const handleRemoveFromFavorites = (id) => {
    const newFavorites = favorites.filter((fav) => fav.id !== id);
    setFavorites(newFavorites);
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
  };

  const handleAddNewQuote = (newQuoteText) => {
    const newQuote = { id: Date.now(), text: newQuoteText }; // Sử dụng timestamp làm ID
    const updatedQuotes = [...allQuotes, newQuote];
    setAllQuotes(updatedQuotes);
    setFilteredQuotes(updatedQuotes); // Cập nhật danh sách đã lọc
    localStorage.setItem("quotes", JSON.stringify(updatedQuotes));
    fetchRandomQuote(updatedQuotes); // Hiển thị lời khuyên ngẫu nhiên sau khi thêm
  };

  const handleShareQuote = () => {
    const shareText = `Check out this quote: "${quote.text}"`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      shareText
    )}`;
    window.open(url, "_blank");
  };

  const handleSearch = (term) => {
    const filtered = allQuotes.filter((quote) =>
      quote.text.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredQuotes(filtered); // Cập nhật danh sách câu trích dẫn đã lọc
    if (filtered.length > 0) {
      fetchRandomQuote(filtered); // Hiển thị câu trích dẫn ngẫu nhiên từ danh sách đã lọc
    } else {
      setQuote({ id: 0, text: "No quotes found" }); // Thông báo nếu không tìm thấy
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-6 transition duration-500 relative">
      <ThemeToggle />
      <div className="w-full max-w-md">
        <SearchBar onSearch={handleSearch} className="mb-4" />
        <AddQuote onAdd={handleAddNewQuote} className="mb-4" />
        <QuoteCard
          quote={quote}
          onRefresh={() => fetchRandomQuote(filteredQuotes)}
          onAddToFavorites={handleAddToFavorites}
          onShare={handleShareQuote}
        />
        <FavoriteQuotes
          favorites={favorites}
          onRemove={handleRemoveFromFavorites}
        />
      </div>
    </div>
  );
};

export default App;
