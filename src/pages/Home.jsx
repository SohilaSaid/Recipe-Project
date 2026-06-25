import React, { useEffect } from 'react'
import HeroSection from '../components/HeroSection'
import CategoriesComponent from '../components/CategoriesComponent'
import Mission from '../components/Mission'
import HomeSlider from '../components/HomeSlider'
import SurpriseComponent from '../components/SurpriseComponent'


export default function Home() {

  useEffect(() => {
            window.scrollTo({ top: 0, behavior: "smooth" })
        }, [])
  return (
    <>
      <HeroSection />
      <HomeSlider />
      <SurpriseComponent />
      <CategoriesComponent />
      <Mission />
    </>
  )
}
