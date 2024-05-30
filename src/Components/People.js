import React, { useEffect, useState } from 'react'
import { GetTrrendingPeople } from '../Service/GetTrendingPeople';
import Pagination from './Pagination';

const People = () => {
    const[peoples,setPeople]=useState([]);
    const[page,setPage]=useState(1);

    useEffect(()=>{
        GetTrrendingPeople()
          .then((data)=>{
            setPeople(data);
          })
          .catch((err)=>{
            console.err(err);
          })
    },[page]);
  return (
    <div className='bg-black'>
        <div className='text-2xl mb-8 font-bold text-center justify-center text-white'>Popular People</div>
        <div className='flex flex-wrap items-center justify-center'>
            {peoples && peoples?.map((people)=>{
                return(
                    <div
                         key={people?.id}
                         className='w-[160px] h-[30vh] bg-center bg-cover rounded-xl m-4 hover:scale-110 duration-300 relative'
                         style={{
                         backgroundImage:`url(https://image.tmdb.org/t/p/original/t/p/w500/${people?.profile_path})`,
                        }}
                     >
                 
                        <div className='text-white text-center font-bold bg-gray-900 w-full bg-opacity-50 absolute bottom-0 left-0' >
                           {people?.name}
                         </div> 
                    </div>   
                   
                )
            })}
        </div>
    </div>
    
  )
}

export default People