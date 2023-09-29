import React, { useEffect, useState } from "react"
import "./home.css"
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { Link } from "react-router-dom";
import MovieList from "../../components/movieList/movieList";
import InfiniteScroll from "react-infinite-scroll-component";

const Home = () => {

    const [ popularMovies, setPopularMovies ] = useState([])
    const [page, setPage] = useState(1);
    useEffect(() => {
        fetch("https://api.themoviedb.org/3/movie/popular?api_key=7fc3bcaa6c5d6bfe92eb51a890b39747&language=en-US")
        .then(res => res.json())
        .then(data => setPopularMovies(data.results))
    }, [])

    // const fetchMoreMovies = () => {
    //     fetch(`https://api.themoviedb.org/3/movie/popular?api_key=7fc3bcaa6c5d6bfe92eb51a890b39747&language=en-US&page=${page+1}`)
    //     .then(res => res.json())
    //     .then(data => {
    //         if (data.results.length > 0) {
    //             setPopularMovies(prevMovies => [...prevMovies, ...data.results]);
    //             setPage(page + 1);
    //         }
    //     });
    // }

    return (
        <>
            <div className="poster">
                <Carousel
                    showThumbs={false}
                    autoPlay={true}
                    transitionTime={3}
                    infiniteLoop={true}
                    showStatus={false}
                >
                    {
                        popularMovies.map(movie => (
                            <Link style={{textDecoration:"none",color:"white"}} to={`/movie/${movie.id}`} >
                                <div className="posterImage">
                                    <img src={`https://image.tmdb.org/t/p/original${movie && movie.backdrop_path}`} />
                                </div>
                                <div className="posterImage__overlay">
                                    <div className="posterImage__title">{movie ? movie.original_title: ""}</div>
                                    <div className="posterImage__runtime">
                                        {movie ? movie.release_date : ""}
                                        <span className="posterImage__rating">
                                            {movie ? movie.vote_average :""}
                                            <i className="fas fa-star" />{" "}
                                        </span>
                                    </div>
                                    <div className="posterImage__description">{movie ? movie.overview : ""}</div>
                                </div>
                            </Link>
                        ))
                    }
                </Carousel>
                <MovieList />
            </div>
        </>
    )
}

export default Home