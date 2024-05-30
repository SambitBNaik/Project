import React from 'react'

const MoviesInfo = ({movie,trailerUrl}) => {
    // const dummyTrailerUrl = "https://www.youtube.com/embed/aqa3YTtwvaU";

    const {name,title,overview,poster_path,release_date, first_air_date,vote_average}=movie;
  return (
    // <div className=''>
    //     <img className='bg-white rounded-lg mb-4 h-[40vh]'
    //      src={`https://image.tmdb.org/t/p/original/${poster_path}`}
    //      alt={`${title} Poster`} 
    //     />
    //     <h2 className='text-2xl mb-8 font-bold text-center pt-4 text-blue-400'>
    //         {title}
    //     </h2>
    //     <p className='text-gray-500'>Release Date: {release_date}</p>
    //     <p className='text-gray-500'>Average Vote: {vote_average}</p>
    //     <p>{overview}</p>
    //     <div>
    //         <h3  className='text-xl text-blue-400'>Trailer</h3>
    //         <iframe
    //           title={title}
    //           width="100%"
    //           height="315"
    //           src={dummyTrailerUrl}
    //           allow='accelerometer; autoplay; clipboard-write encrypted-media; gyroscope; picture-in-picture'
    //           allowFullScreen
    //         ></iframe>
    //     </div>
    // </div>
    <div>
      <h2 className='text-2xl mb-8 font-bold text-center pt-4 text-blue-400'>{title || name}</h2>
      <div className='flex space-x-10'>
        <img className='bg-white rounded-xl mb-4 h-[25vh]'
        src={`https://image.tmdb.org/t/p/original/${poster_path}`}
        alt={`${title} Poster`}/>
         <div className="align-middle">
           <p className='text-gray-400'><b>Release Date :</b> {release_date || first_air_date}</p>
           <p className='text-gray-400'><b>Average Vote :</b> {vote_average}</p>
           <p className='text-gray-400'><b>Description  :</b> {overview}</p>
         </div>
      </div>
      <div>
        <h3 className='text-xl text-blue-400 text-center'>Trailer</h3>
        <iframe
          title={title || name}
          width="100%"
          height="450"
          src={trailerUrl}
          allow='accelerometer; autoplay; clipboard-write encrypted-media; gyroscope; picture-in-picture'
          allowFullScreen
        ></iframe>
      </div>
    </div>
  )
}

export default MoviesInfo

