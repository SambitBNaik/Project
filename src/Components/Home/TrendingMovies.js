
import React, { useEffect, useState,useCallback } from "react";
import { GetTrendingMovies } from "../../Service/GetTrendingMovies";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./TrendingMovie.css";
import { BsBookmarksFill } from "react-icons/bs";
import { GetMovieTrailer } from "../../Service/GetTrailer";
import MoviesInfo from "../Movies/MoviesInfo";

const TrendingMovies = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [watchList, setWatchList]= useState([]);
  const [selectedMovie,setSelectedmovie]=useState(null);
  const [openModal, setOpenModal]=useState(false);
  const [trailerUrl, setTrailerUrl]= useState("");


  useEffect(()=>{
    const watchListFromLocalStorage= localStorage?.getItem("movieWatchList");
    if(watchListFromLocalStorage){
      setWatchList(JSON.parse(watchListFromLocalStorage));
    }
  },[]);

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
    setTrailerUrl("")
    setOpenModal(true);
  },[]);

  const handleCloseModal=useCallback(()=>{
    setSelectedmovie(null);
    setOpenModal(false);
  },[])

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

  useEffect(() => {
    GetTrendingMovies(page)
      .then((data) => {
        setMovies(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [page]);

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
  };

  const renderSlides = () => {
    if (!movies.length) return null;

    return movies.map((movie, id)=>{
      const isInWatchlist=watchList.some((item)=>item.id=== movie.id);

      return(
        <div>
          <div
          key={movie?.id}
          className="relative w-[175px] h-[30vh] bg-center bg-cover rounded-xl m-8"
          style={{
            backgroundImage:` url(https://image.tmdb.org/t/p/original/t/p/w500/${movie?.poster_path})`,
          }}
          onClick={()=>handleOpenModal(movie)}
        >
          <div className="absolute top-1 right-1 bg-gray-900 p-2 text-xl rounded-xl bg-opacity-55">
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
        </div>
        </div>
      );
    })

  };

  return (
    <div className="bg-black">
      <h1>Trending Movies Now</h1>
      {movies.length === 0 ? (
        <div className="flex justify-center items-center">
          <div className="loader"></div>
        </div>
      ) : (
        <Slider className="slick-custom-class" {...settings}> {renderSlides()}</Slider>
      )}
      {openModal && selectedMovie &&(
        <div className='fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-75  flex justify-center items-center h-screen'>
          <div className='bg-black rounded-lg shadow-lg p-8 w-full max-w-[65vw]'>
            <MoviesInfo movie={selectedMovie} trailerUrl={trailerUrl} />
            <div className='flex justify-center'>
              <button 
              onClick={handleCloseModal} 
              className='mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrendingMovies;
