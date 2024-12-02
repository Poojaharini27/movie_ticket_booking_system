import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './App.css';

function Main() {
  const [movie_info, setMovie_info] = useState([]); // All movies from the backend
  const [filteredMovies, setFilteredMovies] = useState([]); // Filtered list of movies
  const [genreFilter, setGenreFilter] = useState(''); // Current genre filter
  const [languageFilter, setLanguageFilter] = useState(''); // Current language filter
  const [timeFilter, setTimeFilter] = useState(''); // Current time filter (last 15, 30, 60 days)
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const navigate = useNavigate();

  // Fetch movies when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  // Update the filtered movies whenever any of the filters change
  useEffect(() => {
    let filtered = movie_info;

    if (genreFilter) {
      filtered = filtered.filter(
        (movie) => movie.genre.toLowerCase() === genreFilter.toLowerCase()
      );
    }

    if (languageFilter) {
      filtered = filtered.filter(
        (movie) => movie.language.toLowerCase() === languageFilter.toLowerCase()
      );
    }

    if (timeFilter) {
      const currentDate = new Date();
      const timeThreshold = new Date();
      switch (timeFilter) {
        case 'last15':
          timeThreshold.setDate(currentDate.getDate() - 15);
          break;
        case 'last30':
          timeThreshold.setDate(currentDate.getDate() - 30);
          break;
        case 'last60':
          timeThreshold.setDate(currentDate.getDate() - 60);
          break;
        default:
          break;
      }
      filtered = filtered.filter((movie) => new Date(movie.release_date) >= timeThreshold);
    }

    setFilteredMovies(filtered);
  }, [movie_info, genreFilter, languageFilter, timeFilter]);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/');
      setMovie_info(response.data); // Load movies from backend
      setFilteredMovies(response.data); // Default to show all movies
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleMovieClick = (movie) => {
    navigate('/moviedetail', { state: { movie } });
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <div className="main">
      <header>
        <h1 className="main-title">BookNWatch</h1>
        <button className="main-auth-btn">
          {user ? (
            <div>
              <Link to ='/profile'><span>{user.name}</span></Link>
              <button onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <Link to="/signup">Signup/Signin</Link>
          )}
        </button>
      </header>

      {/* Filters */}
      <div className="main-filters">
        <label htmlFor="genreFilter">Genre:</label>
        <select
          id="genreFilter"
          value={genreFilter}
          onChange={(e) => setGenreFilter(e.target.value)}
        >
          <option value="">All Genres</option>
          <option value="Action">Action</option>
          <option value="Comedy">Comedy</option>
          <option value="Drama">Drama</option>
          <option value="Romance">Romance</option>
          <option value="Sci-fi">Sci-fi</option>
          <option value="Fantasy">Fantasy</option>
          <option value="Horror">Horror</option>
        </select>

        <label htmlFor="languageFilter">Language:</label>
        <select
          id="languageFilter"
          value={languageFilter}
          onChange={(e) => setLanguageFilter(e.target.value)}
        >
          <option value="">All Languages</option>
          <option value="English">English</option>
          <option value="Hindi">Hindi</option>
          <option value="Malayalam">Malayalam</option>
          <option value="Kannada">Kannada</option>
          <option value="Tamil">Tamil</option>
          <option value="Telugu">Telugu</option>
          {/* Add more languages as needed */}
        </select>

        <label htmlFor="timeFilter">Release Time:</label>
        <select
          id="timeFilter"
          value={timeFilter}
          onChange={(e) => setTimeFilter(e.target.value)}
        >
          <option value="">All Time</option>
          <option value="last15">Last 15 Days</option>
          <option value="last30">Last 30 Days</option>
          <option value="last60">Last 60 Days</option>
        </select>
      </div>

      {/* Movie List */}
      <div className="main-movie-container">
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie, index) => (
            <div
              key={index}
              className="main-movie-block"
              onClick={() => handleMovieClick(movie)}
            >
              <img src={movie.poster_url} alt={movie.title} className="main-movie-poster" />
              <div className="main-movie-details">
                <h3>{movie.title}</h3>
                <p>Genre: {movie.genre}</p>
                <p>Language: {movie.language}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No movies available for the selected filters.</p>
        )}
      </div>
    </div>
  );
}

export default Main;
