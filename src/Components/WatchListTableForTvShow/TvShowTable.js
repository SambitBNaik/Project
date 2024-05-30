// import React, { useCallback, useEffect, useState } from 'react'
// import { genreids } from '../WatchListTable/helper';

// const TvShowTable = () => {
//   const [favoriteTvShow,setFavouriteTvShows]=useState([]);
//   const [loader,setLoader]=useState(true);
//   const [genre,setGenre]=useState([]);
//   const [currGenre,setCurrGenre]=useState("All Genere");
//   const [fileredTvShow,setFilteredTvShow]=useState([]);
//   const [searchStr,setSearchStr]=useState("");

//   useEffect(()=>{
//     setLoader(true);
//     if(localStorage.getItem("tvshowWatchList")){
//       const tvshow=JSON.parse(localStorage.getItem("tvshowWatchList"));
//       setFavouriteTvShows(tvshow);
//       setFilteredTvShow(tvshow);
//       const listOfGenre=new Set(
//         tvshow.map((show)=>genreids[show?.genre_ids[0]])
//       );
//       setGenre(()=>["All Genre",...listOfGenre])
//     }
//     setLoader(false);
//   },[])

//   useEffect(()=>{
//     setLoader(true);
//     let filteredTvShow=favoriteTvShow;
//     if(currGenre !== 'All Genre'){
//       filteredTvShow=favoriteTvShow.filter(
//         (tvshow)=>genreids[tvshow?.genre_ids[0]]===currGenre
//       );
//     }
//     setFilteredTvShow(filteredTvShow);
//     setLoader(false);
//   },[currGenre,favoriteTvShow]);

//   const deleteTvShowHandler=useCallback((tvshow)=>{
//     const filteredTvShows=favoriteTvShow?.filter((tv)=> tv.id !== tvshow.id)
//     setFavouriteTvShows(filteredTvShows);
//     setFilteredTvShow(fileredTvShow);
//     localStorage.setItem("tvshowWatchList",JSON.stringify(filteredTvShows));
//   },[favoriteTvShow]);

//   const currGenreHandeler=useCallback((genre)=>{
//     setCurrGenre(genre);
//     let fileredTvShow=[];
//     if(genre ==="All Genre"){
//       fileredTvShow=favoriteTvShow;
//     }
//     else{
//       fileredTvShow=favoriteTvShow.filter(
//         (tv)=>genreids[tv?.genre_ids[0]]===genre
//       );
//     }
//     setFilteredTvShow(fileredTvShow);
//   },[favoriteTvShow]);

