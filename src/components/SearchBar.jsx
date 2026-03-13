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
    <div className="flex gap-2 max-w-xl mx-auto mb-9">
      <input
        type="text"
        placeholder="Search for a movie..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        className="flex-1 px-5 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-gray-900 bg-white transition-all"
      />
      <button
        onClick={handleSearch}
        className="px-6 py-3 bg-gray-900 text-white rounded-xl text-sm font-semibold hover:opacity-75 transition-opacity"
      >
        Search
      </button>
    </div>
  )
}

export default SearchBar