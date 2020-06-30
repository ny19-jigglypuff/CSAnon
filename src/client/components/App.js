import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import io from 'socket.io-client';
import SocketContext from '../context/SocketContext';
import AnonIdChoicePage from './AnonIdChoicePage';
import SignInPage from './SignInPage';
import MainChat from './MainChat';
import UserContext from '../context/UserContext';

//loggedIn = is there access token in browser
//if loggedIn
// render AnonChoiceIdPage component
//if not loggedIn
// redirect to /signin

const socket = io();

export default function App() {
  //Check if cookie called 'token' exists in browser
  const loggedIn = document.cookie.split(';').some((item) => item.trim().startsWith('token='));

  // TEST! wrap BrowserRouter in UserContext Provider ?!
  // <UserContext.Provider value={}></UserContext.Provider>

  return (
    //Provide the Context to the App by wrapping it in a Provider
    //The value prop will be available to all the child Components via the useContext hook
    <SocketContext.Provider value={socket}>
      <BrowserRouter>
        <Switch>
          {/* csanon.com */}
          <Route exact path='/'>
            {loggedIn ? <AnonIdChoicePage /> : <Redirect to='/signin' />}
          </Route>
          {/* csanon.com/signin */}
          <Route exact path='/signin'>
            <SignInPage />
          </Route>
          {/* csanon.com/chat */}
          <Route path='/chat' render={(props) => <MainChat {...props} />}></Route>
        </Switch>
      </BrowserRouter>
    </SocketContext.Provider>
  );
}
