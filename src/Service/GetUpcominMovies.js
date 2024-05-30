import axios from "axios";

export const GetUpcomingMovies =async(pageNo=1)=>{
    const options = {
        method: 'GET',
        url:'https://api.themoviedb.org/3/movie/upcoming',
        params: {language: 'en-US' , page:pageNo},
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NzU4NzI1ZDBiMWZmNDgzMzVhMGM1NDUwZWI4Nzg3YSIsInN1YiI6IjY2MDZmMzViYTg5NGQ2MDE3YzYzOTZkOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Fh_dbFGad8rL9_TrO3QvyqPXmqv1z3JOXRdUDq3Z62Q'
        }
      };

      const response= await axios.request(options);
      console.log(response);
      return response?.data?.results;
}