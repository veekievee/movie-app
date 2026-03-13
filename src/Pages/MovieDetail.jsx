import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

function MovieDetail({ apiKey }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    async function fetchMovie() {
      try {
        const response = await fetch(
          `https://www.omdbapi.com/?i=${id}&apikey=${apiKey}&plot=full`
        )
        const data = await response.json()

        if (data.Response === "True") {
          setMovie(data)
        } else {
          setError(data.Error)
        }
      } catch (err) {
        setError("Something went wrong.")
      } finally {
        setLoading(false)
      }
    }

    fetchMovie()
  }, [id])

  if (loading) return <p className="status">Loading...</p>
  if (error) return <p className="status error">{error}</p>

  const poster = movie.Poster !== "N/A"
    ? movie.Poster
    : "https://via.placeholder.com/300x445?text=No+Poster"

  return (
  <div className="max-w-5xl mx-auto px-5 py-10">
    <button
      className="text-sm font-semibold mb-8 hover:opacity-50 transition-opacity"
      onClick={() => navigate(-1)}
    >
      ← Back
    </button>

    <div className="flex gap-10 items-start">
      <img
        src={poster}
        alt={movie.Title}
        className="w-64 rounded-xl shadow-lg flex-shrink-0"
      />

      <div>
        <h1 className="text-3xl font-bold mb-3">{movie.Title}</h1>

        <div className="flex gap-2 flex-wrap mb-5">
          <span className="text-xs bg-gray-100 px-3 py-1 rounded-full text-gray-500">{movie.Year}</span>
          <span className="text-xs bg-gray-100 px-3 py-1 rounded-full text-gray-500">{movie.Rated}</span>
          <span className="text-xs bg-gray-100 px-3 py-1 rounded-full text-gray-500">{movie.Runtime}</span>
          <span className="text-xs bg-gray-100 px-3 py-1 rounded-full text-gray-500">{movie.Genre}</span>
        </div>

        <p className="text-sm text-gray-500 leading-relaxed mb-6">{movie.Plot}</p>

        <div className="flex flex-col gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-gray-400 font-semibold">Director</span>
            <p className="text-sm mt-1">{movie.Director}</p>
          </div>
          <div>
            <span className="text-xs uppercase tracking-widest text-gray-400 font-semibold">Cast</span>
            <p className="text-sm mt-1">{movie.Actors}</p>
          </div>
          <div>
            <span className="text-xs uppercase tracking-widest text-gray-400 font-semibold">IMDb Rating</span>
            <p className="text-sm mt-1">⭐ {movie.imdbRating}</p>
          </div>
          <div>
            <span className="text-xs uppercase tracking-widest text-gray-400 font-semibold">Box Office</span>
            <p className="text-sm mt-1">{movie.BoxOffice || "N/A"}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}
export default MovieDetail