import { useState } from 'react'

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("")

  function handleSearch() {
    if (query.trim()) {
      onSearch(query)
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") handleSearch()
  }

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search for a movie..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  )
}

export default SearchBar