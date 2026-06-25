import React from 'react'
import { Outlet } from 'react-router'
import NavBar from './pages/NavBar'
import Footer from './pages/Footer'

export default function LayOut() {
  return (
   <div className="min-h-screen flex flex-col">

      <NavBar />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />

    </div>
  )
}
