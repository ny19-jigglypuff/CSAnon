import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function AnonIdChoicePage() {
  const [anonId, setAnonId] = useState({
    username: '',
    userURL: '', //TODO: make sure these are the same keys as in the /id res
  })
  const [isLoading, setIsLoading] = useState(true);

  const handleRerollClick = () => {
    setIsLoading(true);
    getNewId();
  }

  const getNewId = () => {
    //TODO: test this endpoint once middleware is set up
    fetch('/id')
      .then(res => res.json())
      .then(result => {
        //TODO: we are assuming result has this structure: {username, userURL}
        setAnonId(result);
        setIsLoading(false);
      })
  }

  //on initial render, get an ID asynchronously
  getNewId();

  return (
    <div className='mainContainer anonChoice'>
      {isLoading 
      ? <p>Loading...</p> 
      :
        <>
          {/* TODO: add log out functionality */}
          <button>Log out of GitHub</button>
          <img src={anonId.url} />
          <p className='name'>{anonId.name}</p>
          <button onClick={handleRerollClick}>Reroll new ID</button>
          <Link to={{path: '/chat', state: anonId}}>
            <button>Go to chat</button>
          </Link>
        </>
      }
    </div>
  )
}