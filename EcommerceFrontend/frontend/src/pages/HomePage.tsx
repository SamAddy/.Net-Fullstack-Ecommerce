import React from 'react'
import CategoriesComponent from '../components/CategoriesComponent'
import HeroSection from '../components/HeroSection'
import FeaturedProducts from '../components/FeaturedProducts'

const HomePage = () => {
  return (
    <div>
        <HeroSection />
        <CategoriesComponent />
        <FeaturedProducts />
    </div>
  )
}

export default HomePage