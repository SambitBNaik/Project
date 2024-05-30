import React from 'react'

const Footer = () => {
  return (
    <footer className='h-[190px] bg-slate-800'>
      <div className='flex justify-center h-full space-x-7'>
        {/* <div>
          <img src="image"  style={{maxWidth:'100px', maxHeight:'100px'}} alt='Movie Logo'></img>
        </div> */}
        <div className='text-white'>
          <h3 className='font-bold'>THE BASICS</h3>
          <ul>
            <li>About</li>
            <li>Contact US</li>
            <li>Supporrt Forums</li>
          </ul>
        </div>
        <div className='text-white'>
          <h3 className='font-bold'>GET INVOLVED</h3>
          <ul>
            <li>Add new Movies</li>
            <li>Add new TV Show</li>
          </ul>
        </div>
        <div className='text-white'>
          <h3 className='font-bold'>COMMUNITY</h3>
          <ul>
            <li>Guidelines</li>
            <li>Discussion</li>
            <li>Leaderboard</li>
          </ul>
        </div>
        <div className='text-white'>
          <h3 className='font-bold'>LEGAL</h3>
          <ul>
            <li>Terms of Use</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer


