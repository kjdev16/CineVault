import MediaCard from "../components/MediaCard";
import { useState, useEffect } from "react";
import { searchMulti, getTrending, getPopularMovies, getPopularTVShows, getPopularPeople } from "../services/api";
import "../css/Home.css";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isSearching, setIsSearching] = useState(false);
  const [activeCategory, setActiveCategory] = useState('trending');

  useEffect(() => {
    loadContent();
  }, [activeCategory]);

  const loadContent = async (page = 1) => {
    setLoading(true);
    try {
      let data;
      switch (activeCategory) {
        case 'movies':
          data = await getPopularMovies(page);
          break;
        case 'tv':
          data = await getPopularTVShows(page);
          break;
        case 'people':
          data = await getPopularPeople(page);
          break;
        default:
          data = await getTrending('all', 'week', page);
      }
      
      if (page === 1) {
        setItems(data.results);
      } else {
        setItems(prev => [...prev, ...data.results]);
      }
      
      setTotalPages(data.totalPages);
      setCurrentPage(data.currentPage);
      setError(null);
    } catch (err) {
      console.log(err);
      setError("Failed to load content...");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    if (loading) return;

    setLoading(true);
    setIsSearching(true);
    setCurrentPage(1);
    try {
      const data = await searchMulti(searchQuery, 1);
      setItems(data.results);
      setTotalPages(data.totalPages);
      setCurrentPage(data.currentPage);
      setError(null);
    } catch (err) {
      console.log(err);
      setError("Failed to search...");
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = async () => {
    if (loading || currentPage >= totalPages) return;

    setLoading(true);
    try {
      const nextPage = currentPage + 1;
      let data;
      
      if (isSearching && searchQuery.trim()) {
        data = await searchMulti(searchQuery, nextPage);
      } else {
        switch (activeCategory) {
          case 'movies':
            data = await getPopularMovies(nextPage);
            break;
          case 'tv':
            data = await getPopularTVShows(nextPage);
            break;
          case 'people':
            data = await getPopularPeople(nextPage);
            break;
          default:
            data = await getTrending('all', 'week', nextPage);
        }
      }
      
      setItems(prev => [...prev, ...data.results]);
      setCurrentPage(data.currentPage);
      setError(null);
    } catch (err) {
      console.log(err);
      setError("Failed to load more content...");
    } finally {
      setLoading(false);
    }
  };

  const resetToCategory = async () => {
    setSearchQuery("");
    setIsSearching(false);
    setCurrentPage(1);
    await loadContent(1);
  };

  const handleCategoryChange = (category) => {
    if (category === activeCategory && !isSearching) return;
    
    setActiveCategory(category);
    setIsSearching(false);
    setSearchQuery("");
    setCurrentPage(1);
  };

  const getCategoryTitle = () => {
    if (isSearching && searchQuery) {
      return `Search results for "${searchQuery}"`;
    }
    
    switch (activeCategory) {
      case 'movies':
        return 'Popular Movies';
      case 'tv':
        return 'Popular TV Shows';
      case 'people':
        return 'Popular People';
      default:
        return 'Trending This Week';
    }
  };

  return (
    <div className="home">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search movies, TV shows, people..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      <div className="category-tabs">
        <button 
          className={`category-tab ${activeCategory === 'trending' && !isSearching ? 'active' : ''}`}
          onClick={() => handleCategoryChange('trending')}
        >
          🔥 Trending
        </button>
        <button 
          className={`category-tab ${activeCategory === 'movies' && !isSearching ? 'active' : ''}`}
          onClick={() => handleCategoryChange('movies')}
        >
          🎬 Movies
        </button>
        <button 
          className={`category-tab ${activeCategory === 'tv' && !isSearching ? 'active' : ''}`}
          onClick={() => handleCategoryChange('tv')}
        >
          📺 TV Shows
        </button>
        <button 
          className={`category-tab ${activeCategory === 'people' && !isSearching ? 'active' : ''}`}
          onClick={() => handleCategoryChange('people')}
        >
          👤 People
        </button>
      </div>

      <div className="content-header">
        <h2>{getCategoryTitle()}</h2>
        {isSearching && (
          <button 
            onClick={resetToCategory}
            className="back-button"
          >
            ← Back to {activeCategory === 'trending' ? 'Trending' : activeCategory === 'movies' ? 'Movies' : activeCategory === 'tv' ? 'TV Shows' : 'People'}
          </button>
        )}
      </div>

      {error && <div className="error-message">{error}</div>}

      {loading && items.length === 0 ? (
        <div className="loading">Loading...</div>
      ) : (
        <>
          <div className="movies-grid">
            {items.map((item) => (
              <MediaCard item={item} key={`${item.id}-${item.media_type || 'unknown'}`} />
            ))}
          </div>
          
          {currentPage < totalPages && (
            <div className="load-more-container">
              <button 
                onClick={handleLoadMore} 
                className="load-more-btn"
                disabled={loading}
              >
                {loading ? 'Loading...' : 'Load More'}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Home;