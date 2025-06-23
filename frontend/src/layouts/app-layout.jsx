import React from 'react'
import {Outlet} from "react-router-dom"
import DotGrid from '../background/DotGrid/DotGrid'
import Header from '../components/header'

const AppLayout = () => {
  return (
    <div className='grid-background'>
    <DotGrid className="fixed top-0 left-0 w-screen h-screen -z-10" />
    <main className='min-h-screen'>
        <Header/>
        <Outlet />
    </main>
    </div>
  )
}

export default AppLayout