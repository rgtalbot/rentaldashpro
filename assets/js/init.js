// =========================================================
// Initialize Firebase
// =========================================================
var config = {
    apiKey: "AIzaSyBz1HP3qVgiI2CyXWFnKV6z9AKnM4CXJyE",
    authDomain: "rental-dash-pro.firebaseapp.com",
    databaseURL: "https://rental-dash-pro.firebaseio.com",
    storageBucket: "rental-dash-pro.appspot.com",
};

firebase.initializeApp(config);

var database = firebase.database();
var authData = firebase.auth();
