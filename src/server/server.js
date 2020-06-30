const path = require('path');
const express = require('express');
// TEST !
const cookieSession = require('cookie-session');

const app = express();
const http = require('http').createServer(app);

const githubRouter = require('./github/github');
const idsRouter = require('./ids/ids');
const messagesRouter = require('./messages/messages');
const cookieParser = require('cookie-parser'); // npm install cookie-parser

// will run on port 3000 for development,
// PORT env variable will be set and available at deployment
const PORT = process.env.PORT || 3000;

// requires a locally running redis instance
// install at https://redis.io/topics/quickstart
const redis = require('./redis/redis');

// starts a socket.io server, wrapped around the server
// listening on PORT
const io = require('./ws/ws')(http);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser()); // we need to add this line to have a chance to read the req.cookies.


// ***** TEST *****
// app.set('trust proxy', 1); // trust first proxy

app.use(cookieSession({
  name: 'session',
  keys: ['key1'],

  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000, // 24 hours
  sameSite: true
}));

// ********************


// handles github OAuth flow
app.use('/auth', githubRouter);

// handles the registration of userIDs
app.use('/id', idsRouter);

// returns the list of messages stored in the message database
app.use('/messages', messagesRouter);

// serves the index.html file at the root route to allow React Router to
// handle all routes other than the ones defined above
app.get('/bundle.js', (req, res) => res.sendFile(path.resolve(__dirname, '../../dist/bundle.js')));
app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, '../../dist/index.html')));

http.listen(PORT, () => console.log(`listening on port ${PORT}`));
