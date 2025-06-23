import React from 'react'
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
        <nav>
            <Link>
               <img src='/bg.png'  className='h-13'/>
            </Link>
        </nav>
    </div>
  )
}

export default Header