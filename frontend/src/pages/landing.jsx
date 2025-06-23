import React from 'react'
import {Button} from '@/components/ui/button';
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Intro from './intro'

const LandingPage = () => {
 
  return (
    <>
    <main className="flex flex-col gap-10 sm:gap-20 py-10 sm:py-20">
      <section className="text-center ">
        <h1 className="flex flex-col items-center justify-center  font-extrabold text-4xl sm:text-6xl lg:text-8xl tracking-tighter py-4 text-gray-500">
          Level up your coding.
          <span className="flex items-center gap-2 sm:gap-6 text-gray-500">
             One problem at a time
          </span>
        </h1>
        <p className="text-gray-700 sm:mt-4 text-xs sm:text-xl font-extrabold">
          Practice with purpose. Powered by AI.
        </p>
      </section>
      </main>
      </>
  )
}

export default LandingPage