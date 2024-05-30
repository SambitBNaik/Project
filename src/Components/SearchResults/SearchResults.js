import React, { useState, useEffect ,useCallback} from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios';
import { GetMovieTrailer } from '../../Service/GetTrailer';
import MoviesInfo from '../Movies/MoviesInfo';

const SearchResults = () => {
    const location= useLocation();
    const query= new URLSearchParams(location.search).get('query');
    const [results, setResults]= useState([]);
    const [openModal, setOpenModal]= useState(false);
    const [selectedMovie, setSelectedMovie]=useState(null);
    const [trailerUrl, setTrailerUrl]=useState("");


    useEffect(() => {
        const fetchResults = async () => {
          try {
            const response = await axios.get(
              `https://api.themoviedb.org/3/search/movie`,
              {
                params: {
                  query: query,
                  api_key: '9758725d0b1ff48335a0c5450eb8787a',
                },
              }
            );
            setResults(response.data.results);
          } catch (error) {
            console.error('Error fetching search results:', error);
          }
        };
    
        if (query) {
          fetchResults();
        }
      }, [query]);

      useEffect(()=>{
        const fetchTrailer= async()=>{
            if(selectedMovie){
                const url= await GetMovieTrailer(selectedMovie.title || selectedMovie.name);
                setTrailerUrl(url);
            }
        };
        fetchTrailer();
      },[selectedMovie]);

      const handleOpenModal = useCallback((movie) => {
        setSelectedMovie(movie);
        setOpenModal(true);
    }, []);

    const handleCloseModal = useCallback(() => {
        setSelectedMovie(null);
        setTrailerUrl("");
        setOpenModal(false);
    }, []);

      return (
        <div className='bg-black min-h-screen p-5'>
          {/* <h2 className='text-white text-3xl mb-4'>Search Results for "{query}"</h2> */}
          {results.length > 0 ? (
            <div className='grid grid-row-1 md:grid-row-2 lg:grid-row-3 gap-6 '>
                <h2 className='text-white text-xl mb-4'>Search Results for "{query}" , Total Results {results.length}</h2>
              {results.map((item) => (
                <div key={item.id} className='flex  bg-gray-900 items-center space-x-2 px-4 py-4 border rounded-lg shadow-lg overflow-hidden'
                onClick={() => handleOpenModal(item)}
                >
                  <div className='w-40 h-50 flex-shrink-0'>
                    <img
                      src={`https://image.tmdb.org/t/p/original${item?.poster_path}`}
                      className="w-full h-full object-cover rounded"
                      alt="Movie Poster"
                    />
                  </div>
                  <div className='p-4'>
                    <div className='text-white text-xl font-semibold'>{item.title}</div>
                    <div className='text-gray-400'>{item.release_date}</div>
                    <div className='text-gray-300 mt-2 line-clamp-3'>{item.overview}</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className='text-white'>No results found</p>
          )}
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
    };
    

export default SearchResults