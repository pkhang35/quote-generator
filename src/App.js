import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import ThemeToggle from "./components/ThemeToggle";
import SearchBar from "./components/SearchBar";
import QuoteCard from "./components/QuoteCard";
import AddQuoteModal from "./components/AddQuoteModal";
import FavoritesPage from "./pages/FavoritesPage";
import FavoriteQuotes from "./components/FavoriteQuotes";

const App = () => {
  const [quotes, setQuotes] = useState([
    {
      id: 1,
      text: "Muốn ngồi ở vị trí không ai ngồi được thì phải chịu được cảm giác không ai chịu được.",
    },
  ]);
  const [favorites, setFavorites] = useState([]);
  const [randomQuote, setRandomQuote] = useState(null);
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isAddQuoteModalOpen, setAddQuoteModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredQuotes, setFilteredQuotes] = useState([]);

  useEffect(() => {
    const storedQuotes = localStorage.getItem("quotes");
    if (storedQuotes) {
      const parsedQuotes = JSON.parse(storedQuotes);
      setQuotes(parsedQuotes);
      setRandomQuote(getRandomQuote(parsedQuotes));
    } else {
      const initialQuote = [
        {
          id: 1,
          text: "Muốn ngồi ở vị trí không ai ngồi được thì phải chịu được cảm giác không ai chịu được.",
        },
      ];
      setQuotes(initialQuote);
      setRandomQuote(initialQuote[0]);
      localStorage.setItem("quotes", JSON.stringify(initialQuote));
    }

    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      const parsedFavorites = JSON.parse(storedFavorites);
      setFavorites(parsedFavorites);
    }
  }, []);

  const openAddQuoteModal = () => {
    setAddQuoteModalOpen(true);
  };

  const closeAddQuoteModal = () => {
    setAddQuoteModalOpen(false);
  };

  const addQuote = (newQuote) => {
    const newId = quotes.length + 1;
    const newQuoteObj = { id: newId, text: newQuote };
    const updatedQuotes = [...quotes, newQuoteObj];
    setQuotes(updatedQuotes);
    setRandomQuote(newQuoteObj);
    localStorage.setItem("quotes", JSON.stringify(updatedQuotes));
  };

  const getRandomQuote = (quoteList) => {
    const randomIndex = Math.floor(Math.random() * quoteList.length);
    return quoteList[randomIndex];
  };

  const reloadQuote = () => {
    if (quotes.length > 0) {
      setRandomQuote(getRandomQuote(quotes));
    }
  };

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

  // Cập nhật hàm handleAddToFavorites để hoạt động cho mọi câu trích dẫn
  const handleAddToFavorites = (quote) => {
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

  const shareOnFacebook = () => {
    if (!randomQuote) return;
    const advice = randomQuote.text;
    const url = encodeURIComponent("http://localhost:3000/");
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${encodeURIComponent(
      advice
    )}`;
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
                        <QuoteCard
                          key={quote.id}
                          quote={quote}
                          onAddToFavorites={() => handleAddToFavorites(quote)} // Thêm hàm này để thích từng câu trích dẫn từ kết quả tìm kiếm
                        />
                      ))
                    ) : (
                      <p className="text-center text-gray-500 dark:text-gray-400">
                        Không tìm thấy lời khuyên nào
                      </p>
                    )
                  ) : (
                    randomQuote && (
                      <>
                        <QuoteCard
                          quote={randomQuote}
                          reloadQuote={reloadQuote}
                          onAddToFavorites={() =>
                            handleAddToFavorites(randomQuote)
                          }
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
