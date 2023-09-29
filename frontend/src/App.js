
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Header from './components/header/Header';
import Home from './pages/home/home';
import MovieList from './components/movieList/movieList';
import Movie from './pages/movieDetail/movie';
import WatchlistPage from './components/WatchlistPage'; // Import the WatchlistPage component
import Option from './components/login_signup/option'
import Login from './components/login_signup/login'
import Signup from './components/login_signup/signup'
import SearchMovie from './components/searchMovies';

function App() {
  return (
    <div className="App">
        <Router>
          <Header />
            <Routes>
                <Route index element={<Home />}></Route>
                <Route path="/movie/:id" element={<Movie />}></Route>
                <Route path="/movies/:type" element={<MovieList />}></Route>
                <Route path="/watchlist" element={<WatchlistPage />}></Route>
                <Route path="/option" element={<Option />}></Route>
                <Route path="/search" element={<SearchMovie />}></Route>
                
                <Route path="/login" element={<Login />}></Route>
                <Route path="/signup" element={<Signup />}></Route>
            </Routes>
        </Router>
    </div>
  );
}

export default App;

