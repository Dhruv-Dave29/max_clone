// import React from "react";
// import "./Header.css";
// import { Link } from "react-router-dom";

// // Create a function to fetch the username from local storage
// function getLoggedInUsername() {
//   return localStorage.getItem("loggedInUsername");
// }
// const username = getLoggedInUsername();
// console.log(username);
// const Header = () => {
//   // Fetch the username from local storage
//   // Function to handle logout
//   const handleLogout =  () => {
//     localStorage.removeItem("loggedInUsername");
//     localStorage.removeItem("watchlist");
//     // Reload the window
//     window.location.reload();
//   };
//   return (
//     <div className="header">
//       <div className="headerLeft">
//         <Link to="/">
//           <img
//             className="header__icon"
//             src="https://i0.wp.com/moddroid.work/wp-content/uploads/2022/11/hbo-max-stream-tv-amp-movies.png?fit=512%2C512&ssl=1"
//             alt="IMDb Logo"
//           />
//         </Link>
//         <Link to="/movies/popular" style={{ textDecoration: "none" }}>
//           <span>Popular</span>
//         </Link>
//         <Link to="/movies/top_rated" style={{ textDecoration: "none" }}>
//           <span>Top Rated</span>
//         </Link>
//         <Link to="/movies/upcoming" style={{ textDecoration: "none" }}>
//           <span>Upcoming</span>
//         </Link>
//         {/* Link to the Watchlist page */}
//         <Link to="/watchlist" style={{ textDecoration: "none" }}>
//           <span>Watchlist</span>
//         </Link>
//         <Link to="/search" style={{ textDecoration: "none" }}>
//           <span>Search</span>
//         </Link>
//       </div>
//       <div className="headerRight">
//         {username ? (
//           // If the user is logged in, display the username and logout button
//           <>
//             <span
//               className="header__username"
//               style={{
//                 fontSize: "20px",
//                 color: "white",
//               }}
//             >
//               {username}&nbsp;
//             </span>

//             <button
//               className="header__logout"
//               onClick={handleLogout}
//               style={{
//                 backgroundColor: "red",
//                 color: "white",
//                 fontSize: "16px", // You can adjust the font size as needed
//                 padding: "10px 20px", // You can adjust the padding as needed
//                 border: "none", // Remove the border
//                 cursor: "pointer", // Add a pointer cursor for hover effect
//               }}
//             >
//               Logout
//             </button>
//           </>
//         ) : (
//           // If the user is not logged in, display the Login/Signup link
//           <Link to="/option" style={{ textDecoration: "none" }}>
//             <span
//               className="header__login"
//               style={{
//                 backgroundColor: "green",
//                 color: "white",
//                 padding: "5px 10px", // Adjust padding as needed
//                 margin: "-10px",
//                 borderRadius: "5px", // Adjust border radius as needed
//                 cursor: "pointer", // Add cursor style for a button
//               }}
//             >
//               Login/Signup
//             </span>
//           </Link>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Header;



import React, { useState, useEffect } from "react";
import "./Header.css";
import { Link } from "react-router-dom";

const Header = () => {
  // Create a state variable to track login status
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Function to fetch the username from local storage
  function getLoggedInUsername() {
    return localStorage.getItem("loggedInUsername");
  }

  useEffect(() => {
    // Check if the user is logged in
    const username = getLoggedInUsername();
    setIsLoggedIn(!!username); // Set isLoggedIn to true if username is not null
  }, []);

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem("loggedInUsername");
    localStorage.removeItem("watchlist");
    setIsLoggedIn(false); // Set login status to false
    // Reload the window
    window.location.reload();
  };

  return (
    <div className="header">
      <div className="headerLeft">
        <Link to="/">
          <img
            className="header__icon"
            src="https://i0.wp.com/moddroid.work/wp-content/uploads/2022/11/hbo-max-stream-tv-amp-movies.png?fit=512%2C512&ssl=1"
            alt="IMDb Logo"
          />
        </Link>
        <Link to="/movies/popular" style={{ textDecoration: "none" }}>
          <span>Popular</span>
        </Link>
        <Link to="/movies/top_rated" style={{ textDecoration: "none" }}>
          <span>Top Rated</span>
        </Link>
        <Link to="/movies/upcoming" style={{ textDecoration: "none" }}>
          <span>Upcoming</span>
        </Link>
        {/* Conditional rendering of the "Watchlist" link */}
        {isLoggedIn && (
          <Link to="/watchlist" style={{ textDecoration: "none" }}>
            <span>Watchlist</span>
          </Link>
        )}
        <Link to="/search" style={{ textDecoration: "none" }}>
          <span>Search Movie</span>
        </Link>
      </div>
      <div className="headerRight">
        {isLoggedIn ? (
          // If the user is logged in, display the username and logout button
          <>
            <span
              className="header__username"
              style={{
                fontSize: "20px",
                color: "white",
              }}
            >
              {getLoggedInUsername()}&nbsp;
            </span>

            <button
              className="header__logout"
              onClick={handleLogout}
              style={{
                backgroundColor: "red",
                color: "white",
                fontSize: "16px", // You can adjust the font size as needed
                padding: "10px 20px", // You can adjust the padding as needed
                border: "none", // Remove the border
                cursor: "pointer", // Add a pointer cursor for hover effect
              }}
            >
              Logout
            </button>
          </>
        ) : (
          // If the user is not logged in, display the Login/Signup link
          <Link to="/option" style={{ textDecoration: "none" }}>
            <span
              className="header__login"
              style={{
                backgroundColor: "green",
                color: "white",
                padding: "5px 10px", // Adjust padding as needed
                margin: "-10px",
                borderRadius: "5px", // Adjust border radius as needed
                cursor: "pointer", // Add cursor style for a button
              }}
            >
              Login/Signup
            </span>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
