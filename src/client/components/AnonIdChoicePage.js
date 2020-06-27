import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function AnonIdChoicePage() {
  return (
    <div className='mainContainer anonChoice'>
      <button>Log out of GitHub</button>
      <img />
      <p className='name'></p>
      <button>Reroll new ID</button>
      <Link to='/chat'>
        <button>Go to chat</button>
      </Link>
    </div>
  );
}

/*

Receive from '/id/ endpoint:

userID = {
  username: String,
  userURL: String,
}

**keep username in session storage**

on go to chat, submit username to '/id/pick/' (will register in redis)

*/
