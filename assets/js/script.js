// =========================================================
// Initialize Firebase
// =========================================================
var config = {
    apiKey: "AIzaSyBz1HP3qVgiI2CyXWFnKV6z9AKnM4CXJyE",
    authDomain: "rental-dash-pro.firebaseapp.com",
};

firebase.initializeApp(config);

// =========================================================
// Check currrent authenticated user.
// =========================================================
$(document).ready(function() {

    var user = firebase.auth().currentUser;

    if (user)
        $('.dashboard-btn').attr('href', 'dashboard.html').text('MY DASHBOARD');
    else
        $('.dashboard-btn').attr('href', 'login.html').text('LOGIN');

});
