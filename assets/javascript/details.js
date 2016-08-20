// Initialize Firebase
var config = {
    apiKey: "AIzaSyBz1HP3qVgiI2CyXWFnKV6z9AKnM4CXJyE",
    authDomain: "rental-dash-pro.firebaseapp.com",
    databaseURL: "https://rental-dash-pro.firebaseio.com",
    storageBucket: "rental-dash-pro.appspot.com",
};
firebase.initializeApp(config);

var database = firebase.database();
var uniqueID = "-KPdOsp8UGW7IzhyW2cE";
database.ref('properties/'+uniqueID).on("value", function (childSnapshot, key) {

    var propName = childSnapshot.val().name;
    var propAddress = childSnapshot.val().address;
    var propBed = childSnapshot.val().bedrooms;
    var propBath = childSnapshot.val().bathrooms;
    var propSqFt = childSnapshot.val().sqfeet;
    var propStatus = childSnapshot.val().status;
    var propImg = childSnapshot.val().image;
    var propDescription = childSnapshot.val().description;
    var propType = childSnapshot.val().type;

    $('#bedroomDetail').html(propBed);
    $('#bathroomDetail').html(propBath);
    $('#sqfeetDetail').html(propSqFt);
    $('#occupancyDetail').html(propStatus);
    $('#descriptionDetails').html(propDescription);
    $('#nameDetails').html(propName);
    $('#detailImage').attr('src', propImg);
    $('#addressDetail').html(propAddress);

});


$('#plus').on('click', function() {



});
