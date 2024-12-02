import React, { useState, useEffect } from 'react';
import { FaTrash } from 'react-icons/fa'; // Import trash icon from react-icons
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import axios from 'axios';
import './App.css';

function MovieList() {
    const [movie_info, setMovie_info] = useState([]); 
    const navigate = useNavigate(); // Initialize navigate

    // Fetch movies when the component mounts
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:3001/movielist');
            setMovie_info(response.data); // Load movies from backend
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    // Function to delete a movie from the database
    const deleteMovie = async (movieId) => {
        try {
            // Send DELETE request to the backend
            await axios.delete(`http://localhost:3001/movies/${movieId}`);
            // After deleting, fetch the updated movie list
            fetchData();
        } catch (error) {
            console.error('Error deleting movie:', error);
        }
    };

    // Function to navigate to the update movie page
    const handleUpdate = (movieId) => {
        navigate(`/update-movie/${movieId}`); // Navigate to the update movie page with movie ID
    };

    return (
        <div>
            <h1>Movie List</h1> {/* Header for the movie list */}
            
            {/* Ensure movie_info is not empty before rendering */}
            {movie_info.length > 0 ? (
                movie_info.map((movie) => (
                    <div key={movie.id} className="movie-item">
                        <h3 onClick={() => handleUpdate(movie.movie_id)} style={{ cursor: 'pointer', color: 'blue' }}>
                            {movie.title}
                        </h3>
                        <p>{movie.description}</p>
                        {/* Delete Icon */}
                        <FaTrash 
                            onClick={() => deleteMovie(movie.movie_id)} 
                            className="delete-icon" 
                            style={{ cursor: 'pointer', color: 'red' }}
                        />
                    </div>
                ))
            ) : (
                <p>Loading movies...</p> // Show a loading message until data is fetched
            )}
        </div>
    );
}

export default MovieList;
