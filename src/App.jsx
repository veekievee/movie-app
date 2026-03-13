import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import SearchBar from './components/SearchBar.jsx'
import MovieGrid from './components/MovieGrid.jsx'
import MovieDetail from './Pages/MovieDetail.jsx'
import './App.css'

const API_KEY = "1f79c2e9"

function Home() {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [searched, setSearched] = useState(false)

  async function searchMovies(query) {
    try {
      setLoading(true)
      setError("")
      setSearched(true)

      const response = await fetch(
        `https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`
      )
      const data = await response.json()

      if (data.Response === "True") {
        setMovies(data.Search)
      } else {
        setMovies([])
        setError(data.Error)
      }
    } catch (err) {
      setError("Something went wrong. Try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
  <div className="max-w-5xl mx-auto px-5 py-10">
    <header className="text-center mb-9">
      <h1 className="text-4xl font-bold mb-2">Movie Search</h1>
      <p className="text-gray-400 text-sm">Find any movie instantly</p>
    </header>

    <SearchBar onSearch={searchMovies} />

    {loading && <p className="text-center text-gray-400 text-sm mb-6">Searching...</p>}
    {error && <p className="text-center text-red-400 text-sm mb-6">{error}</p>}
    {!loading && searched && movies.length === 0 && !error && (
      <p className="text-center text-gray-400 text-sm mb-6">No movies found</p>
    )}

    <MovieGrid movies={movies} />
  </div>
)
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/movie/:id" element={<MovieDetail apiKey={API_KEY} />} />
    </Routes>
  )
}

export default App