import React from 'react'
import './playerStats.css';
const playerStats = ({name,takeOvers}) => {
  return (
    <div className='container'>
        <p>{name}</p>
         <div className='pieces-taken'>
               {
                takeOvers.length >0 ?
                takeOvers.map(element =>{
                        return (
                                <img
                                height={30}
                                className="piece"
                                src={element.image}
                                alt={element.name}
                                /> 
                        ) 
                }) :<></>
               }
               
         </div>
    </div>
  )
}

export  default  playerStats ;

