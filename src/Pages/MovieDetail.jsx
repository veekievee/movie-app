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
    <div className="detail-page">
      <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>

      <div className="detail-content">
        <img src={poster} alt={movie.Title} className="detail-poster" />

        <div className="detail-info">
          <h1>{movie.Title}</h1>
          <div className="detail-meta">
            <span>{movie.Year}</span>
            <span>{movie.Rated}</span>
            <span>{movie.Runtime}</span>
            <span>{movie.Genre}</span>
          </div>
          <p className="detail-plot">{movie.Plot}</p>
          <div className="detail-stats">
            <div className="stat">
              <span className="stat-label">Director</span>
              <span>{movie.Director}</span>
            </div>
            <div className="stat">
              <span className="stat-label">Cast</span>
              <span>{movie.Actors}</span>
            </div>
            <div className="stat">
              <span className="stat-label">IMDb Rating</span>
              <span>⭐ {movie.imdbRating}</span>
            </div>
            <div className="stat">
              <span className="stat-label">Box Office</span>
              <span>{movie.BoxOffice || "N/A"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieDetail