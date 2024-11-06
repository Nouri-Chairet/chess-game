import { form } from 'framer-motion/client'
import React from 'react'
import Pv1 from '../assets/1vs1.png'
import Pv2 from '../assets/online.png'
import Pv3 from '../assets/1vs Computer.png'
import Card from './Card'
const Menu = () => {
  return (
    <div className='card-mode-container'>
   
    <Card img={Pv2} text="Online" route='/online'/>
  
    <Card img={Pv1} text="1 vs 1" route='/play'/>
    <Card img={Pv3} text="1 vs Computer" route='/play'/>

    </div>
  )
}

export default Menu
