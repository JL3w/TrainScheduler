$(document).ready(function(){
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
//var provider = new firebase.auth.GoogleAuthProvider();
//$("#submit").on("click", function(event) {
//    event.preventDefault();
    // firebase.auth().signInWithRedirect(provider);
    // firebase.auth().getRedirectResult().then(function(result) {
    //     if (result.credential) {
    //       // This gives you a Google Access Token. You can use it to access the Google API.
    //       var token = result.credential.accessToken;
    //       // ...
    //     }
    //     // The signed-in user info.
    //     var user = result.user;
    //   }).catch(function(error) {
    //     // Handle Errors here.
    //     var errorCode = error.code;
    //     var errorMessage = error.message;
    //     // The email of the user's account used.
    //     var email = error.email;
    //     // The firebase.auth.AuthCredential type that was used.
    //     var credential = error.credential;
    //     // ...
    //   });
   // });



   $("#add-train-btn").on("click", function() {
       event.preventDefault();

       tName = $("#name-input").val();
       tDest = $("#dest-input").val();
       tFreq = $("#freq-input").val();
       tFirst = $("#first-input").val();

       var newTrain = {
           name: tName,
           dest: tDest,
           freq: tFreq,
           first: tFirst
       };

       database.ref().push(newTrain);

       $("#name-input").val("");
       $("#dest-input").val("");
       $("#freq-input").val("");
       $("#first-input").val("");
   });

   database.ref().on("child_added", function(childSnapshot) {
    snap = childSnapshot.val();
    console.log(snap);
    
    var firstFirstTime = moment(snap.first, "HH:mm").subtract(1, "years");
    var diffTime = moment().diff(moment(firstFirstTime), "minutes");
    var tRemain = diffTime % snap.freq;
    var minTilTrain = snap.freq - tRemain;
    var nextTrain = moment().add(minTilTrain, "minutes");
    var preNextTrain = moment(nextTrain).format("MMM Do HH:mm");

    var newRow = $("<tr>").append(
        $("<td>").text(snap.name),
        $("<td>").text(snap.dest),
        $("<td>").text(snap.freq),
        $("<td>").text(preNextTrain),
        $("<td>").text(minTilTrain)
    );

    $("#sched > tbody").append(newRow);

});
});
