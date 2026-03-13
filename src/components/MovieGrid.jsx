import MovieCard from './movieCard.jsx'

function MovieGrid({ movies }) {
  if (movies.length === 0) return null

  return (
    <div className="movie-grid">
      {movies.map(movie => (
        <MovieCard key={movie.imdbID} movie={movie} />
      ))}
    </div>
  )
}

export default MovieGrid