import React from 'react'
import '../Pages/Home.css'
import { useSpring, animated } from 'react-spring';
import King from '../Home/King'
const Header = () => {
   
  return (
   
    <div className='header-Home'>
    <p className='welcome'>Welcome To <span className='chessi'>Chessi.com</span></p>   
    <King/>
    </div>
  )
}

export default Header
