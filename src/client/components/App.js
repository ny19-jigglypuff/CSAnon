import React from 'react';
import { BrowserRouter, Switch, Route, } from 'react-router-dom';
import AnonIdChoicePage from './AnonIdChoicePage';
import MainChat from './MainChat';

//loggedIn = is there access token in browser
//if loggedIn
  // render AnonChoiceIdPage component
//if not loggedIn
  // redirect to /signin

const loggedIn = true; //temporary

//need more details about how OAuth returns values

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        {/* csanon.com */}
        <Route exact path="/">
          {loggedIn ? <AnonIdChoicePage /> : <Redirect to="/signin" />}
        </Route>
        {/* csanon.com/signin */}
        <Route path='/signin'>
          {/* show github oauth button */}
          {/* if not successful signin -> server should send back some error */}
          {/* if signin -> we set the the cookie, redirect to '/'? */}
        </Route>
        {/* csanon.com/chat */}
        <Route path='/chat'>
          <MainChat />
        </Route>
      </Switch>
    </BrowserRouter>

  )
}