import React from 'react'
import './playerStats.css';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

const playerStats = ({name,takeOvers,active}) => {
  const children = ({ remainingTime }) => {
    const minutes = Math.floor(remainingTime / 60)
    const seconds = remainingTime % 60
  
    return `${minutes}:${seconds}`
  }
  return (
    <div className={'card'}>
        <p className='playerName'>{name}</p>
      <div className='count'>
          <CountdownCircleTimer
            isPlaying={true}
            duration={600}
            colors={["#00000"]}
            strokeWidth={2}
            size={0}
            onComplete={() => console.log('Timer completed')}
            updateInterval={0.5} 
         >
    {({ remainingTime }) =>Math.trunc( remainingTime/60)+":"+  remainingTime%60}
        </CountdownCircleTimer>
      </div>
         <div className='pieces-taken'>
               {
                takeOvers.length >0 ?
                takeOvers.map(element =>{
                        return (
                            <img
                            height={40}
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

