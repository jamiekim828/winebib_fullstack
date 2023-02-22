import React from 'react';

import './UserLogIn.css'

export default function UserLogIn() {
  return (
    <div className='user-page'>
      <h1>My account</h1>
      <div className='user-div'>
        <div className='login-div'>
          <h3>Log in</h3>
        </div>
        <div className='register-div'>
          <h3>Register</h3>
        </div>
      </div>
    </div>
  );
}
