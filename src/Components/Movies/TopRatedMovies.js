// import React, { useEffect, useState } from 'react';
// import { GetTopRatedMovies } from '../../Service/GetTopRatedMovies';
// import Pagination from '../Pagination';
// import { BsBookmarksFill } from "react-icons/bs";

// const TopRatedMovies = () => {
//     const[ratedmovies,setRatedMovies]=useState([]);
//     const[page,setPage]=useState(1);

//     useEffect(()=>{
//         GetTopRatedMovies(page)
//           .then((data)=>{
//             setRatedMovies(data);
//           })
//           .catch((err)=>{
//             console.error(err);
//           })
//     },[page]);

//   return (
//     <div className='bg-black'>
//         <div className='text-white justify-center text-2xl text-center'>
//             Top Rated Movies
//         </div>
//         <div className='flex flex-wrap items-center justify-center'>
//             {ratedmovies && ratedmovies?.map((topmovie)=>{
//                 return(
//                     <div
//                     key={topmovie?.id}
//                     className='w-[160px] h-[30vh] bg-center bg-cover rounded-xl m-4 hover:scale-110 duration-300 relative'
//                     style={{
//                         backgroundImage: `url(https://image.tmdb.org/t/p/original/t/p/w500/${topmovie?.poster_path})`,
//                       }}
//                     >
//                         <div className="absolute top-5 right-1 bg-gray-900 p-2 text-xl rounded-xl bg-opacity-55">
//                          <button><BsBookmarksFill style={{color: '#e2e9e8',}}/></button>
//                          <button><BsBookmarksFill style={{color: '#e9fa00',}}/></button>
//                      </div>
//                      <div className='text-white text-center font-bold bg-gray-900 w-full bg-opacity-50'>
//                          {topmovie?.title}
//                      </div> 
//                     </div>
//                 )
//             })}
//         </div>
//     </div>
    
//   )
// }

// export default TopRatedMovies


import React, { useEffect, useState, useCallback } from 'react';
import { GetTopRatedMovies } from '../../Service/GetTopRatedMovies';
import Pagination from '../Pagination';
import { BsBookmarksFill } from "react-icons/bs";
import MoviesInfo from './MoviesInfo'; // Import MoviesInfo component for modal display
import { GetMovieTrailer } from '../../Service/GetTrailer';

const TopRatedMovies = () => {
    const [ratedMovies, setRatedMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [watchList, setWatchList] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [trailerUrl, setTrailerUrl]=useState("");

    useEffect(() => {
        const watchListFromLocalStorage = localStorage?.getItem("movieWatchList");
        if (watchListFromLocalStorage) {
            setWatchList(JSON.parse(watchListFromLocalStorage));
        }
    }, []);

    useEffect(() => {
        GetTopRatedMovies(page)
            .then((data) => {
                setRatedMovies(data);
            })
            .catch((err) => {
                console.error(err);
            });
    }, [page]);

    const fetchTrailer=async(movieTitle)=>{
        const url= await GetMovieTrailer(movieTitle);
        console.log(url);
        setTrailerUrl(url);
    }

    const handleOpenModal = useCallback((movie) => {
        setSelectedMovie(movie);
        fetchTrailer(movie.title || movie.name);
        setOpenModal(true);
    }, []);

    const handleCloseModal = useCallback(() => {
        setSelectedMovie(null);
        setTrailerUrl("");
        setOpenModal(false);
    }, []);

    const toggleWatchlist = useCallback((movie) => {
        const isMovieInWatchlist = watchList.some((item) => item.id === movie.id);
        if (isMovieInWatchlist) {
            setWatchList((prevMoviesList) => {
                const filteredMovies = prevMoviesList?.length > 0 && prevMoviesList.filter((m) => m.id !== movie.id);
                localStorage.setItem("movieWatchList", JSON.stringify(filteredMovies));
                return filteredMovies;
            });
        } else {
            setWatchList((prevMoviesList) => {
                const newMoviesList = prevMoviesList?.length > 0 ? [...prevMoviesList, movie] : [movie];
                localStorage.setItem("movieWatchList", JSON.stringify(newMoviesList));
                return newMoviesList;
            });
        }
    }, [watchList]);

    const loadNextPageMovies = useCallback(() => {
        setPage((prevPage) => prevPage + 1);
    }, []);

    const loadPreviousPageMovies = useCallback(() => {
        if (page > 1) {
            setPage((prevPage) => prevPage - 1);
        }
    }, [page]);

    return (
        <div className='bg-black'>
            <div className='text-white justify-center text-2xl text-center'>
                Top Rated Movies
            </div>
            <div className='flex flex-wrap items-center justify-center'>
                {ratedMovies && ratedMovies.map((topMovie) => {
                    const isInWatchlist = watchList.some((item) => item.id === topMovie.id);
                    return (
                        <div
                            key={topMovie.id}
                            className='w-[160px] h-[30vh] bg-center bg-cover rounded-xl m-4 hover:scale-110 duration-300 relative'
                            style={{
                                backgroundImage: `url(https://image.tmdb.org/t/p/original${topMovie.poster_path})`,
                            }}
                            onClick={() => handleOpenModal(topMovie)}
                        >
                            <div className="absolute top-5 right-1 bg-gray-900 p-2 text-xl rounded-xl bg-opacity-55">
                                {!isInWatchlist ? (
                                    <button onClick={(e) => {
                                        e.stopPropagation();
                                        toggleWatchlist(topMovie);
                                    }}>
                                        <BsBookmarksFill style={{ color: '#e2e9e8' }} />
                                    </button>
                                ) : (
                                    <button onClick={() => {
                                        toggleWatchlist(topMovie);
                                    }}>
                                        <BsBookmarksFill style={{ color: '#e9fa00' }} />
                                    </button>
                                )}
                            </div>
                            <div className='text-white text-center font-bold bg-gray-900 w-full bg-opacity-50'>
                                {topMovie.title}
                            </div>
                        </div>
                    );
                })}
            </div>
            <Pagination
                onNext={loadNextPageMovies}
                onPrev={loadPreviousPageMovies}
                currPage={page}
            />
            {openModal && selectedMovie && (
                <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-75 flex justify-center items-center h-screen">
                    <div className="bg-black rounded-lg shadow-lg p-8 w-full max-w-[65vw]">
                        <MoviesInfo movie={selectedMovie} trailerUrl={trailerUrl}/>
                      <div className='flex justify-center'>
                      <button
                            onClick={handleCloseModal}
                            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Close
                        </button>
                      </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default TopRatedMovies;

