// import React, {useEffect, useState} from "react"
// import "./movie.css"
// import Youtube from 'react-youtube';
// import { useParams } from "react-router-dom"
// import axios from 'axios'

// const Movie = () => {
//     const [currentMovieDetail, setMovie] = useState()
//     const [currentYt, setYt] = useState()
//     const [isVideoPlaying, setIsVideoPlaying] = useState(false); // New state
//     const { id } = useParams()
//     const [watchlist, setWatchlist] = useState([]);

//     useEffect(() => {
//         getData()
//         getYt()
//         window.scrollTo(0,0)
//     }, [])
//     const list=async()=>{
//         try {
//             // Save the watchlist to MongoDB before logout
//             if (localStorage.getItem('loggedInUsername')) {
//               const watchlistData = {
//                 username: localStorage.getItem('loggedInUsername'),
//                 watchlist: localStorage.getItem("watchlist"), // You can pass your watchlist data here
//               };
//               const response = await axios.post(
//                 "http://localhost:5001/api/watchlist",
//                 watchlistData
//               );
//               if (response.status === 200) {
//                 console.log("Watchlist saved to MongoDB for user:", localStorage.getItem('loggedInUsername'));
//               } else {
//                 console.error("Error saving watchlist to MongoDB.");
//               }
//             }
//           } catch (error) {
//             console.error("Error handling logout:", error);
//           }
//     }
//     const addToWatchlist = () => {
//         // Attempt to parse the existing watchlist from localStorage
//         const existingWatchlistJSON = localStorage.getItem('watchlist');
//         let existingWatchlist = [];
//         try {
//           existingWatchlist = JSON.parse(existingWatchlistJSON) || [];
//         } catch (error) {
//           console.error("Error parsing watchlist from localStorage:", error);
//         }
//         // Check if the movie is already in the watchlist
//         if (!existingWatchlist.find(movie => movie.id === currentMovieDetail.id)) {
//           const updatedWatchlist = [...existingWatchlist, currentMovieDetail];
//           // Update the watchlist in localStorage
//           localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist));
//           list();
//           alert("Movie added to watchlist!");
//         } else {
//           alert("Movie is already in the watchlist!");
//         }
//       }
      
    
    
    

//     const getData = () => {
//         fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=7fc3bcaa6c5d6bfe92eb51a890b39747&language=en-US`)
//         .then(res => res.json())
//         .then(data => setMovie(data))
//     }

//     const getYt = () => {
//         fetch(`http://api.themoviedb.org/3/movie/${id}/videos?api_key=7fc3bcaa6c5d6bfe92eb51a890b39747`)
//         .then(res => res.json())
//         .then(data => setYt(data))
//     }

//     return (
//         <div className="movie">
//             <div className="movie__intro">
//                 <img className="movie__backdrop" src={`https://image.tmdb.org/t/p/original${currentMovieDetail ? currentMovieDetail.backdrop_path : ""}`} />
//             </div>
//             <div className="movie__detail">
//                 <div className="movie__detailLeft">
//                     <div className="movie__posterBox">
//                         <img className="movie__poster" src={`https://image.tmdb.org/t/p/original${currentMovieDetail ? currentMovieDetail.poster_path : ""}`} />
//                     </div>
//                 </div>
//                 <div className="movie__detailRight">
//                     <div className="movie__detailRightTop">
//                         <div className="movie__name">{currentMovieDetail ? currentMovieDetail.original_title : ""}</div>
//                         <div className="movie__tagline">{currentMovieDetail ? currentMovieDetail.tagline : ""}</div>
//                         <div className="movie__rating">
//                             {currentMovieDetail ? currentMovieDetail.vote_average: ""} <i class="fas fa-star" />
//                             <span className="movie__voteCount">{currentMovieDetail ? "(" + currentMovieDetail.vote_count + ") votes" : ""}</span>
//                         </div>  
//                         <div className="movie__runtime">{currentMovieDetail ? currentMovieDetail.runtime + " mins" : ""}</div>
//                         <div className="movie__releaseDate">{currentMovieDetail ? "Release date: " + currentMovieDetail.release_date : ""}</div>
//                         <div className="movie__genres">
//                             {
//                                 currentMovieDetail && currentMovieDetail.genres
//                                 ? 
//                                 currentMovieDetail.genres.map(genre => (
//                                     <><span className="movie__genre" id={genre.id}>{genre.name}</span></>
//                                 )) 
//                                 : 
//                                 ""
//                             }
//                         </div>
//                     </div>
//                     <div className="movie__detailRightBottom">
//                         <div className="synopsisText">Synopsis</div>
//                         <div>{currentMovieDetail ? currentMovieDetail.overview : ""}</div>
//                     </div>
                    
