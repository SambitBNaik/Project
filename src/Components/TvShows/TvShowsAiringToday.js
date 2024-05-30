import React, { useCallback, useEffect, useState } from 'react'
import { GetTvShowsAiringToday } from '../../Service/TVshowsApiServices/GetTvShowsAiringToday';
import Pagination from '../Pagination';
import { BsBookmarksFill } from "react-icons/bs";
import "./AirShow.css";
import MoviesInfo from '../Movies/MoviesInfo';
import { GetMovieTrailer } from '../../Service/GetTrailer';

const TvShowsAiringToday = () => {
  const[airShows,setAirShows]=useState([]);
  const[page,setPage]=useState(1);
  const[loder,setloder]=useState(true);
  const[watchList,setWatchList]=useState([]);
  const[selectedShow, setSeletedShow]=useState(null);
  const[openModal, setOpenModal]=useState(false);
  const[trailerUrl,settrailerUrl]=useState("");

  useEffect(()=>{
    const tvshowsWatchListFromLocalStorage=localStorage?.getItem("tvshowWatchList");
    if(tvshowsWatchListFromLocalStorage){
      setWatchList(JSON.parse(tvshowsWatchListFromLocalStorage));
    }
  })
  

  useEffect(()=>{
    setloder(true);
    GetTvShowsAiringToday(page)
      .then((data)=>{
        setAirShows(data);
        setloder(false)
      })
      .catch((err)=>{
        console.error(err);
        setloder(false);
      })
  },[page]);

  useEffect(()=>{
    const fetchTrailer=async()=>{
      if(selectedShow){
        const url= await GetMovieTrailer(selectedShow.title || selectedShow.name);
        settrailerUrl(url);
      }
    }
    fetchTrailer();
  },[selectedShow]);


  const handleOpenModal=useCallback((show)=>{
    setSeletedShow(show);
    settrailerUrl("");
    setOpenModal(true);
  },[]);

  const handleCloseModal=useCallback(()=>{
    setSeletedShow(null);
    setOpenModal(false);
  },[])

  const loadNextPage=()=>{
    setPage((prevPage)=>prevPage+1);
  }
  const loadPrevPage=useCallback(()=>{
    setPage((prevPage)=>Math.max(prevPage-1,1))
  },[])

  const toogleWatchlist=useCallback((airshow)=>{
    const isInWatchlist=watchList.some((item)=>item.id === airshow.id);
    if(isInWatchlist){
      setWatchList((prevAirShow)=>{
        const filteredShow=prevAirShow?.length>0 && prevAirShow.filter((tv)=>tv.id!== airshow.id);
        localStorage.setItem("tvshowWatchList",JSON.stringify(filteredShow));
        return filteredShow;
      });
    }
    else{
      setWatchList((prevAirShow)=>{
        const newAirShow=prevAirShow?.length>0 ? [...prevAirShow,airshow] :[airshow];
        localStorage.setItem("tvshowWatchList",JSON.stringify(newAirShow));
        return newAirShow;
      })
    }
  },[watchList]);

  return (
    <div>
      {loder?(
        <div className='flex justify-center items-center h-screen'>
          <div className='loder'></div>
        </div>
      ):(
        <>
    <div className='bg-black'>
        <div className='text-2xl mb-8 font-bold text-center justify-center text-white'>
            TvShows Airing Today
        </div>
        <div className='flex flex-wrap items-center justify-center'>
            {airShows &&
            airShows?.map((airShow)=>{
              const isInWatchlist=watchList.some(
                (item)=>item.id===airShow.id
              );
                return(
                    <div
                    key={airShow?.id}
                    className='w-[160px] h-[30vh] bg-center rounded-xl m-4 bg-cover  hover:scale-110 duration-300 relative'
                    style={{
                        backgroundImage:`url(https://image.tmdb.org/t/p/original/t/p/w500/${airShow?.poster_path})`,
                    }}
                    onClick={()=>handleOpenModal(airShow)}
                    >
                          <div className="absolute top-5 right-1 bg-gray-900 p-2 text-xl rounded-xl bg-opacity-55">
                             
                          
                             {!isInWatchlist?(<button onClick={(e)=>{e.stopPropagation();toogleWatchlist(airShow);}}><BsBookmarksFill style={{color: '#e2e9e8',}}/></button>):
                             (   <button onClick={(e)=>toogleWatchlist(airShow)}><BsBookmarksFill style={{color: '#e9fa00',}}/></button>)}
                         </div>
                         <div className='text-white text-center font-bold bg-gray-900 w-full bg-opacity-50'>
                            {airShow?.name}
                         </div>

                    </div>
                );
            }) }
          
        </div>
        <Pagination
          onNext={loadNextPage}
          onPrev={loadPrevPage}
          currPage={page}/>
    </div>
    </>

      )}

      {openModal && selectedShow &&(
        <div className='fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-75  flex justify-center items-center h-screen'>
          <div className='bg-black rounded-lg shadow-lg p-8 w-full max-w-[65vw]'>
            <MoviesInfo movie={selectedShow} trailerUrl={trailerUrl} />
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
  )
}

export default TvShowsAiringToday