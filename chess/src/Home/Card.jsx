import React,{useContext} from 'react'
import '../Pages/Home.css'
import { NavLink } from 'react-router-dom'
import { ModeContext } from '../main.jsx';

const Card = ({img,text,route='/play'}) => {
  const {mode,setMode}=useContext(ModeContext);
  return (
    <div  className="card-mode">
        <NavLink to={route} onClick={()=>{
            setMode(text)
        }}>
        <img src={img} alt="image" height={470} width={340} />
         <div className='card-text-container'>
              <h1 className='mode'>{text}</h1> 
         </div>
        </NavLink>
        
    </div>
  )
}

export default Card
