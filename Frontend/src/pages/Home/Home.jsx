import React from 'react'
import { Banner } from './Banner'
import FavoriteBook from './FavouriteBook'
import BestSeller from './BestSeller'

const Home = () => {
  return (
    <div>
      <Banner/>
      <BestSeller/>
      <FavoriteBook/>
    </div>
  )
}

export default Home