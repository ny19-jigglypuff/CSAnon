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
//ShowAuthWindow({
//    path: "https://accounts.google.com/o/oauth2/auth?client_id=656984324806-sr0q9vq78tlna4hvhlmcgp2bs2ut8uj8.apps.googleusercontent.com&response_type=token&redirect_uri=https%3A%2F%2Fadodson.com%2Fhello.js%2Fredirect.html&state=%7B%22client_id%22%3A%22656984324806-sr0q9vq78tlna4hvhlmcgp2bs2ut8uj8.apps.googleusercontent.com%22%2C%22network%22%3A%22google%22%2C%22display%22%3A%22popup%22%2C%22callback%22%3A%22_hellojs_2u7fxpwv%22%2C%22state%22%3A%22%22%2C%22redirect_uri%22%3A%22https%3A%2F%2Fadodson.com%2Fhello.js%2Fredirect.html%22%2C%22scope%22%3A%22basic%22%7D&scope=https://www.googleapis.com/auth/plus.me%20profile",
//    callback: function()
//    {
//        console.log('callback');
//    }
//});