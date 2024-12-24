import React from 'react';
import icon from '../assets/logo.jpg'
import '../styles/navbar.css';

function Navbar() {
    return (
        <div className='nav-container'>

        <nav className="NavBar" >
           <div className='titles'>
            
            <img id='icon' src={icon} alt="icon" />
          
           </div>
           <div className='buttons-container'>

            <div className='buttons'>
                <button className='primary-button'>1 Vs 1</button>
            </div>
            <div className='buttons'> 

                <button className='primary-button'>1 Vs PC</button>
            </div>
           </div>
            
        </nav>
        </div>
    );
}
export default Navbar