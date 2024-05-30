import React ,{memo}from 'react'


const Pagination = ({onPrev, onNext, currPage}) => {
  console.log("Pagination component");
  return (
    <div className='flex justify-center items-center gap-4'>
        <button onClick={onPrev} className='rounded-lg border-4 border-blue-800 m-4 p-2 text-white'>Previous</button>
        <div className='text-white'>{currPage}</div>
        <button onClick={onNext} className='rounded-lg border-4 border-blue-800 m-4 p-2 text-white'>Next</button>
    </div>
  )
}

export default memo(Pagination);