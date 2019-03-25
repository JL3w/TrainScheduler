 // Initialize Firebase
 var config = {
    apiKey: "AIzaSyD2IpQtH4Ip9Xh2c3xuSxd3C24xFIS2NnA",
    authDomain: "train-app-1171a.firebaseapp.com",
    databaseURL: "https://train-app-1171a.firebaseio.com",
    projectId: "train-app-1171a",
    storageBucket: "train-app-1171a.appspot.com",
    messagingSenderId: "1016489823423"
  };
  firebase.initializeApp(config);
var database = firebase.database();
var provider = new firebase.auth.GoogleAuthProvider();
firebase.auth().signInWithRedirect(provider);
firebase.auth().getRedirectResult().then(function(result) {
    if (result.credential) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // ...
    }
    // The signed-in user info.
    var user = result.user;
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });