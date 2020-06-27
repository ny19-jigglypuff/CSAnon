const path = require('path');
const express = require('express');
const app = express();
const http = require('http').createServer(app);

const githubRouter = require('./github/github');
const idsRouter = require('./ids/ids');
const messagesRouter = require('./messages/messages');

// will run on port 3000 for development,
// PORT env variable will be set and available at deployment
const PORT = process.env.PORT || 3000;

// requires a locally running redis instance
// install at https://redis.io/topics/quickstart
const redis = require('./redis/redis')();

// starts a socket.io server, wrapped around the server
// listening on PORT
const io = require('./ws/ws')(http);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/auth', githubRouter);
app.use('/id', idsRouter);

app.use('/messages', messagesRouter);

// serves the index.html file at the root route for initial get request
app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, '../client/index.html')));

http.listen(PORT, () => console.log(`listening on port ${PORT}`));
