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

// =========================================================
// Initialize dashboard for current user.
// =========================================================
$(document).ready(function() {


});

// =========================================================
// CODE FROM OLD details.js FILE
// =========================================================

var uniqueID = "-KPdOsp8UGW7IzhyW2cE";

database.ref('properties/' + uniqueID).on("value", function (childSnapshot, key) {
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

$('#plus').on('click', function() { });

// =========================================================
// CODE FROM OLD overview.js FILE
// =========================================================

var count = 0,
    uniqueID;


$('.modalAddBtn').click(function() {

    var property =
    {
        name: $('#prop_name').val().trim(),
        address: $('#prop_address').val().trim(),
        bedrooms: $('#prop_bed').val().trim(),
        bathrooms: $('#prop_bath').val().trim(),
        sqfeet: $('#prop_sqft').val().trim(),
        description: $('#prop_description').val().trim(),
        type: $('input:radio[name=propertyOptions]:checked').val()
    };
    console.log(property);
    validateForm(property);
    uniqueID = database.ref('properties').push(property).key;
    console.log(uniqueID);

    console.log("count is before if : " + count);
    if(count==6){
        buildCard();
        $('#prop_name').val("");
        $('#prop_address').val("");
        $('#prop_bed').val("");
        $('#prop_bath').val("");
        $('#prop_sqft').val("");
        $('#prop_description').val("");
        $('#condo').prop('checked' , false);
        $('#townHouse').prop('checked' , false);
        $('#house').prop('checked' , false);

    }
    return false;

});

function validateForm(property){
    count =0;
    countType =0;

    if (property.propertyName==""){

        alert("Please add a Property Name.");
        count=0;
        // return false;
    }else {
        count++;
    }

    if (property.propertyAddress==""){
        alert("Please add a Property Address.");
        count=0;
        // return false;
    }else {
        count++;
    }

    if (property.bedrooms==""){
        alert("Please add valid number for bedrooms.");
        count=0;
        // return false;
    }else if (property.bedrooms<=0){
        alert("Please provide a value greater than zero.");
        count=0;
    }else {
        count++;
    }

    if (property.bathroom==""){
        alert("Please add a valid bathroom count.");
        count=0;
        // return false;
    }else if (property.bathroom<=0){
        alert("Please provide a value greater than zero.");
        count=0;
    }else {
        count++;
    }

    if (property.square==""){
        alert("Please add a valid number for square feet");
        count=0;
        // return false;
    }else if (property.square<=0){
        alert("Please provide a value greater than zero.");
        count=0;
    }else {
        count++;
    }

    console.log("count is :" + count);

    if (property.type == "Condo" || property.type == "House" || property.type == "Townhouse" ){
        count++;

        console.log(property.type);

    }else {
        alert("Please select one valid House type.");
        count=0;
    }

    // if(property.condo == "true" || property.townHouse == "true" || property.house == "true"){
    //     countType++;
    //
    //     console.log("countype is: " + countType);
    //     // return false;
    // }
    //
    // if(countType >= 1){
    //     count++;
    // } else{
    //     alert("Please select one valid House type.");
    //     count =0;
    //     countType = 0;
    // }
}

function buildCard() {
    var houseCol = $('<div>').addClass("col-xs-6 col-md-4 col-lg-3");

    var houseDiv = $('<div>').addClass("rdp-photo-card-property");

    var houseImg = $('<img>').addClass("rdp-photo-card-img")
        .attr("src", "assets/images/house2.jpg");

    var houseDiv2 = $('<div>')
        .addClass("caption");

    var housePara = $('<p>')
        .addClass("text-center")
        .text("Information about this property");

    housePara.appendTo(houseDiv2);
    houseImg.appendTo(houseDiv);
    houseDiv2.appendTo(houseDiv);
    houseDiv.appendTo(houseCol);

    $('.ownerList').prepend(houseCol);

    $('.modal').modal('toggle');
}
