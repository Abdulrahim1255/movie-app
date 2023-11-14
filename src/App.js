
import './App.css';
import React, { useState } from 'react';
function App() {
  
  const [searchText, setSearchText] = useState('');
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  const handleSearch = () => {
   
    const apiUrl = `https://www.omdbapi.com/#examples`;

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        if (data.Response === 'True') {
          setMovies(data.Search);
          setError(null);
        } else {
          setMovies([]);
          setError(data.Error);
        }
      })
      .catch(error => {
        console.error(error);
        setError('An error occurred while fetching data.');
      });
  };

  return (
    <div className="App">
     <div className="movie-search-container">
      <input
        type="text"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder="Enter movie title"
        className="search-input"
      />
      <button onClick={handleSearch} className="search-button">
        Search
      </button>

      {error && <p className="error-message">{error}</p>}

      <div className="movie-list">
        {movies.map(movie => (
          <div key={movie.Title} className="movie-item">
            <h2>{movie.Title}</h2>
            <img src={movie.Poster} alt={`${movie.Title} Poster`} className="poster-image" />
            <p>IMDB Rating: {movie.imdbRating}</p>
            <p>Release Date: {movie.Released}</p>
            <p>Genre: {movie.Genre}</p>
            <p>Director: {movie.Director}</p>
            <p>Actors: {movie.Actors}</p>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}

export default App;
