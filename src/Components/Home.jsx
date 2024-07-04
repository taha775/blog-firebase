import React from 'react'
import Banner from './Banner/Banner'

import Recentpost from './Cards/RecentPost'
import Popularpost from './Popularpost'
import { useSelector } from 'react-redux'


const Home = () => {
  const { theme } = useSelector(state => state.theme);
  return (
    <div className={`${theme ==="dark"? 'bg-gray-800 ' : 'bg-white' }`}>
        <Banner/>
     <Recentpost/>
     <Popularpost/>
      
    </div>
  )
}

export default Home