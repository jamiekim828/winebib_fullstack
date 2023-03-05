import React from 'react';

import './Footer.css';
import image from '../../assets/images/home5.webp';

export default function Footer() {
  return (
    <div className='subscribe-div'>
      <div
        className='subscription'
        style={{ backgroundImage: `url(${image})` }}
      >
        <h2 style={{ fontSize: '34px', color: 'black' }}>
          A smarter way to drink wine
        </h2>
        <p style={{ fontSize: '22px', fontWeight: '600', color: 'white' }}>
          Register to Winebib and get access to our most-loved wines at 20% off
          retail.
        </p>
        <div className='subscription-field'>
          <input type='email' placeholder='E-mail' />
          <button className='join-btn'>Join now</button>
        </div>
      </div>
      <div>
        <div className='footer'>
          <div className='column'>
            <p>SHOP</p>
            <h3>All wine</h3>
            <h3>Red</h3>
            <h3>White</h3>
            <h3>Sparkling</h3>
          </div>
          <div className='column' style={{borderRight:'1px solid', paddingRight: '5rem'}}>
            <p>WINEBIEB.</p>
            <h3>About</h3>
            <h3>Contact</h3>
            <h3>Shipping</h3>
          </div>
          <div className='column'>
            <p>ADDRESS & HOURS</p>
            <h3>
              Gezelligstraat 828
              <br />
              1000SY,Amsterdam
            </h3>
            <h3>
              Tue-Fri: 11:00-18:00
              <br />
              Sat: 11:00-17:00
              <br />
              Sun-Mon: Closed
            </h3>
          </div>
          <div className='column'>
            <p>COMMUNITY</p>
            <h3>Facebook</h3>
            <h3>Instagram</h3>
          </div>
        </div>
        <div className='footer-bottom'>
          <h1 style={{fontFamily: 'Rampart One',}}>WineBieb.</h1>
          <p>©2023 WineBieb.</p>
          <p>ALL RIGHTS RESERVED</p>
        </div>
      </div>
    </div>
  );
}
