import React from 'react'
import CategoriesComponent from '../components/Category/CategoriesComponent'
import HeroSection from '../components/HeroSection'
import FeaturedProducts from '../components/Product/FeaturedProducts'

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