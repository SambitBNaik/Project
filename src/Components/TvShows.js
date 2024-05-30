import React, { useCallback, useEffect, useState } from 'react'
import { GetTrendingTvShows } from '../Service/GetTrendingTvShows'
import Pagination from './Pagination';
import { BsBookmarksFill } from "react-icons/bs";
import { GetMovieTrailer } from '../Service/GetTrailer';
import MoviesInfo from './Movies/MoviesInfo';

const TvShows = () => {
  const[tvShows,setTvshows]= useState([]);
  const[page,setPage]= useState(1);
  const [loder,setloder]=useState(true);
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
    GetTrendingTvShows(page)
      .then((data)=>{
        setTvshows(data);
        setloder(false);
      })
      .catch((err)=>{
        console.error(err);
        setloder(false);
      });
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

  const loadNextPageTvShows=useCallback(()=>{
    setPage((prevPage)=> prevPage+1);
  },[]);

  const loadPreviousPageTvShows =useCallback(()=>{
    setPage((prevPage)=>Math.max(prevPage-1,1))  
  },[])

  const toogleWatchlist=useCallback((tvShow)=>{
    const istvWatchList= watchList.some((item)=>item.id === tvShow.id);
    if(istvWatchList){
      setWatchList((prevTvShowList)=>{
        const filteredTvshow=prevTvShowList?.length>0 && prevTvShowList.filter((tv)=>tv.id !== tvShow.id);
        localStorage.setItem("tvshowWatchList",JSON.stringify(filteredTvshow));
        return filteredTvshow;
      });
    }else{
      setWatchList((prevTvShowList)=>{
        const newTvshowList=prevTvShowList?.length>0 ?[...prevTvShowList,tvShow] : [tvShow];
        localStorage.setItem("tvshowWatchList" , JSON.stringify(newTvshowList));
        return newTvshowList;
      });
    }
  },[watchList]);
  return (
    <div>
      {loder ? (
        <div className='flex justify-center items-center h-screen'>
          <div className='loader'></div>
        </div>
      ):(
        <>
        <div className='bg-black'>
       <div className='text-2xl mb-8 font-bold text-center justify-center text-white'>
         Trending Tv Shows
         </div>
         <div className='flex flex-wrap items-center justify-center'>
           {tvShows && 
           tvShows?.map((tvShow)=>{
             const isInWatchlist=watchList.some(
               (item)=>item.id===tvShow.id
             );
             return(
               <div
               key={tvShow?.id}
               className="w-[160px] h-[30vh] bg-center bg-cover rounded-xl m-4 hover:scale-110 duration-300 relative"
               style={{
                 backgroundImage: `url(https://image.tmdb.org/t/p/original/t/p/w500/${tvShow?.poster_path})`,
               }}
               onClick={()=>handleOpenModal(tvShow)}
               >
               <div className="absolute top-5 right-1 bg-gray-900 p-2 text-xl rounded-xl bg-opacity-55">
                 {!isInWatchlist?( <button onClick={(e)=>{
                 e.stopPropagation();
                 toogleWatchlist(tvShow);}}><BsBookmarksFill style={{color: '#e2e9e8',}}/></button>):(
                   <button onClick={()=>{
                     toogleWatchlist(tvShow);
                   }}><BsBookmarksFill style={{color: '#e9fa00',}}/></button>
                 )}
               </div>
               <div className='text-white text-center font-bold bg-gray-900 w-full bg-opacity-50'>
                 {tvShow?.name}
               </div>
               </div>
             );
           })}
          
         </div>
         <Pagination
           onNext={loadNextPageTvShows}
           onPrev={loadPreviousPageTvShows}
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
export default TvShows

