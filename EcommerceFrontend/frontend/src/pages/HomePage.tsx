import React from 'react'
import Header from '../components/Header'
import CategoriesComponent from '../components/CategoriesComponent'

const HomePage = () => {
  return (
    <div>
        <Header />
        <h1>You are welcome!</h1>
        <CategoriesComponent />
    </div>
  )
}

export default HomePage