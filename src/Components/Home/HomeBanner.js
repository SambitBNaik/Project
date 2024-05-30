// import axios from 'axios';
// import React, { useEffect, useState } from 'react'



// const HomeBanner = () => {
//   const[query, setQuery]=useState('');
//   const[suggestions,setSuggestions]=useState([]);

//   useEffect(() => {
//     if (query.length > 2) {
//       const fetchData = async () => {
//         try {
//           const response = await axios.get(
//             `https://api.themoviedb.org/3/search/movie`,
//             {
//               params: {
//                 query: query,
//                 api_key: '9758725d0b1ff48335a0c5450eb8787a',
//               },
//             }
//           );
//           console.log(response.data.results);
//           setSuggestions(response.data.results);
//         } catch (error) {
//           console.error('Error fetching data:', error);
//         }
//       };
//       fetchData();
//     } else {
//       setSuggestions([]);
//     }
//   }, [query]);

//   const handleSuggestionClick=(suggestions)=>{
//     setQuery(suggestions?.title || suggestions?.name || '');
//     setSuggestions([]);
//   }
  

//   return (
//     <div className="h-[15vh] md:h-[40vh] bg-center bg-no-repeat flex items-end bg-sky-300 filter"
//   style={{
//     backgroundImage: `url(https://images.hdqwalls.com/wallpapers/the-batman-2022-movie-poster-art-cy.jpg)`,
//     backgroundBlendMode:'multiply',
//     backgroundSize:'cover',
//     backgroundPosition:'center',
//     backgroundRepeat:'no-repeat',
//     }}>   
//        <div className='flex-col m-10 absolute top-20 '>
//           <h2 className='text-white text-5xl font-bold leading-none font-sans'>Welcome.</h2>
//           <h3 className='text-white text-3xl font-bold leading-none font-sans'>Millions of movies,Tv shows and people to discover. Explore now.</h3>
//           <div className="mt-4 relative">
//           <form className="flex items-center justify-center">
//             <input
//               type="text"
//               value={query}
//               onChange={(e)=>setQuery(e.target.value)}
//               placeholder="Search for a movie, TV show, person......"
//               className="border border-gray-400 px-4 py-2 rounded-l-xl focus:outline-none focus:ring focus:border-blue-500 flex-1"
//             />
//             <button
//               type="submit"
//               className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r-xl focus:outline-none focus:ring focus:border-blue-500"
//             >
//               Search
//             </button>
//           </form>
//           {suggestions.length>0 && (
//             <ul className="absolute mt-2 bg-white border-gray-400 rounded-xl max-h-60 overflow-y-auto z-10">
//               {suggestions.map((item)=>(
//                 <li key={item.id}
//                  onClick={()=> handleSuggestionClick()}
//                  className="px-4 py-2 border-b border-gray-200 hover:bg-gray-100"
//                 >
//                   {item.title || item.name || "No Movies or Tv Shows Available"}
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>
//         </div>
       
        
//     </div>
//   )
// }

// export default HomeBanner


import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HomeBanner = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (query.length > 2) {
      const fetchData = async () => {
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
          console.log(response.data.results);
          setSuggestions(response.data.results);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchData();
    } else {
      setSuggestions([]);
    }
  }, [query]);

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion?.title || suggestion?.name || '');
    setSuggestions([]);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (query) {
      navigate(`/search?query=${query}`);
    }
  };

  return (
    <div
      className="h-[15vh] md:h-[40vh] bg-center bg-no-repeat flex items-end bg-sky-300 filter"
      style={{
        backgroundImage: `url(https://images.hdqwalls.com/wallpapers/the-batman-2022-movie-poster-art-cy.jpg)`,
        backgroundBlendMode: 'multiply',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="flex-col m-10 absolute top-20">
        <h2 className="text-white text-5xl font-bold leading-none font-sans">Welcome.</h2>
        <h3 className="text-white text-3xl font-bold leading-none font-sans">
          Millions of movies, TV shows, and people to discover. Explore now.
        </h3>
        <div className="mt-4 relative">
          <form className="flex items-center justify-center" onSubmit={handleSearch}>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for a movie, TV show, person......"
              className="border border-gray-400 px-4 py-2 rounded-l-xl focus:outline-none focus:ring focus:border-blue-500 flex-1"
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r-xl focus:outline-none focus:ring focus:border-blue-500"
            >
              Search
            </button>
          </form>
          {suggestions.length > 0 && (
            <ul className="absolute mt-2 bg-white border-gray-400 rounded-xl max-h-60 overflow-y-auto z-10">
              {suggestions.map((item) => (
                <li
                  key={item.id}
                  onClick={() => handleSuggestionClick(item)}
                  className="px-4 py-2 border-b border-gray-200 hover:bg-gray-100 cursor-pointer"
                >
                  {item.title || item.name || "No Movies or TV Shows Available"}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeBanner;
