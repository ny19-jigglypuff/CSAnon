//import socketIOClient, { connect } from 'socket.io-client';
import React from 'react';
import App from './components/App';
import { render } from 'react-dom';

//const io = socketIOClient();

//document.getElementById('root').addEventListener('click', () => {
//  io.emit('message', 'sent a message');
//});

render(<App />, document.getElementById('root'));
