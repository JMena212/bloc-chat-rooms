import * as firebase from 'firebase';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyDCqoibibgw-BzBSurWmYJuRpgXWUByeLY",
    authDomain: "bloc-chat-rooms-mena.firebaseapp.com",
    databaseURL: "https://bloc-chat-rooms-mena.firebaseio.com",
    projectId: "bloc-chat-rooms-mena",
    storageBucket: "bloc-chat-rooms-mena.appspot.com",
    messagingSenderId: "391599309588"
  };
var initFirebase = firebase.initializeApp(config);

export default initFirebase;