//                 </div>
//                 <button className="movie__addToWatchlistButton" onClick={addToWatchlist}>Add to watchlist</button>

//             </div>
//             <div className="movie__links">
//                 <div className="movie__video">
//                 {/* {console.log(currentYt.results[0].key)} */}
//                 {isVideoPlaying ? (
//                     <Youtube
//                                         videoId={currentYt.results[0].key}
//                                         opts={
//                                             {
//                                                 width: '1000px',
//                                                 height: '500px',
//                                                 playerVars: {
//                                                     autoplay: 1,
//                                                     controls: 0,
//                                                     cc_load_policy: 0,
//                                                     fs: 0,
//                                                     iv_load_policy: 0,
//                                                     modestbranding: 0,
//                                                     rel: 0,
//                                                     showinfo: 0,
//                                                 },
//                                             }
//                                         }
//                                     />
//                 ) : (
//                     <>
//                     <button
//                         className="movie__playButton"
//                         onClick={() => setIsVideoPlaying(true)}>
//                     <i className="fas fa-play"></i> Play video
//                     </button>
//                     </>
//                 )}
//             </div>
//                 {/* {
//                     currentMovieDetail && currentMovieDetail.imdb_id && <a href={"https://www.imdb.com/title/" + currentMovieDetail.imdb_id} target="_blank" style={{textDecoration: "none"}}><p><span className="movie__imdbButton movie__Button">IMDb<i className="newTab fas fa-external-link-alt"></i></span></p></a>
//                 } */}
//             </div>
//             <div className="movie__heading">Production companies</div>
//             <div className="movie__production">
//                 {
//                     currentMovieDetail && currentMovieDetail.production_companies && currentMovieDetail.production_companies.map(company => (
//                         <>
//                             {
//                                 company.logo_path 
//                                 && 
//                                 <span className="productionCompanyImage">
//                                     <img className="movie__productionComapany" src={"https://image.tmdb.org/t/p/original" + company.logo_path} />
//                                     <span>{company.name}</span>
//                                 </span>
//                             }
//                         </>
//                     ))
//                 }
//             </div>
//         </div>
//     )
// }

// export default Movie

import React, { useEffect, useState } from "react";
import "./movie.css";
import Youtube from 'react-youtube';
import { useParams } from "react-router-dom";
import axios from 'axios';

