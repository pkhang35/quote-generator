import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom"; // Bỏ Router
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import ThemeToggle from "./components/ThemeToggle";
import SearchBar from "./components/SearchBar";
import QuoteCard from "./components/QuoteCard";
import AddQuoteModal from "./components/AddQuoteModal";
import FavoritesPage from "./pages/FavoritesPage"; // Import component mới
import FavoriteQuotes from "./components/FavoriteQuotes"; // Import component FavoriteQuotes

const App = () => {
  const [quotes, setQuotes] = useState([]); // Đảm bảo quotes là một mảng
  const [favorites, setFavorites] = useState([]);
  const [randomQuote, setRandomQuote] = useState(null);
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isAddQuoteModalOpen, setAddQuoteModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredQuotes, setFilteredQuotes] = useState([]);

  // Tải dữ liệu từ Local Storage khi khởi động
  useEffect(() => {
    const storedQuotes = localStorage.getItem("quotes");
    if (storedQuotes) {
      const parsedQuotes = JSON.parse(storedQuotes);
      setQuotes(parsedQuotes);
      setRandomQuote(getRandomQuote(parsedQuotes)); // Hiển thị một lời khuyên ngẫu nhiên khi khởi động
    }
    // Tải dữ liệu yêu thích từ Local Storage
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      const parsedFavorites = JSON.parse(storedFavorites);
      setFavorites(parsedFavorites);
    }
  }, []);

  // Mở Modal thêm lời khuyên
  const openAddQuoteModal = () => {
    setAddQuoteModalOpen(true);
  };

  // Đóng Modal thêm lời khuyên
  const closeAddQuoteModal = () => {
    setAddQuoteModalOpen(false);
  };

  // Thêm lời khuyên mới
  const addQuote = (newQuote) => {
    const newId = quotes.length + 1;
    const newQuoteObj = { id: newId, text: newQuote };
    const updatedQuotes = [...quotes, newQuoteObj];
    setQuotes(updatedQuotes);
    setRandomQuote(newQuoteObj); // Hiển thị lời khuyên vừa thêm làm lời khuyên ngẫu nhiên

    // Cập nhật Local Storage ngay khi thêm lời khuyên mới
    localStorage.setItem("quotes", JSON.stringify(updatedQuotes));
  };

  // Lấy một lời khuyên ngẫu nhiên
  const getRandomQuote = (quoteList) => {
    const randomIndex = Math.floor(Math.random() * quoteList.length);
    return quoteList[randomIndex];
  };

  // Hàm reload để chọn lời khuyên ngẫu nhiên
  const reloadQuote = () => {
    if (quotes.length > 0) {
      setRandomQuote(getRandomQuote(quotes));
    }
  };

  // Xử lý tìm kiếm
  const handleSearch = (term) => {
    setSearchTerm(term);
    if (term.trim() === "") {
      setFilteredQuotes([]);
    } else {
      const results = quotes.filter((quote) =>
        quote.text.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredQuotes(results);
    }
  };

  const handleAddToFavorites = () => {
    if (randomQuote && !favorites.some((fav) => fav.id === randomQuote.id)) {
      const newFavorites = [...favorites, randomQuote];
      setFavorites(newFavorites);
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
    }
  };

  const handleRemoveFromFavorites = (id) => {
    const newFavorites = favorites.filter((fav) => fav.id !== id);
    setFavorites(newFavorites);
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
  };

  // Hàm chia sẻ lên Facebook
  const shareOnFacebook = () => {
    if (!randomQuote) return; // Nếu không có lời khuyên hiện tại, không làm gì

    const advice = randomQuote.text; // Lấy lời khuyên hiện tại
    const url = encodeURIComponent("http://localhost:3000/"); // URL bạn muốn chia sẻ
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${encodeURIComponent(
      advice
    )}`;

    // Mở liên kết chia sẻ Facebook trong tab mới
    window.open(facebookShareUrl, "_blank");
  };

  return (
    <div className="min-h-screen flex">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={() => setSidebarOpen(!isSidebarOpen)}
        openAddQuoteModal={openAddQuoteModal}
      />

      <main className="flex-1 flex flex-col bg-white dark:bg-gray-900">
        <div className="flex-1 p-8">
          <div className="max-w-md mx-auto">
            <SearchBar onSearch={handleSearch} />
            <Routes>
              <Route
                path="/"
                element={
                  searchTerm ? (
                    filteredQuotes.length > 0 ? (
                      filteredQuotes.map((quote) => (
                        <QuoteCard key={quote.id} quote={quote} />
                      ))
                    ) : (
                      <p className="text-center text-gray-500 dark:text-gray-400">
                        No quotes found
                      </p>
                    )
                  ) : (
                    randomQuote && (
                      <>
                        <QuoteCard
                          quote={randomQuote}
                          reloadQuote={reloadQuote}
                          onAddToFavorites={handleAddToFavorites}
                          shareQuote={shareOnFacebook}
                        />
                        <FavoriteQuotes
                          favorites={favorites}
                          onRemove={handleRemoveFromFavorites}
                        />
                      </>
                    )
                  )
                }
              />
              <Route
                path="/favorites"
                element={
                  <FavoritesPage
                    favorites={favorites}
                    onRemove={handleRemoveFromFavorites}
                  />
                }
              />
            </Routes>
          </div>
        </div>
        <Footer />
      </main>

      <AddQuoteModal
        isOpen={isAddQuoteModalOpen}
        closeModal={closeAddQuoteModal}
        addQuote={addQuote}
      />

      <ThemeToggle />
    </div>
  );
};

export default App;
