import React from 'react';
import './Home.css';
import Header from '../Home/Header';
import Menu from '../Home/Menu';
import KingCanvas from '../Home/King.jsx';
import StarsCanvas from '../Home/Stars.jsx';

const HomeScreen = () => {
  return (
    <div className='container-home'>
       <div style={{zIndex:'1'}}>
      <Header/>
      <Menu />
       </div>
        <KingCanvas />

      <div style={{ position: 'absolute', height: '100vh', width: '100vw',zIndex:'0' }}>
        <StarsCanvas number={900} />
      </div>
    </div>
  );
};

export default HomeScreen;
