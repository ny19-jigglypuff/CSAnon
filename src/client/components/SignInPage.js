import React from 'react';

//{/* show github oauth button */ }
//{/* onclick, send to /auth/user endpoint */ }
//{/* server redirects client to auth url */ }
//{/* successful signin -> goes back to server */ }
//{/* backend will redirect the user to the front end, with github username and JWT cookie*/ }
//{/* if approved CS user, backend will redirect the user to the front end on '/', with JWT cookie */ }
//{/* if not approved CS user -> server should send back some error */ }

export default function SignInPage() {
  return (
    <div className='mainContainer signInPage'>
      <h1>ComplainSmith Anonymous</h1>
      <a href='/auth/user' className='githubBtn'>
        Sign in to GITHUB
      </a>
    </div>
  );
}
