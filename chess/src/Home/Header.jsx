import React from 'react'
import '../Pages/Home.css'
import { useSpring, animated } from 'react-spring';

const Header = ({children}) => {
  return (
   
        <div className='header'>
      {children.split('').map((char, index) => {
        const springs = useSpring({
          from: { transform: 'translateY(-100px)', opacity: 0, color: 'lightgreen' },
          to: { transform: 'translateY(0px)', opacity: 1, color: 'white' },
          config: { duration: 500 },
          delay: index * 50 
        });

        return (
          <animated.span key={index} style={springs}>
           <h1>{char === ' ' ? '\u00A0' : char} {/* Handle spaces */}</h1> 
          </animated.span>
        );
      })}
   
    </div>
  )
}

export default Header
