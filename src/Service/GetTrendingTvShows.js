// import axios from "axios";

// export const GetTrendingTvShows =async(pageNo=1)=>{
//     const options = {
//         method: 'GET',
//         url:'https://api.themoviedb.org/3/trending/tv/day',
//         params: {language: 'en-US' , page:pageNo},
//         headers: {
//           accept: 'application/json',
//           Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NzU4NzI1ZDBiMWZmNDgzMzVhMGM1NDUwZWI4Nzg3YSIsInN1YiI6IjY2MDZmMzViYTg5NGQ2MDE3YzYzOTZkOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Fh_dbFGad8rL9_TrO3QvyqPXmqv1z3JOXRdUDq3Z62Q'
//         }
//       };
//       const response=  await axios.request(options);
//       console.log(response);
//       return response?.data?.results;
// }

import axios from "axios";

export const GetTrendingTvShows = async (pageNo = 1) => {
  const options = {
    method: 'GET',
    url: 'https://api.themoviedb.org/3/trending/tv/day',
    params: { language: 'en-US', page: pageNo },
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NzU4NzI1ZDBiMWZmNDgzMzVhMGM1NDUwZWI4Nzg3YSIsInN1YiI6IjY2MDZmMzViYTg5NGQ2MDE3YzYzOTZkOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Fh_dbFGad8rL9_TrO3QvyqPXmqv1z3JOXRdUDq3Z62Q'
    }
  };

  // try {
  //   const response = await axios.request(options);
  //   console.log(response);
  //   return response.data.results.map(tvShow => ({
  //     id: tvShow.id,
  //     name: tvShow.name,
  //     poster_path: tvShow.poster_path,
  //     vote_average:tvShow.vote_average,
  //     popularity: tvShow.popularity
  //   }));
   
  // } catch (error) {
  //   console.error(error);
  //   return [];
  // }

  try{
    const response= await axios.request(options);
    console.log(response);
    return response.data.results;
  }catch(error){
    console.log(error);
    return[];
  }
};
