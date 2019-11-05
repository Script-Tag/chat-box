import React from 'react';
import ReactDOM from 'react-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import App from './App';
import * as serviceWorker from './serviceWorker';
import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyAF9FbjNqMpx-LMLYQlIvmirrjBPG65maA",
    authDomain: "chat-app-c8e3b.firebaseapp.com",
    databaseURL: "https://chat-app-c8e3b.firebaseio.com",
    projectId: "chat-app-c8e3b",
    storageBucket: "chat-app-c8e3b.appspot.com",
    messagingSenderId: "193941453700",
    appId: "1:193941453700:web:06e4162a1bf31cdbcf3bd1",
    measurementId: "G-32TVNYH2GW"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
//   firebase.analytics();

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
