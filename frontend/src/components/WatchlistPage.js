import React, { useState, useEffect } from "react";
import WatchlistItem from "./WatchlistItem";
import "./WatchlistPage.css";
import axios from 'axios';
var f=0
const setwatchlist=async ()=>{
  try {
    // Send a login request to the server
    const data1 = await axios.post("https://strm-vdo-be.onrender.com/api/getwatchlist", {
      username: localStorage.getItem('loggedInUsername')
    });
    localStorage.setItem('watchlist', data1.data.watchlist);
    // Use setTimeout to reload the window after a short delay (e.g., 1 second) 
    }
    catch (error) {
    console.log("error");
    }
  }
const WatchlistPage = () => {
  if(f===0){
  setwatchlist();
  f=1
  }
  // Retrieve the watchlist from localStorage
  const storedWatchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
  const [watchlist, setWatchlist] = useState(storedWatchlist);
  // Retrieve the username from localStorage (or from your authentication state)
  // Function to remove a movie from the watchlist
  const handleRemoveMovie = async(movieId) => {
    const updatedWatchlist = watchlist.filter((movie) => movie.id !== movieId);
    setWatchlist(updatedWatchlist);
    // Update localStorage to reflect the changes
    localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));
    try {
      // Save the watchlist to MongoDB before logout
      if (localStorage.getItem('loggedInUsername')) {
        const watchlistData = {
          username: localStorage.getItem('loggedInUsername'),
          watchlist: localStorage.getItem("watchlist"), // You can pass your watchlist data here
        };
        const response = await axios.post(
          "https://strm-vdo-be.onrender.com/api/watchlist",
          watchlistData
        );
        if (response.status === 200) {
          console.log("Watchlist saved to MongoDB for user:", localStorage.getItem('loggedInUsername'));
        } else {
          console.error("Error saving watchlist to MongoDB.");
        }
      }
    } catch (error) {
      console.error("Error handling logout:", error);
    }
  };

  // Save the updated watchlist with the username in localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  // Calculate the number of columns (4 in this case)
  const numColumns = 4;

  // Calculate the number of rows based on the number of movies and columns
  const numRows = Math.ceil(watchlist.length / numColumns);

  // Create an array of movie groupings (column-wise)
  const movieGroups = Array.from({ length: numRows }, (_, rowIndex) => {
    return watchlist.slice(rowIndex * numColumns, (rowIndex + 1) * numColumns);
  });
  return (
    <div>
      <h2 style={{ fontSize: "1.75rem", margin: "2.5rem", textAlign: "center" }}>
        My Watchlist
      </h2>
      <div className="watchlist-container">
        {Array.from({ length: numColumns }, (_, colIndex) => (
          <div key={colIndex} className="watchlist-column">
            {movieGroups.map((group, rowIndex) => {
              const movie = group[colIndex];
              return movie ? (
                <WatchlistItem
                  key={movie.id}
                  movie={movie}
                  onRemove={handleRemoveMovie}
                />
              ) : null;
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WatchlistPage;