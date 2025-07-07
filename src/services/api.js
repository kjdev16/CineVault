const API_KEY = import.meta.env.VITE_APP_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export const getPopularMovies = async (page = 1) => {
  try {
    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return {
      results: data.results || [],
      totalPages: data.total_pages || 1,
      currentPage: data.page || 1
    };
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    return {
      results: [],
      totalPages: 1,
      currentPage: 1
    };
  }
};

export const getPopularTVShows = async (page = 1) => {
  try {
    const response = await fetch(`${BASE_URL}/tv/popular?api_key=${API_KEY}&page=${page}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return {
      results: data.results || [],
      totalPages: data.total_pages || 1,
      currentPage: data.page || 1
    };
  } catch (error) {
    console.error('Error fetching popular TV shows:', error);
    return {
      results: [],
      totalPages: 1,
      currentPage: 1
    };
  }
};

export const getPopularPeople = async (page = 1) => {
  try {
    const response = await fetch(`${BASE_URL}/person/popular?api_key=${API_KEY}&page=${page}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return {
      results: data.results || [],
      totalPages: data.total_pages || 1,
      currentPage: data.page || 1
    };
  } catch (error) {
    console.error('Error fetching popular people:', error);
    return {
      results: [],
      totalPages: 1,
      currentPage: 1
    };
  }
};

export const searchMovies = async (query, page = 1) => {
  try {
    const response = await fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&page=${page}&query=${encodeURIComponent(
        query
      )}`
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return {
      results: data.results || [],
      totalPages: data.total_pages || 1,
      currentPage: data.page || 1
    };
  } catch (error) {
    console.error('Error searching movies:', error);
    return {
      results: [],
      totalPages: 1,
      currentPage: 1
    };
  }
};

export const searchTVShows = async (query, page = 1) => {
  try {
    const response = await fetch(
      `${BASE_URL}/search/tv?api_key=${API_KEY}&page=${page}&query=${encodeURIComponent(
        query
      )}`
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return {
      results: data.results || [],
      totalPages: data.total_pages || 1,
      currentPage: data.page || 1
    };
  } catch (error) {
    console.error('Error searching TV shows:', error);
    return {
      results: [],
      totalPages: 1,
      currentPage: 1
    };
  }
};

export const searchPeople = async (query, page = 1) => {
  try {
    const response = await fetch(
      `${BASE_URL}/search/person?api_key=${API_KEY}&page=${page}&query=${encodeURIComponent(
        query
      )}`
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return {
      results: data.results || [],
      totalPages: data.total_pages || 1,
      currentPage: data.page || 1
    };
  } catch (error) {
    console.error('Error searching people:', error);
    return {
      results: [],
      totalPages: 1,
      currentPage: 1
    };
  }
};

export const searchMulti = async (query, page = 1) => {
  try {
    const response = await fetch(
      `${BASE_URL}/search/multi?api_key=${API_KEY}&page=${page}&query=${encodeURIComponent(
        query
      )}`
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return {
      results: data.results || [],
      totalPages: data.total_pages || 1,
      currentPage: data.page || 1
    };
  } catch (error) {
    console.error('Error searching multi:', error);
    return {
      results: [],
      totalPages: 1,
      currentPage: 1
    };
  }
};

export const getTrending = async (mediaType = 'all', timeWindow = 'week', page = 1) => {
  try {
    const response = await fetch(`${BASE_URL}/trending/${mediaType}/${timeWindow}?api_key=${API_KEY}&page=${page}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return {
      results: data.results || [],
      totalPages: data.total_pages || 1,
      currentPage: data.page || 1
    };
  } catch (error) {
    console.error('Error fetching trending:', error);
    return {
      results: [],
      totalPages: 1,
      currentPage: 1
    };
  }
};