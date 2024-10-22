import React from 'react'
import '../Pages/Home.css'
const Card = ({img,text}) => {
  return (
    <div  className="card-mode">
      
        <img src={img} alt="image" height={470} width={340} />
         <div className='card-text-container'>
              <h1 className='mode'>{text}</h1> 
         </div>
        
    </div>
  )
}

export default Card
