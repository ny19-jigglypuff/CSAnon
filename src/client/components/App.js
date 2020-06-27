import React from 'react';
import { BrowserRouter, Switch, Route, } from 'react-router-dom';
import AnonIdChoicePage from './AnonIdChoicePage';
import MainChat from './MainChat';

//loggedIn = is there access token in browser
//if loggedIn
  // render AnonChoiceIdPage component
//if not loggedIn
  // redirect to /signin



export default function App() {
  const loggedIn = true; //TODO: check if jwt cookie exists or not
  console.log('App.js: theoretically checking cookie');
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
          {/* onclick, GET request on /auth endpoint to get auth URL */}
          {/* user leaves page, goes to github to sign in */}
          {/* successful signin -> goes back to server */}
          {/* backend will redirect the user to the front end, with github username and JWT cookie*/}
          {/* if approved CS user, backend will redirect the user to the front end on '/', with JWT cookie */}
          {/* if not approved CS user -> server should send back some error */}
        </Route>
        {/* csanon.com/chat */}
        <Route path='/chat' render={(props) => <MainChat {...props} />}>
        </Route>
      </Switch>
    </BrowserRouter>
  )
}