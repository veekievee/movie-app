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
    <div className="app">
      <header className="app-header">
        <h1>Movie Search</h1>
        <p>Find any movie instantly</p>
      </header>

      <SearchBar onSearch={searchMovies} />

      {loading && <p className="status">Searching...</p>}
      {error && <p className="status error">{error}</p>}
      {!loading && searched && movies.length === 0 && !error && (
        <p className="status">No movies found</p>
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