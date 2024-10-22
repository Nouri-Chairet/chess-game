import { form } from 'framer-motion/client'
import React from 'react'
import Pv1 from '../assets/1vs1.png'
import Pv2 from '../assets/online.png'
import Pv3 from '../assets/1vs Computer.png'
import Card from './Card'
const Menu = () => {
  return (
    <div className='card-mode-container'>
    <Card img={Pv2} text="Online"/>
    <Card img={Pv1} text="1 vs 1"/>
    <Card img={Pv3} text="1 vs Computer"/>

    </div>
  )
}

export default Menu
