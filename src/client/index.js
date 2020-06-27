//import socketIOClient, { connect } from 'socket.io-client';
import React from 'react';
import App from './components/App';
import { render } from 'react-dom';

//const io = socketIOClient();

/*
  sendMessage = {
  username: String,
  message: String,
  }
 * /
//document.getElementById('root').addEventListener('click', () => {
//  io.emit('message', 'sent a message');
//});


// /messages: receive an array of messages (approx. 100) // messageObject[]

/* messageObject = {
message: String,
username:  String,
userURL:  String,
timestamp: String (format will be h:mm a)
}
*/
// in.on('newMessage', messageObject)

render(<App />, document.getElementById('root'));
