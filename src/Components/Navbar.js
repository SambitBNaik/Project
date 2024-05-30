import React, { useState } from 'react';
import logo from "../Assets/MovieLogo.png"
import { Link } from 'react-router-dom';

const Navbar = () => {
  const[showMoviesDropdown, setShowMoviesDropdown]= useState(false);
  const[showPeopleDropdown, setShowPeopleDropdown]= useState(false);
  const[showMovieWatchListDropdown,setShowMovieWatchListDropdown]=useState(false);
  const[tvshowsDropDown,setTvShowsDropDown]=useState(false);
  return (
  // <div className="flex space-x-8 items-center pl-3 py-4 border bg-gray-700">
  //     <Link to="/"><img  src={logo} className="w-[60px] rounded-full"/></Link>
    

  //     <Link to="/"><h3 className="text-white font-sans-serif ">Movies</h3></Link>
  //     <Link to="/tvshows"><h3 className="text-white">TVShows</h3></Link>
  //     <Link to="/people"><h3 className="text-white">People</h3></Link>
  //     <Link to="/watchlist"><h3 className="text-white">WatchList</h3></Link>
  //     <div className="flex justify-center items-center">
  //       <input type="text" placeholder="Search" className="px-2 py1 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"/>
  //     </div>
    
  //   </div>
  <div className="flex justify-between items-center pl-3 py-4  bg-slate-800">
      <div className="flex items-center">
        <Link to="/">
          <img src={logo} className="w-12 h-12 rounded-full" alt="Movie Logo"/>
        </Link>
        {/* <Link to="/" className="text-white ml-4 font-bold">Movies</Link> */}
        <div className='relative ml-4'
             onMouseEnter={()=>setShowMoviesDropdown(true)}
             onMouseLeave={()=>setShowMoviesDropdown(false)}
        >
            <span className='text-white font-bold cursor-pointer'>Movies</span>
            {showMoviesDropdown && (
            <div className='absolute w-[160px]  top-full left-0  bg-white text-gray p-2 rounded shadow z-10' onMouseEnter={()=>setShowMoviesDropdown(true)}>
              <Link to="/popular" className='block py-1 px-2  hover:bg-slate-300'>Popular</Link>
              <Link to="/nowplaying" className='block py-1 px-2 hover:bg-slate-300'>Now Playing</Link>
              <Link to="/upcoming" className='block py-1 px-2 hover:bg-slate-300'>Upcoming</Link>
              <Link to="/toprated" className='block py-1 px-2  hover:bg-slate-300'>Top Rated</Link>
            </div>
          )}
        </div>
        {/* <Link to="/tvshows" className="text-white ml-4 font-bold">TV Shows</Link> */}
        <div className='relative ml-4'
              onMouseEnter={()=>setTvShowsDropDown(true)}
              onMouseLeave={()=>setTvShowsDropDown(false)}
        >
             <spna className='text-white font-bold cursor-pointer'>TV Shows</spna>
             {tvshowsDropDown && (
              <div className='absolute w-[160px] top-full left-0 bg-white text-gray p-2 rounded shadow z-10' onMouseEnter={()=>setTvShowsDropDown(true)}>
                <Link to="/tvshows" className='block py-1 px-2 hover:bg-slate-300'>Popular</Link>
                <Link to="/airingToday" className='block py-1 px-2 hover:bg-slate-300'>Airing Today</Link>
                <Link to="/tv_top_rated" className='block py-1 px-2 hover:bg-slate-300'>Top Rated</Link>
              </div>
             )}
        </div>
        {/* <Link to="/people" className="text-white ml-4 font-bold">People</Link> */}
        <div className='relative ml-4'
             onMouseEnter={()=>setShowPeopleDropdown(true)}
             onMouseLeave={()=>setShowPeopleDropdown(false)}
        >
          <span className='text-white font-bold cursor-pointer'>People</span>
          {showPeopleDropdown && (
            <div className='absolute w-[160px] top-full left-0 bg-white text-gray p-2 rounded shadow  z-10' onMouseEnter={()=>setShowPeopleDropdown(true)}>
              <Link to="/popular_people" className='block py-1 px-2 hover:bg-slate-300'>Popular People</Link>
            </div>
          )}
        </div>
        {/* <Link to="/watchlist" className="text-white ml-4 font-bold">WatchList</Link> */}
        <div className='relative ml-4'
             onMouseEnter={()=>setShowMovieWatchListDropdown(true)}
             onMouseLeave={()=>setShowMovieWatchListDropdown(false)}
        >
          <span className='text-white font-bold cursor-pointer'>WatchList</span>
         {showMovieWatchListDropdown && (
           <div className='absolute w-[190px] top-full left-0 bg-white text-gray p-2 rounded z-10' onMouseEnter={()=>setShowMovieWatchListDropdown(true)}>
           <Link to="/Movies_WatchList" className='block py-1 px-2 hover:bg-slate-300'>Movies WatchList</Link>
           <Link to="/TvShows_WatchList" className='block py-1 px-2 hover:bg-slate-300'>Tv Shows WatchList</Link>
         </div>
         )}
        </div>
      </div>
    </div>
  )
}
export default Navbar;