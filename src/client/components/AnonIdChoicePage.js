import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import SocketContext from '../context/SocketContext';

export default function AnonIdChoicePage() {
  const [anonId, setAnonId] = useState({
    username: '',
    userURL: '',
  })
  const [isLoading, setIsLoading] = useState(true);
  const socket = useContext(SocketContext);

  const handleRerollClick = () => {
    setIsLoading(true);
  }

  const handleGoToChatClick = () => {
    socket.emit('signin', { username: anonId.username });
  }

  const getNewId = () => {
    console.log('getNewId running');
    fetch('/id')
      .then(res => res.json())
      .then(result => {
        console.log(result)
        setIsLoading(false);
        setAnonId(result);
      })
  }

  //on initial render, get an ID asynchronously
  if (isLoading) { getNewId(); }

  return (
    <div className='mainContainer anonChoice'>
      {isLoading
        ? <p>Loading...</p>
        :
        <>
          {/* TODO: add log out functionality */}
          <button>Log out of GitHub</button>
          <img src={anonId.userURL} />
          <p className='name'>{anonId.username}</p>
          <button onClick={handleRerollClick}>Reroll new ID</button>
          <Link
            className='btn'
            to={{ pathname: '/chat', state: anonId }}
            onClick={handleGoToChatClick}>
            Go to chat
          </Link>
        </>
      }
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
