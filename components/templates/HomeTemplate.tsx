'use client';
import React from 'react'
import Navbar from '../common/Navbar'
import Footer from '../common/Footer'

export default function HomeTemplate() {
  return (
    <>
        <Navbar />
        <main className={`container mx-auto pt-16`}>
            <div className={`h-screen`}>
                HomeTemplate
                <div>
                  <p>hola</p>
                </div>
            </div>
        </main>
        <Footer/>
    </>
  )
}
