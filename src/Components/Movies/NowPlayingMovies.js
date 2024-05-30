import React, { useEffect, useState, useCallback } from 'react';
import { GetNowPlayingMovies } from '../../Service/GetNowPlayingMovies';
import Pagination from '../Pagination';
import { BsBookmarksFill } from "react-icons/bs";
import "./Movies.css";
import MoviesInfo from './MoviesInfo';
import { GetMovieTrailer } from '../../Service/GetTrailer';

const NowPlayingMovies = () => {
    const [nowplaying, setNowplaying] = useState([]);
    const [page, setPage] = useState(1);
    const [loader, setLoader] = useState(true);
    const [watchList, setWatchList] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [trailerUrl,setTrailerUrl]=useState("");

    useEffect(() => {
        const watchListFromLocalStorage = localStorage?.getItem("movieWatchList");
        setWatchList(JSON.parse(watchListFromLocalStorage));
    }, []);

    useEffect(() => {
        GetNowPlayingMovies(page)
            .then((data) => {
                setNowplaying(data);
                setLoader(false);
            })
            .catch((err) => {
                console.log(err);
                setLoader(false);
            });
    }, [page]);

    const fetchTrailer=async(movieTile)=>{
      const url = await GetMovieTrailer(movieTile);
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

    const loadNextPageTvShows = () => {
        setPage((prevPage) => prevPage + 1);
    }

    const loadPreviousPageTvShows = useCallback(() => {
        setPage((prevPage) => Math.max(prevPage - 1, 1));
    }, []);

    const toogleWatchlist = useCallback(
      (movie) => {
        const isMovieInWatchlist = watchList?.some(
          (item) => item.id === movie.id
        );
        if (isMovieInWatchlist) {
          setWatchList((prevMoviesList) => {
            const filteredMovies =
              prevMoviesList?.length > 0 &&
              prevMoviesList.filter((m) => m.id !== movie.id);
            localStorage.setItem(
              "movieWatchList",
              JSON.stringify(filteredMovies)
            );
            return filteredMovies;
          });
        } else {
          setWatchList((prevMoviesList) => {
            const newMoviesList =
              prevMoviesList?.length > 0 ? [...prevMoviesList, movie] : [movie];
            localStorage.setItem("movieWatchList", JSON.stringify(newMoviesList));
            return newMoviesList;
          });
        }
      },
      [watchList]
    );
  
    return (
        <div>
            {loader ? (
                <div className="flex justify-center items-center h-screen">
                    <div className="loader"></div>
                </div>
            ) : (
                <>
                    <div className='bg-black'>
                        <div className='justify-center text-white text-2xl text-center'>
                            Now Playing Movies
                        </div>
                        <div className='flex flex-wrap items-center justify-center'>
                            {nowplaying && nowplaying.map((nowplay) => {
                              const isInWatchlist=watchList?.some(
                                (item)=>item.id===nowplay.id
                              );
                                return (
                                    <div
                                        key={nowplay?.id}
                                        className='w-[160px] h-[30vh] bg-center bg-cover rounded-xl m-4 hover:scale-110 duration-300 relative'
                                        style={{
                                            backgroundImage: `url(https://image.tmdb.org/t/p/original/t/p/w500/${nowplay?.poster_path})`,
                                        }}
                                        onClick={()=>handleOpenModal(nowplay)}
                                    >
                                        <div className="absolute top-5 right-1 bg-gray-900 p-2 text-xl rounded-xl bg-opacity-55">
                                           {!isInWatchlist?( <button onClick={(e)=>{e.stopPropagation(); toogleWatchlist(nowplay)}}><BsBookmarksFill style={{ color: '#e2e9e8' }} /></button>) :
                                             <button onClick={()=>{toogleWatchlist(nowplay)}}><BsBookmarksFill style={{ color: '#e9fa00' }} /></button>
                                           }
                                            
                                        </div>
                                        <div className='text-white text-center font-bold bg-gray-900 w-full bg-opacity-50'>
                                            {nowplay?.title}
                                        </div>
                                    </div>
                                )
                            })}    
                        </div>
                        <Pagination
                                onNext={loadNextPageTvShows}
                                onPrev={loadPreviousPageTvShows}
                                currPage={page}
                            />
                             {openModal && selectedMovie && (
                               <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-75 flex justify-center items-center h-screen">
                                <div className="bg-black rounded-lg shadow-lg p-8 w-full max-w-[65vw]">
                                  <MoviesInfo movie={selectedMovie} trailerUrl={trailerUrl} />
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
                </>
            )}
        </div>
    );
};

export default NowPlayingMovies;
