


import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { FaSearch, FaSpinner } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const SearchItems = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  const fetchSearchResults = async (query) => {
    if (!query.trim()) {
      setResults([]);
      setShowDropdown(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/expiry-items/search?query=${encodeURIComponent(
          query
        )}`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token") || ""}`, // Use Cookies.get("token") instead of localStorage
          },
        }
      );

      setResults(res.data);
      setShowDropdown(true);
    } catch (error) {
      console.error("Error fetching search results:", error);
      setError("Failed to fetch results. Please try again.");
      setResults([]);
      setShowDropdown(true);
    } finally {
      setIsLoading(false);
    }
  };

  // Debounce search input
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchSearchResults(query);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleItemClick = (item) => {
    // You might want to do something when an item is clicked
    console.log("Item selected:", item);
    setShowDropdown(false);
    navigate(`/product/${item._id}`); 
  };

  return (
    <div className="relative p-4 w-1/2" ref={searchRef}>
      {/* Search Bar */}
      <div className="bg-white border-gray-400 flex rounded-full px-4 py-2 items-center w-full">
        {isLoading ? (
          <FaSpinner className="text-gray-500 animate-spin" />
        ) : (
          <FaSearch className="text-gray-500" />
        )}
        <input
          type="text"
          placeholder="Search by product name or barcode"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="bg-transparent w-full px-2 focus:outline-none"
          aria-haspopup="listbox"
          aria-expanded={showDropdown}
        />
      </div>

      {/* Search Dropdown */}
      {showDropdown && (
        <ul
          className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-lg shadow-lg mt-1 overflow-hidden z-50 max-h-80 overflow-y-auto"
          role="listbox"
        >
          {error ? (
            <li className="p-3 text-red-500">{error}</li>
          ) : results.length > 0 ? (
            results.map((item) => (
              <li
                key={item._id}
                className="p-3 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleItemClick(item)}
                role="option"
              >
                <strong>{item.productName}</strong> (Barcode: {item.barcode}){" "}
                <br />
                <span className="text-gray-500 text-sm">
                  Expiry: {new Date(item.expiryDate).toLocaleDateString()}
                </span>
              </li>
            ))
          ) : (
            <li className="p-3">No results found</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchItems;
