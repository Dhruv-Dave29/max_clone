
import React from "react";
import { Link } from "react-router-dom";
import "./WatchlistItem.css";

const WatchlistItem = ({ movie, onRemove }) => {
  const handleRemoveClick = () => {
    onRemove(movie.id);
  };

  return (
    <div className="watchlist-item">
      <button className="remove-button" onClick={handleRemoveClick}>
        <i className="fas fa-trash-alt"></i>
      </button>
      <Link to={`/movie/${movie.id}`} className="watchlist-item-link">
        <img
          className="watchlist-item__poster"
          src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
          alt={movie.title}
        />
        <div className="watchlist-item__details">
          <h3 className="watchlist-item__title">{movie.original_title}</h3>
        </div>
      </Link>
    </div>
  );
};

export default WatchlistItem;
