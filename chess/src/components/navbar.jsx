import React from 'react';

import './navbar.css';

function Navbar() {
    return (
        <nav className="NavBar" >
           <div className='titles'>

            <h3 className="title">&#9814;</h3>
            <p>Nouri chess</p>
           </div>
            <div className='buttons'>
                <button>1 Vs 1</button>
                <button>1 Vs PC</button>
            </div>
            
        </nav>
    );
}
export default Navbar