//   const inputHandler=useCallback((val)=>{
//     setSearchStr(val);
//     if(val===""){
//       currGenreHandeler(currGenre);
//     }
//     else{
//       setFilteredTvShow(
//         favoriteTvShow.filter((tv)=>
//           tv.name.toLowerCase().includes(val.toLowerCase())
//         )
//       );
//     }
//   },[favoriteTvShow,currGenre,currGenreHandeler])
//   return (
//     <>
//     {loader ? (
//       <div className="flex justify-center items-center h-screen">
//       <div className="loader"></div>
//     </div>
//     ):(
//        <div className='border border-gray-300 shadow-md m-5 rounded-md'>
//         <div className='my-6 flex flex-wrap space-x-2 justify-center'>
//           {genre?.length>0 && genre.map((eachGenre,idx)=>{
//             return(
//               <div key={idx}
//               className={
//                 currGenre===eachGenre
//                 ?"m-2 text-lg p-1 bg-blue-400 text-white rounded-xl font-bold"
//                 : "m-2 text-lg p-1 bg-gray-400 hover:bg-blue-400 text-white rounded-xl font-bold"
//               }
//               onClick={()=>currGenreHandeler(eachGenre)}
//               >{eachGenre}
//               </div>
//             );
//           })}
//         </div>
//         <div className='text-center'>
//           <label for="title">Enter Title of Tv Show</label>
//               <input 
//                   type='text' 
//                   id="title"
//                   className='bg-gray-200 border-4  texr-center p-1 m-2'
//                   placeholder="Search for the TV Show"
//                   value={searchStr}
//                   onChange={(e)=>inputHandler(e.target.value)}
//                 />
//         </div>
//         <table className='w-full border-collapse bg-white text-left text-sm text-gray-500'>
//           <thead>
//             <tr>
//               <th className='p-2 m-4 text-gray-800'>Name</th>
//               <th className='p-2 m-4 text-gray-800 flex space-x-2'>
//                 <img
//                 className='mr-1'
//                 alt="ascending button"
//                 src="https://img.icons8.com/external-those-icons-lineal-those-icons/24/000000/external-up-arrows-those-icons-lineal-those-icons-3.png"
//                 />
//                 Rating
//                 <img
//                 className='ml-1'
//                 alt="descending button"
//                 src="https://img.icons8.com/external-those-icons-lineal-those-icons/24/000000/external-down-arrows-those-icons-lineal-those-icons-4.png"
//                 /></th>
//               <th className='p-2 m-4 text-gray-800'>Popularity</th>
//               <th className='p-2 m-4 text-gray-800'>Release Date</th>
//               <th className='p-2 m-4 text-gray-800'>Genres</th>
//               <th className='p-2 m-4 text-gray-800'>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {
//               favoriteTvShow && favoriteTvShow?.map((tvshow)=>{
//                 return(
//                   <tr key={tvshow?.id}>
//                     <td className='flex items-center space-x-2 px-5 py-6'>
//                       <img src={`https://image.tmdb.org/t/p/original/t/p/w500/${tvshow?.poster_path}`}
//                       className='h-[10rem] w-[10rem]'
//                       alt='Tv Show Poster'
//                       />
//                       <div className='text-gray-700'>{tvshow?.name}</div>
//                     </td>
//                     <td>{tvshow?.vote_average}</td>
//                     <td>{tvshow?.popularity}</td>
//                     <td>{tvshow?.first_air_date}</td>
//                     <td>{genreids[tvshow?.genre_ids[0]]}</td>
//                     <td>
//                       <button className='text-red-600 border-2 border-black p-2' onClick={()=>deleteTvShowHandler(tvshow)}>Delete</button>
//                     </td>
//                   </tr>
//                 )
//               })  
//             }
//           </tbody>
//         </table>
//        </div>
//        )}
//     </>
//   );
// };

// export default TvShowTable


import React, { useCallback, useEffect, useState } from 'react';
import { genreids } from './helper';

