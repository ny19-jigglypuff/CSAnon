import socketIOClient, { connect } from 'socket.io-client';
const io = socketIOClient();

document.getElementById('root').addEventListener('click', () => {
  io.emit('message', 'sent a message');
});

// fetch('/api')
//   .then((res) => res.json())
//   .then(console.log);

console.log('hello world');
