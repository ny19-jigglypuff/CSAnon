import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import SocketContext from "../context/SocketContext";
// import UserContext from '../context/UserContext';

export default function AnonIdChoicePage() {
  /*
    constructor (props) {
      super(props)
      this.state = {
        anonId : {username: ', userURL''},
        isLoading: true
      }
    }
  */
  const [anonId, setAnonId] = useState({ username: "", userURL: "" });
  const [isLoading, setIsLoading] = useState(true);
  const socket = useContext(SocketContext);

  // TEST !
  // const user = useContext(UserContext);

  const handleRerollClick = () => {
    //this.setState({isLoading: true})
    setIsLoading(true);
  };

  const handleGoToChatClick = () => {
    // TEST: save username in session storage ?
    // socket.emit("signin", { username: sessionStorage.getItem('username') });
    socket.emit("signin", { username: anonId.username });
  };

  const getNewId = () => {
    let rt = '/id';
    // console.log(req.session.username);
    // if (req.session.username) rt += '/pick';
    // fetch('/id')
    fetch(rt)
      .then(res => res.json())
      .then(result => {
        console.log(result);
        setIsLoading(false);
        setAnonId(result);
      });
  };

  //on initial render, get an ID asynchronously
  if (isLoading) {
    getNewId();
  }

  return (
    <div className="mainContainer anonChoice">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          {/* TODO: add log out functionality */}
          {/*<button>Log out of GitHub</button>*/}
          <img src={anonId.userURL} onError={handleRerollClick} />
          <p className="name">{anonId.username}</p>
          <div className="row">
            <button onClick={handleRerollClick}>Reroll new ID</button>
            <Link
              className="btn"
              to={{ pathname: "/chat", state: anonId }}
              onClick={handleGoToChatClick}
            >
              Go to chat
            </Link>
          </div>
        </>
      )}
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
