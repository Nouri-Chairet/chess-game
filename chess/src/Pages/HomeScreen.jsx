import React from 'react';
import './Home.css';
import Header from '../Home/Header';
import Menu from '../Home/Menu';
const HomeScreen = () => {

  return (
  <div className='container-home'>
    <Header>Not all artists are Chess players, but all Chess players are artists</Header>
    <Menu/>
  </div>
  );
};

export default HomeScreen;
