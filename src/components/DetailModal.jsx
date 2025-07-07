import { useState, useEffect } from 'react';
import { useMovieContext } from '../contexts/MovieContext';
import '../css/DetailModal.css';

function DetailModal({ item, isOpen, onClose }) {
  const { addToFavorites, removeFromFavorites, isFavorite, updateRating, getRating } = useMovieContext();
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);

  useEffect(() => {
    if (item) {
      const existingRating = getRating(item.id);
      setRating(existingRating || 0);
    }
  }, [item, getRating]);

  if (!isOpen || !item) return null;

  const getTitle = () => {
    return item.title || item.name || 'Unknown Title';
  };

  const getDescription = () => {
    return item.overview || 'No description available.';
  };

  const getReleaseDate = () => {
    const date = item.release_date || item.first_air_date;
    return date ? new Date(date).getFullYear() : 'N/A';
  };

  const getImagePath = () => {
    if (item.media_type === 'person' || item.known_for_department) {
      return item.profile_path ? `https://image.tmdb.org/t/p/w500${item.profile_path}` : 'https://via.placeholder.com/300x450/333/fff?text=No+Image';
    }
    return item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : 'https://via.placeholder.com/300x450/333/fff?text=No+Image';
  };

  const getMediaType = () => {
    if (item.media_type) return item.media_type;
    if (item.title) return 'movie';
    if (item.name && item.first_air_date) return 'tv';
    if (item.known_for_department) return 'person';
    return 'unknown';
  };

  const isPerson = getMediaType() === 'person';
  const favorite = isFavorite(item.id);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
    updateRating(item.id, newRating);
  };

  const handleFavoriteToggle = () => {
    if (favorite) {
      removeFromFavorites(item.id);
    } else {
      addToFavorites(item);
    }
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const halfValue = i - 0.5;
      const isFullActive = rating >= i;
      const isHalfActive = rating >= halfValue && rating < i;
      const isFullHovered = hoveredRating >= i;
      const isHalfHovered = hoveredRating >= halfValue && hoveredRating < i;
      
      stars.push(
        <div key={i} className="star-container">
          <button
            className={`star-half ${isHalfActive || isHalfHovered ? 'active' : ''}`}
            onClick={() => handleRatingChange(halfValue)}
            onMouseEnter={() => setHoveredRating(halfValue)}
            onMouseLeave={() => setHoveredRating(0)}
            aria-label={`Rate ${halfValue} stars`}
          />
          <button
            className={`star-full ${isFullActive || isFullHovered ? 'active' : ''}`}
            onClick={() => handleRatingChange(i)}
            onMouseEnter={() => setHoveredRating(i)}
            onMouseLeave={() => setHoveredRating(0)}
            aria-label={`Rate ${i} stars`}
          />
          <span className="star-icon">★</span>
        </div>
      );
    }
    return stars;
  };

  const getVoteAverage = () => {
    return item.vote_average ? (item.vote_average / 2).toFixed(1) : 'N/A';
  };

  const getPopularity = () => {
    return item.popularity ? Math.round(item.popularity) : 'N/A';
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <span>×</span>
        </button>
        
        <div className="modal-body">
          <div className="modal-image-section">
            <div className="modal-image">
              <img src={getImagePath()} alt={getTitle()} />
              <div className="modal-media-type">
                {getMediaType().toUpperCase()}
              </div>
            </div>
            
            {!isPerson && (
              <div className="modal-stats">
                <div className="stat-item">
                  <span className="stat-label">TMDB Rating</span>
                  <span className="stat-value">{getVoteAverage()}/5</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Popularity</span>
                  <span className="stat-value">{getPopularity()}</span>
                </div>
              </div>
            )}
          </div>
          
          <div className="modal-info">
            <div className="modal-header">
              <h2>{getTitle()}</h2>
              <p className="modal-year">{getReleaseDate()}</p>
            </div>
            
            <div className="modal-description">
              <h3>Overview</h3>
              <p>{getDescription()}</p>
            </div>

            {isPerson && item.known_for && item.known_for.length > 0 && (
              <div className="modal-known-for">
                <h3>Known For</h3>
                <div className="known-for-list">
                  {item.known_for.slice(0, 3).map((work, index) => (
                    <span key={index} className="known-for-item">
                      {work.title || work.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {!isPerson && (
              <div className="modal-rating-section">
                <h3>Your Rating</h3>
                <div className="star-rating-container">
                  <div className="custom-star-rating">
                    {renderStars()}
                  </div>
                  <span className="rating-text">
                    {rating > 0 ? `${rating}/5 stars` : 'Click to rate'}
                  </span>
                </div>
              </div>
            )}

            <div className="modal-actions">
              {!isPerson && (
                <button 
                  className={`favorite-action-btn ${favorite ? 'remove' : 'add'}`}
                  onClick={handleFavoriteToggle}
                >
                  <span className="btn-icon">
                    {favorite ? '💔' : '❤️'}
                  </span>
                  <span className="btn-text">
                    {favorite ? 'Remove from Favorites' : 'Add to Favorites'}
                  </span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailModal;