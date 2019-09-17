import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { SocketService } from './socket';
import { ChatContext } from './socket/chat-context';
const chat = new SocketService();
ReactDOM.render(<ChatContext.Provider value={chat}> <App /></ChatContext.Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();