const TvShowTable = () => {
  const [favoriteTvShow, setFavoriteTvShows] = useState([]);
  const [loader, setLoader] = useState(true);
  const [genre, setGenre] = useState([]);
  const [currGenre, setCurrGenre] = useState("All Genre");
  const [filteredTvShow, setFilteredTvShow] = useState([]);
  const [searchStr, setSearchStr] = useState("");

  useEffect(() => {
    setLoader(true);
    if (localStorage.getItem("tvshowWatchList")) {
      const tvshow = JSON.parse(localStorage.getItem("tvshowWatchList"));
      setFavoriteTvShows(tvshow);
      setFilteredTvShow(tvshow);
      const listOfGenre = new Set(tvshow.map((show) => genreids[show?.genre_ids[0]]));
      setGenre(() => ["All Genre", ...listOfGenre]);
    }
    setLoader(false);
  }, []);

  useEffect(() => {
    setLoader(true);
    let filteredTvShow = favoriteTvShow;
    if (currGenre !== 'All Genre') {
      filteredTvShow = favoriteTvShow.filter(
        (tvshow) => genreids[tvshow?.genre_ids[0]] === currGenre
      );
    }
    if (searchStr) {
      filteredTvShow = filteredTvShow.filter(tvshow =>
        tvshow.name.toLowerCase().includes(searchStr.toLowerCase())
      );
    }
    setFilteredTvShow(filteredTvShow);
    setLoader(false);
  }, [currGenre, favoriteTvShow, searchStr]);

  const deleteTvShowHandler = useCallback((tvshow) => {
    const filteredTvShows = favoriteTvShow.filter((tv) => tv.id !== tvshow.id);
    setFavoriteTvShows(filteredTvShows);
    setFilteredTvShow(filteredTvShows);
    localStorage.setItem("tvshowWatchList", JSON.stringify(filteredTvShows));
  }, [favoriteTvShow]);

  const currGenreHandler = useCallback((genre) => {
    setCurrGenre(genre);
    let filteredTvShow=[];
    if(genre==="All Genre"){
      filteredTvShow=favoriteTvShow;
    }else{
      filteredTvShow=favoriteTvShow.filter(
        (tv)=>genreids[tv?.genre_ids[0]===genre]
      );
    }
    setFilteredTvShow(filteredTvShow);
  }, [favoriteTvShow]
 );

  const inputHandler = useCallback((val) => {
    setSearchStr(val);
    if(val===""){
      currGenreHandler(currGenre);
    }
    else{
      setFilteredTvShow(
        favoriteTvShow.filter((tv)=>
          tv.name.toLowerCase().includes(val.toLowerCase())
        )
      );
    }
  }, [favoriteTvShow,currGenre,currGenreHandler]);

  const sortHandler=useCallback((order)=>{
    let sortedData=[];
    if(order==='ascending'){
      sortedData=filteredTvShow.sort((t1,t2)=>t1?.vote_average-t2?.vote_average);
    }else{
      sortedData=filteredTvShow.sort((t1,t2)=>t2?.vote_average-t1?.vote_average);
    }
    setFavoriteTvShows([...sortedData]);
  },[filteredTvShow]);

  return (
    <>
      {loader ? (
        <div className="flex justify-center items-center h-screen">
          <div className="loader"></div>
        </div>
      ) : (
        <div className='border border-gray-300 shadow-md m-5 rounded-md'>
          <div className='my-6 flex flex-wrap space-x-2 justify-center'>
            {genre?.length > 0 && genre.map((eachGenre, idx) => (
              <div
                key={idx}
                className={
                  currGenre === eachGenre
                    ? "m-2 text-lg p-1 bg-blue-400 text-white rounded-xl font-bold"
                    : "m-2 text-lg p-1 bg-gray-400 hover:bg-blue-400 text-white rounded-xl font-bold"
                }
                onClick={() => currGenreHandler(eachGenre)}
              >
                {eachGenre}
              </div>
            ))}
          </div>
          <div className='text-center'>
            <label htmlFor="title">Enter Title of Tv Show</label>
            <input
              type='text'
              id="title"
              className='bg-gray-200 border-4  texr-center p-1 m-2'
              placeholder="Search for the TV Show"
              value={searchStr}
              onChange={(e) => inputHandler(e.target.value)}
            />
          </div>
          <table className='w-full border-collapse bg-white text-left text-sm text-gray-500'>
            <thead>
              <tr>
                <th className='p-2 m-4 text-gray-800'>Name</th>
                <th className='p-2 m-4 text-gray-800 flex space-x-2'>
                  <img
                    className='mr-1'
                    alt="ascending button"
                    onClick={()=>sortHandler('ascending')}
                    src="https://img.icons8.com/external-those-icons-lineal-those-icons/24/000000/external-up-arrows-those-icons-lineal-those-icons-3.png"
                  />
                  Rating
                  <img
                    className='ml-1'
                    alt="descending button"
                    onClick={()=>sortHandler('descending')}
                    src="https://img.icons8.com/external-those-icons-lineal-those-icons/24/000000/external-down-arrows-those-icons-lineal-those-icons-4.png"
                  />
                </th>
                <th className='p-2 m-4 text-gray-800'>Popularity</th>
                <th className='p-2 m-4 text-gray-800'>Release Date</th>
                <th className='p-2 m-4 text-gray-800'>Genres</th>
                <th className='p-2 m-4 text-gray-800'>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                filteredTvShow && filteredTvShow.map((tvshow) => (
                  <tr key={tvshow?.id}>
                    <td className='flex items-center space-x-2 px-5 py-6'>
                      <img src={`https://image.tmdb.org/t/p/original/t/p/w500/${tvshow?.poster_path}`}
                        className='h-[10rem] w-[10rem]'
                        alt='Tv Show Poster'
                      />
                      <div className='text-gray-700'>{tvshow?.name}</div>
                    </td>
                    <td>{tvshow?.vote_average}</td>
                    <td>{tvshow?.popularity}</td>
                    <td>{tvshow?.first_air_date}</td>
                    <td>{genreids[tvshow?.genre_ids[0]]}</td>
                    <td>
                      <button className='text-red-600 border-2 border-black p-2' onClick={() => deleteTvShowHandler(tvshow)}>Delete</button>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default TvShowTable;
