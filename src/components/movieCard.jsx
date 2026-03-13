import { useNavigate } from 'react-router-dom'

function MovieCard({ movie }) {
  const navigate = useNavigate()
  const poster = movie.Poster !== "N/A"
    ? movie.Poster
    : "https://via.placeholder.com/300x445?text=No+Poster"

  return (
    <div className="movie-card" onClick={() => navigate(`/movie/${movie.imdbID}`)}>
      <img src={poster} alt={movie.Title} />
      <div className="movie-info">
        <h3>{movie.Title}</h3>
        <span className="year">{movie.Year}</span>
        <span className="type">{movie.Type}</span>
      </div>
    </div>
  )
}

export default MovieCard