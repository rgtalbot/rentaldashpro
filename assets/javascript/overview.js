// Initialize Firebase
var config = {
    apiKey: "AIzaSyBz1HP3qVgiI2CyXWFnKV6z9AKnM4CXJyE",
    authDomain: "rental-dash-pro.firebaseapp.com",
    databaseURL: "https://rental-dash-pro.firebaseio.com",
    storageBucket: "rental-dash-pro.appspot.com",
};
firebase.initializeApp(config);

var database = firebase.database();

console.log()


var validated = false;
var count = 0 ;
var countType = 0;

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
    database.ref('properties').push(property);


    console.log("count is before if : " + count);
    if(count==5){
        buildCard();

    }
    return false;

});



function validateForm(property){
    count =0;
    countType =0;


    if(property.propertyName==""){

        alert("Please add a Property Name.");
        count=0;
        // return false;
    }else {
        count++;
    }

    if(property.propertyAddress==""){
        alert("Please add a Property Address.");
        count=0;
        // return false;
    }else {
        count++;
    }

    if(property.bedrooms==""){
        alert("Please add valid number for bedrooms.");
        count=0;
        // return false;
    }else if(property.bedrooms<=0){
        alert("Please provide a value greater than zero.");
        count=0;
    }else {
        count++;
    }

    if(property.bathroom==""){
        alert("Please add a valid bathroom count.");
        count=0;
        // return false;
    }else if(property.bathroom<=0){
        alert("Please provide a value greater than zero.");
        count=0;
    }else {
        count++;
    }

    if(property.square==""){
        alert("Please add a valid number for square feet");
        count=0;
        // return false;
    }else if(property.square<=0){
        alert("Please provide a value greater than zero.");
        count=0;
    }else {
        count++;
    }

    console.log("count is :" + count);


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