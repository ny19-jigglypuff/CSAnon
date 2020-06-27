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

//Authorization popup window code
//Example from:
//https://gist.github.com/asith-w/95d7f69e0e957bf72a5703ba45c6a9e8
function ShowAuthWindow(options) {
  console.log('ee');
  options.windowName = 'GitHubOAuth'; // should not include space for IE
  options.windowOptions = options.windowOptions || 'location=0,status=0,width=800,height=400';
  options.callback =
    options.callback ||
    function () {
      window.location.reload();
    };
  var that = this;
  console.log(options.path);
  that._oauthWindow = window.open(options.path, options.windowName, options.windowOptions);
  that._oauthInterval = window.setInterval(function () {
    if (that._oauthWindow.closed) {
      window.clearInterval(that._oauthInterval);
      options.callback();
    }
  }, 1000);
}

//create new oAuth popup window and monitor it
ShowAuthWindow({
  path: '/auth/user',
  callback: function () {
    console.log('callback');
  },
});
