import {createContext, useState, useContext, useEffect} from "react"

const MovieContext = createContext()

export const useMovieContext = () => useContext(MovieContext)

export const MovieProvider = ({children}) => {
    const [favorites, setFavorites] = useState([])
    const [ratings, setRatings] = useState({})

    useEffect(() => {
        const storedFavs = localStorage.getItem("favorites")
        const storedRatings = localStorage.getItem("ratings")

        if (storedFavs) setFavorites(JSON.parse(storedFavs))
        if (storedRatings) setRatings(JSON.parse(storedRatings))
    }, [])

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites))
    }, [favorites])

    useEffect(() => {
        localStorage.setItem('ratings', JSON.stringify(ratings))
    }, [ratings])

    const addToFavorites = (movie) => {
        setFavorites(prev => [...prev, {...movie, favoriteType: movie.media_type || (movie.title ? 'movie' : 'tv')}])
    }

    const removeFromFavorites = (movieId) => {
        setFavorites(prev => prev.filter(movie => movie.id !== movieId))
        // Clear the rating when removing from favorites
        setRatings(prev => {
            const newRatings = { ...prev }
            delete newRatings[movieId]
            return newRatings
        })
    }
    
    const isFavorite = (movieId) => {
        return favorites.some(movie => movie.id === movieId)
    }

    const updateRating = (movieId, rating) => {
        setRatings(prev => ({
            ...prev,
            [movieId]: rating
        }))
    }

    const getRating = (movieId) => {
        return ratings[movieId] || 0
    }

    const value = {
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
        updateRating,
        getRating
    }

    return <MovieContext.Provider value={value}>
        {children}
    </MovieContext.Provider>
}