const Movie = () => {
  const [currentMovieDetail, setMovie] = useState();
  const [currentYt, setYt] = useState();
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    getData();
    getYt();
    // window.scrollTo(0, 0);
  }, []);

  const list = async () => {
    try {
      if (localStorage.getItem('loggedInUsername')) {
        const watchlistData = {
          username: localStorage.getItem('loggedInUsername'),
          watchlist: localStorage.getItem("watchlist"),
        };
        const response = await axios.post(
          "hhttps://strm-vdo-be.onrender.com/api/watchlist",
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
  }

  const addToWatchlist = () => {
    // Check if the user is logged in
    if (!localStorage.getItem('loggedInUsername')) {
      // User is not logged in, show an alert message
      alert("Login is required to add a movie to your watchlist.");
      return;
    }
  
    const existingWatchlistJSON = localStorage.getItem('watchlist');
    let existingWatchlist = [];
    try {
      existingWatchlist = JSON.parse(existingWatchlistJSON) || [];
    } catch (error) {
      console.error("Error parsing watchlist from localStorage:", error);
    }
  
    if (!existingWatchlist.find(movie => movie.id === currentMovieDetail.id)) {
      const updatedWatchlist = [...existingWatchlist, currentMovieDetail];
      localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist));
      list();
      alert("Movie added to watchlist!");
    } else {
      alert("Movie is already in the watchlist!");
    }
  }
  

  const getData = () => {
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=7fc3bcaa6c5d6bfe92eb51a890b39747&language=en-US`)
      .then(res => res.json())
      .then(data => setMovie(data));
  }

  const getYt = () => {
    fetch(`http://api.themoviedb.org/3/movie/${id}/videos?api_key=7fc3bcaa6c5d6bfe92eb51a890b39747`)
      .then(res => res.json())
      .then(data => setYt(data));
  }

  return (
    <div className="movie">
      <div className="movie__intro">
        <img className="movie__backdrop" src={`https://image.tmdb.org/t/p/original${currentMovieDetail ? currentMovieDetail.backdrop_path : ""}`} />
      </div>
      <div className="movie__detail">
        <div className="movie__detailLeft">
          <div className="movie__posterBox">
            <img className="movie__poster" src={`https://image.tmdb.org/t/p/original${currentMovieDetail ? currentMovieDetail.poster_path : ""}`} />
          </div>
        </div>
        <div className="movie__detailRight">
          <div className="movie__detailRightTop">
            <div className="movie__name">{currentMovieDetail ? currentMovieDetail.original_title : ""}</div>
            <div className="movie__tagline">{currentMovieDetail ? currentMovieDetail.tagline : ""}</div>
            <div className="movie__rating">
              {currentMovieDetail ? currentMovieDetail.vote_average : ""} <i className="fas fa-star" />
              <span className="movie__voteCount">{currentMovieDetail ? "(" + currentMovieDetail.vote_count + ") votes" : ""}</span>
            </div>
            <div className="movie__runtime">{currentMovieDetail ? currentMovieDetail.runtime + " mins" : ""}</div>
            <div className="movie__releaseDate">{currentMovieDetail ? "Release date: " + currentMovieDetail.release_date : ""}</div>
            <div className="movie__genres">
              {
                currentMovieDetail && currentMovieDetail.genres
                  ?
                  currentMovieDetail.genres.map(genre => (
                    <><span className="movie__genre" id={genre.id}>{genre.name}</span></>
                  ))
                  :
                  ""
              }
            </div>
          </div>
          <div className="movie__detailRightBottom">
            <div className="synopsisText">Synopsis</div>
            <div>{currentMovieDetail ? currentMovieDetail.overview : ""}</div>
          </div>
        </div>
        <button className="movie__addToWatchlistButton" onClick={addToWatchlist}>Add to watchlist</button>
      </div>
      <div className="movie__links">
        <div className="movie__video">
          {currentYt && currentYt.results && currentYt.results.length > 0 && !isVideoPlaying ? (
            <>
              <button
                className="movie__playButton"
                onClick={() => setIsVideoPlaying(true)}>
                <i className="fas fa-play"></i> Play video
              </button>
            </>
          ) : null}
          {isVideoPlaying ? (
            <Youtube
              videoId={currentYt.results[0].key}
              opts={{
                width: '1000px',
                height: '500px',
                playerVars: {
                  autoplay: 1,
                  controls: 1,
                  cc_load_policy: 0,
                  fs: 0,
                  iv_load_policy: 0,
                  modestbranding: 0,
                  rel: 0,
                  showinfo: 0,
                },
              }}
              
            />
          ) : null}
        </div>
      </div>
      <div className="movie__heading">Production companies</div>
      <div className="movie__production">
        {
          currentMovieDetail && currentMovieDetail.production_companies && currentMovieDetail.production_companies.map(company => (
            <>
              {
                company.logo_path
                &&
                <span className="productionCompanyImage">
                  <img className="movie__productionComapany" src={"https://image.tmdb.org/t/p/original" + company.logo_path} />
                  <span>{company.name}</span>
                </span>
              }
            </>
          ))
        }
      </div>
    </div>
  );
}

export default Movie;
