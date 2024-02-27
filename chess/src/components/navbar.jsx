import React from 'react';
import icon from './assets/icon.svg'
import './navbar.css';

function Navbar() {
    return (
        <nav className="NavBar" >
           <div className='titles'>

            <img id='icon' src={icon} alt="icon" />
            {/* <p>Nouri chess</p> */}
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
    );
}
export default Navbar