import axios from "axios";

const API_KEY='AIzaSyBmwjHbHbG4Y25Irmz9QS3fdRjgLOHDRgw';

let movieTrailerRequestCount=0;

export const GetMovieTrailer=async(movieTile)=>{
    const query=`${movieTile} trailer`;
    console.log("Total request",movieTrailerRequestCount);
    const url=`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&key=${API_KEY}&maxResults=1`;

    try{
        const response=await axios.get(url);
        const videoId= response.data.items[0]?.id?.videoId;
        return `https://www.youtube.com/embed/${videoId}`;
    }
    catch(error){
        console.error('Error fetching trailer URL:', error);
        return '';
    }
}