import React from 'react'
import './playerStats.css';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';


const playerStats = ({player,setPlayer,active}) => {
 
  return (
    <div className={'card'}>
        <p className='playerName'>{player.name}</p>
      <div className='count'>
          <CountdownCircleTimer
            isPlaying={active}
            duration={player.timer}
            colors={["#00000"]}
            strokeWidth={2}
            size={0}
            onComplete={() => console.log('Timer completed')}
            onUpdate={(remainingTime) => setPlayer({...player,remainingTime}) }
            updateInterval={0.5}
         >
    {({ remainingTime }) =>Math.floor( remainingTime/60)+":"+  remainingTime%60}
        </CountdownCircleTimer>
      </div>
         <div className='pieces-taken'>
               {
                player.takeOvers.length >0 ?
                player.takeOvers.map(element =>{
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
               {
                player.score<=0?<></>:
                <p className='score'>
                   +{player.score}
                </p>
                  
               }
    </div>
  )
}

export  default  playerStats ;

