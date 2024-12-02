import React from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

function MovieDetail() {
  const location = useLocation();
  const { movie } = location.state;

  return (
    <div className="movie-detail">
      <div className="movie-detail-header">
        <h1>{movie.title}</h1>
        <div className="movie-detail-poster-container">
          <img src={movie.poster_url} alt={movie.title} className="movie-detail-poster" />
        </div>
        <div className="movie-detail-action-btn">
          <Link to="/theatrelist" state={{ movie }}>
            <button>Book Tickets</button>
          </Link>
        </div>
      </div>
      <div className="movie-detail-info">
        <div className="movie-description">
          <h2>About</h2>
          <p>{movie.descript}</p>
        </div>
        <div className="movie-detail-meta-data">
          <h2>Genre: </h2>
          <p>{movie.genre}</p>
          <h2>Director: </h2>
          <p>{movie.director}</p>
          <h2>Music Director: </h2>
          <p>{movie.musicdirector}</p>
        </div>
        <div className="movie-detail-cast">
          <h2>Cast</h2>
          <div className="movie-detail-cast-images">
            <div className="actor-container">
              <img src={movie.actor_img1} alt={movie.actor_name1} className="actor-image" />
              <p className="actor-name">{movie.actor_name1}</p>
            </div>
            <div className="actor-container">
              <img src={movie.actor_img2} alt={movie.actor_name2} className="actor-image" />
              <p className="actor-name">{movie.actor_name2}</p>
            </div>
            <div className="actor-container">
              <img src={movie.actor_img3} alt={movie.actor_name3} className="actor-image" />
              <p className="actor-name">{movie.actor_name3}</p>
            </div>
            <div className="actor-container">
              <img src={movie.actor_img4} alt={movie.actor_name4} className="actor-image" />
              <p className="actor-name">{movie.actor_name4}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;
