import "../css/MediaCard.css"
import { useMovieContext } from "../contexts/MovieContext"
import { useState } from "react"
import DetailModal from "./DetailModal"
import { useLocation } from "react-router-dom"

function MediaCard({item}) {
    const {isFavorite, addToFavorites, removeFromFavorites, getRating} = useMovieContext()
    const location = useLocation()
    const favorite = isFavorite(item.id)
    const [showModal, setShowModal] = useState(false)
    const userRating = getRating(item.id)
    const isOnFavoritesPage = location.pathname === '/favorites'

    function onFavoriteClick(e) {
        e.preventDefault()
        setShowModal(true)
    }

    const getTitle = () => {
        return item.title || item.name || 'Unknown Title'
    }

    const getReleaseDate = () => {
        const date = item.release_date || item.first_air_date
        return date ? date.split("-")[0] : 'N/A'
    }

    const getImagePath = () => {
        if (item.media_type === 'person' || item.known_for_department) {
            return item.profile_path ? `https://image.tmdb.org/t/p/w500${item.profile_path}` : 'https://via.placeholder.com/300x450/333/fff?text=No+Image'
        }
        return item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : 'https://via.placeholder.com/300x450/333/fff?text=No+Image'
    }

    const getMediaType = () => {
        if (item.media_type) return item.media_type
        if (item.title) return 'movie'
        if (item.name && item.first_air_date) return 'tv'
        if (item.known_for_department) return 'person'
        return 'unknown'
    }

    const getSubtitle = () => {
        const mediaType = getMediaType()
        if (mediaType === 'person') {
            return item.known_for_department || 'Actor'
        }
        if (mediaType === 'tv') {
            return `TV Series • ${getReleaseDate()}`
        }
        return `Movie • ${getReleaseDate()}`
    }

    const isPerson = getMediaType() === 'person'

    const getTMDBRating = () => {
        if (isPerson || !item.vote_average) return null
        return (item.vote_average / 2).toFixed(1)
    }

    return (
        <>
            <div className="media-card">
                <div className="media-poster">
                    <img src={getImagePath()} alt={getTitle()}/>
                    <div className="media-overlay">
                        {!isPerson && (
                            <button className={`favorite-btn ${favorite ? "active" : ""}`} onClick={onFavoriteClick}>
                                ♥
                            </button>
                        )}
                        <div className="media-type-badge">
                            {getMediaType().toUpperCase()}
                        </div>
                    </div>
                </div>
                <div className="media-info">
                    <h3>{getTitle()}</h3>
                    <p>{getSubtitle()}</p>
                    {!isPerson && isOnFavoritesPage && userRating > 0 && (
                        <div className="rating-display user-rating">
                            <span className="rating-label">Your Rating:</span>
                            <span className="rating-value">★ {userRating}/5</span>
                        </div>
                    )}
                    {!isPerson && !isOnFavoritesPage && getTMDBRating() && (
                        <div className="rating-display tmdb-rating">
                            <span className="rating-label">TMDB:</span>
                            <span className="rating-value">★ {getTMDBRating()}/5</span>
                        </div>
                    )}
                    {isPerson && item.known_for && item.known_for.length > 0 && (
                        <p className="known-for">
                            Known for: {item.known_for.slice(0, 2).map(work => work.title || work.name).join(', ')}
                        </p>
                    )}
                </div>
            </div>
            
            <DetailModal 
                item={item}
                isOpen={showModal}
                onClose={() => setShowModal(false)}
            />
        </>
    )
}

export default MediaCard