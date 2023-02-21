import React from 'react';
import { Link } from 'react-router-dom';
import './Main.css'

import party from '../../assets/images/party.jpeg'

export default function Main() {
  return (
    <div className='hero-container'>
      <div className='hero' style={{backgroundImage:`url(${party})`}}></div>
      <div className='hero-stuff'>
        <h1>I love wine</h1>
        <Link to='/all-wine' className='main-btn'>perfect wine for you</Link>
      </div>
    </div>
  );
}
