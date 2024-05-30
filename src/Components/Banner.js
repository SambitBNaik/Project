import React from 'react';

const Banner = () => {
  return <div className="h-[20vh] md:h-[52vh] bg-center bg-no-repeat flex items-end bg-black"
  style={{
    // backgroundImage: `url(https://assets-in.bmscdn.com/discovery-catalog/events/et00311714-ewdhvajezf-landscape.jpg)`
    backgroundImage: `url(https://deadline.com/wp-content/uploads/2022/11/Screen-Shot-2022-11-10-at-9.29.14-AM.jpg?w=681&h=383&crop=1)`
    }}>
        <div className="text-xl md:text-3xl bg-gray-900 bg-opacity-60 p-4 w-full text-center text-white">
            John Wick
        </div>
    </div>
  
}

export default Banner;