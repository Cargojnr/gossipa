import React, { useState, useRef, useEffect } from "react";
import { FaSearch } from "react-icons/fa";

interface Suggestion {
  id: number;
  secret: string;
}

const LiveSearch: React.FC = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    if (value.trim() === "") {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    debounceTimer.current = setTimeout(() => {
      fetch("/api/searching", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ search: value })
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.searchResults) {
            setSuggestions(data.searchResults);
            setShowSuggestions(true);
          }
        })
        .catch((err) => {
          console.error("Live search error:", err);
        });
    }, 300);
  };

  const highlightMatch = (text: string, keyword: string) => {
    const regex = new RegExp(`(${keyword})`, "gi");
    return text.replace(regex, "<mark>$1</mark>");
  };

  return (
    <div ref={searchRef} className="w-full">
      <form
        action="/search"
        method="post"
        autoComplete="off"
        className="relative w-full"
      >
        <div className="relative flex items-center border border-zinc-400 dark:border-zinc-700 rounded-full bg-[var(--card-bg)] px-4 py-2">
          <button
            className="text-gray-500 dark:text-zinc-300"
            type="submit"
            id="toggleSearch"
          >
            <FaSearch />
          </button>
          <input
            name="search"
            type="text"
            id="searchInput"
            placeholder="Search gists, secrets, people..."
            className="ml-3 w-full bg-transparent text-sm font-semibold focus:outline-none text-[var(--text-color)]"
            value={query}
            onChange={handleSearch}
          />
        </div>
        {showSuggestions && (
          <ul className="absolute mt-2 z-50 w-full max-h-60 overflow-y-auto rounded-xl border border-[var(--primary-color)] bg-[var(--body-bg)] shadow-xl backdrop-blur-sm suggestion-box">
            {suggestions.length === 0 ? (
              <li className="no-result text-sm italic px-4 py-2 text-muted">No result found</li>
            ) : (
              suggestions.map((item) => (
                <li
                  key={item.id}
                  className="suggestion-item hover:bg-[var(--highlight-bg)] transition-colors cursor-pointer px-4 py-2 text-sm text-[var(--text-color)] border-b border-[var(--primary-color)]"
                  onClick={() => (window.location.href = `/secret/${item.id}`)}
                >
                  <span className="arrow text-zinc-400 mr-2">→</span>
                  <span
                    className="text"
                    dangerouslySetInnerHTML={{
                      __html: highlightMatch(
                        item.secret.length > 50 ? item.secret.slice(0, 50) + "..." : item.secret,
                        query
                      )
                    }}
                  ></span>
                </li>
              ))
            )}
          </ul>
        )}
      </form>
    </div>
  );
};

export default LiveSearch;
