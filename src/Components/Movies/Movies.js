import React, { useEffect,useState,useCallback } from "react";
import { GetTrendingMovies } from "../../Service/GetTrendingMovies";
import Pagination from "../Pagination";
import "./Movies.css";
import { BsBookmarksFill } from "react-icons/bs";
import MoviesInfo from "./MoviesInfo";
import { GetMovieTrailer } from "../../Service/GetTrailer";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loader, setLoader] = useState(true);
  const [watchList,setWatchList]= useState([]);
  const [openModal, setOpenModal]= useState(false);
  const [selectedMovie,setSelectedmovie]= useState(null);
  const [trailerUrl,setTrailerUrl]=useState("");


  useEffect(()=>{
    const watchListFromLocalStorage = localStorage?.getItem("movieWatchList");
    if(watchListFromLocalStorage){
      setWatchList(JSON.parse(watchListFromLocalStorage));
    }
  },[]);

  useEffect(() => {
    setLoader(true);
    GetTrendingMovies(page)
      .then((data) => {
        setMovies(data);
        setLoader(false);
      })
      .catch((err) => {
        console.error(err);
        setLoader(false);
      });
  }, [page]);
  
  useEffect(()=>{
    const fetchTrailer=async()=>{
      if(selectedMovie){
        const url= await GetMovieTrailer(selectedMovie.title || selectedMovie.name);
        setTrailerUrl(url);
      }
    }
    fetchTrailer();
  },[selectedMovie]);
 

  const handleOpenModal=useCallback((movie)=>{
    setSelectedmovie(movie);
    setTrailerUrl("");
    setOpenModal(true);
  },[])

  const handleCloseModal=useCallback(()=>{
    setSelectedmovie(null);
    setOpenModal(false);
  },[])


  const loadNextPageMovies = useCallback(() => {
    setPage((prevPage) => prevPage + 1);
  },[]);

  const loadPreviousPageMovies = useCallback(() => {
    if (page > 0) {
      setPage((prevPage) => prevPage - 1);
    }
  },[]);

  const toogleWatchlist =useCallback((movie)=>{
    const isMovieInWatchlist = watchList.some((item)=> item.id===movie.id);
    if(isMovieInWatchlist){
      setWatchList((prevMoviesList)=>{
      const filteredMovies=prevMoviesList?.length>0 && prevMoviesList.filter((m)=>m.id !== movie.id);
      localStorage.setItem("movieWatchList",JSON.stringify(filteredMovies));
      return filteredMovies;
      });
    }else{
      setWatchList((prevMoviesList) => {
        const newMoviesList=prevMoviesList?.length>0 ?[...prevMoviesList,movie] : [movie];
        localStorage.setItem("movieWatchList",JSON.stringify(newMoviesList));
        return newMoviesList;
      });
    }
  },[watchList]);

 
  return (
    <div>
      {loader ? (
        <div className="flex justify-center items-center h-screen">
          <div className="loader"></div>
        </div>
      ) : (
        <><div className="bg-black">
          <div className="text-2xl mb-8 font-bold text-center text-white">
            Trending Movies
          </div>
          <div className="flex flex-wrap items-center justify-center">
            {movies &&
              movies?.map((movie) => {
                const isInWatchlist= watchList.some(
                  (item)=>item.id===movie.id
                );
                return (
                  <div
                    key={movie?.id}
                    className="w-[170px] h-[30vh] bg-center bg-cover rounded-xl m-4 hover:scale-110 duration-300 relative "
                    style={{
                      backgroundImage: `url(https://image.tmdb.org/t/p/original/t/p/w500/${movie?.poster_path})`,
                    }}
                    onClick={()=>handleOpenModal(movie)}
                  >
                    <div className="absolute top-5 right-1 bg-gray-900 p-2 text-xl rounded-xl bg-opacity-55"
                    onClick={()=>setOpenModal(false)}
                    >
                      {!isInWatchlist?(<button onClick={(e)=>{
                        e.stopPropagation();
                        toogleWatchlist(movie);
                        }}
                        >
                        <BsBookmarksFill style={{color: '#e2e9e8',}}/>
                        </button>):(
                        <button onClick={()=>{
                          toogleWatchlist(movie);
                        }}>
                        <BsBookmarksFill style={{color: '#e9fa00',}}/>
                        </button>)}
                    </div>
                    <div className="text-white text-center font-bold bg-gray-900 w-full bg-opacity-50">
                      {movie?.title}
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
            <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-75 flex justify-center items-center">
              <div className="bg-black rounded-lg shadow-lg p-8 w-full max-w-[65vw]">
                <MoviesInfo movie={selectedMovie} trailerUrl={trailerUrl}/>
                <div className="flex justify-center">
                <button
                  onClick={handleCloseModal}
                  className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded item-center justify-center"
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

export default Movies;

