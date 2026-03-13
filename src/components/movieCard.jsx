import { useNavigate } from 'react-router-dom'

function MovieCard({ movie }) {
  const navigate = useNavigate()
  const poster = movie.Poster !== "N/A"
    ? movie.Poster
    : "https://via.placeholder.com/300x445?text=No+Poster"

  return (
    <div
      className="bg-white rounded-xl overflow-hidden shadow-sm hover:-translate-y-1 transition-transform cursor-pointer"
      onClick={() => navigate(`/movie/${movie.imdbID}`)}
    >
      <img
        src={poster}
        alt={movie.Title}
        className="w-full aspect-2/3 object-cover"
      />
      <div className="p-3">
        <h3 className="text-sm font-semibold mb-2 leading-snug">{movie.Title}</h3>
        <span className="text-xs text-gray-400 mr-2">{movie.Year}</span>
        <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full text-gray-500 capitalize">{movie.Type}</span>
      </div>
    </div>
  )
}

export default MovieCard