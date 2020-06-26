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
  )
}