const express = require('express');
const path = require('path');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const PORT = process.env.PORT || 3000;

// app.get('/api', (req, res) => res.status(200).json('connected to back end'));

app.use('/api', (req, res) => {});

io.on('connect', (socket) => {
  socket.on('message', console.log);
  socket.on('disconnect', () => console.log('user disconnected'));
  console.log('a user connected');
});
app.get('/', (req, res) => res.sendFile(path.resolve(__dirname, '../client/index.html')));

http.listen(PORT, () => console.log(`listening on port ${PORT}`));
