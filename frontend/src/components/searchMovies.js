import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import Cards from './card/card';
import './searchMovies.css';

const SearchMovie = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchError, setSearchError] = useState('');
  const [page, setPage] = useState(1); // Track the current page for infinite scroll
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    // Function to fetch movies from the API
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=7fc3bcaa6c5d6bfe92eb51a890b39747&language=en-US&page=${page}`
        );

        if (response.data.results.length === 0) {
          setHasMore(false);
        } else {
          setMovies((prevMovies) => [...prevMovies, ...response.data.results]);
        }
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, [page]);

  useEffect(() => {
    // Function to search for movies based on the search term
    const searchMovies = async () => {
      if (searchTerm.trim() === '') {
        setSearchResults([]);
        return;
      }

      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/movie?api_key=7fc3bcaa6c5d6bfe92eb51a890b39747&language=en-US&query=${searchTerm}`
        );

        if (response.data.results.length === 0) {
          setSearchResults([]);
          setSearchError('No results found.');
        } else {
          setSearchResults(response.data.results);
          setSearchError('');
        }
      } catch (error) {
        console.error('Error searching movies:', error);
      }
    };

    searchMovies();
  }, [searchTerm]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="movie-container">
      {<input
        type="text"
        placeholder="Search for a movie"
        value={searchTerm}
        onChange={handleSearchChange}
      />}
      {searchError && <p>{searchError}</p>}
      <InfiniteScroll
        dataLength={(searchTerm.trim() === '' ? movies : searchResults).length}
        next={() => setPage(page + 1)}
        hasMore={hasMore}
        loader={!searchError&&<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>No more movies to load.</b>
          </p>
        }
      >
        <div className="cards-container">
          {(searchTerm.trim() === '' ? movies : searchResults).map((movie) => (
            <Cards movie={movie} key={movie.id} />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default SearchMovie;
