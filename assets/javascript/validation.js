var validated = false;
var count = 0 ;
var countType = 0;
<<<<<<< HEAD

$('.modalAddBtn').click(function() {
    console.log('add button clicked, add property');

   

    console.log("count is : " + count);

    validateForm();


        console.log("count is before if : " + count);
    if(count==6){

        var houseCol = $('<div>').addClass("col-xs-6 col-md-4 col-lg-3");

        var houseDiv = $('<div>').addClass("thumbnail");

        var houseImg = $('<img>').addClass("img-responsive")
            .attr("src", "assets/images/house2.jpg");

        var houseDiv2 = $('<div>')
            .addClass("caption");

        var housePara = $('<p>')
            .addClass("text-center")
            .text("Simple Information about this house");

        housePara.appendTo(houseDiv2);
        houseImg.appendTo(houseDiv);
        houseDiv2.appendTo(houseDiv);
        houseDiv.appendTo(houseCol);


        $('.ownerList').prepend(houseCol);

        $('.modal').modal('toggle');



    }

    // function authWithPassword(userObj) {
    //     var deferred = $.Deferred();
    //     console.log(userObj);
    //     rootRef.authWithPassword(userObj, function onAuth(err, user) {
    //         if (err) {
    //             deferred.reject(err);
    //         }

    //         if (user) {
    //             deferred.resolve(user);
    //         }

    //     });

    //     return deferred.promise();
    // }

=======

$('.modalAddBtn').click(function() {
    var property =
    {
        propertyName: $('#prop_name').val().trim(),
        propertyAddress: $('#prop_address').val().trim(),
        bedrooms: $('#prop_bed').val().trim(),
        bathrooms: $('#prop_bath').val().trim(),
        square: $('#prop_sqft').val().trim(),
        details: $('#prop_description').val().trim(),
        condo: $('#condo').checked.toString(),
        townHouse: $('#townHouse').checked.toString(),
        house: $('#house').checked.toString()
    };

    validateForm(property);
    database.ref().push(property);


    console.log("count is before if : " + count);
    if(count==6){
        buildCard();

    }
>>>>>>> bb871a8a99657ef2f07f7ae3e16082fbb99a0437
    return false;

});


function validateForm(property){
    count =0;
    countType =0;


<<<<<<< HEAD
function validateForm(){
    count =0;
    countType =0;

    console.log("count: "+ count);

    var propertyName = document.getElementById('prop_name').value;
    if(propertyName==""){

=======
    if(property.propertyName==""){

>>>>>>> bb871a8a99657ef2f07f7ae3e16082fbb99a0437
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

<<<<<<< HEAD
    var condo = document.getElementById('condo').checked.toString();
    console.log("condo: "+ condo);
    var townHouse = document.getElementById('townHouse').checked.toString();
    console.log("townHouse: "+ townHouse);
    var house = document.getElementById('house').checked.toString();
    console.log("HOUSE: "+ house);
  

    if(condo == "true" || townHouse == "true" || house == "true"){
=======

    if(property.condo == "true" || property.townHouse == "true" || property.house == "true"){
>>>>>>> bb871a8a99657ef2f07f7ae3e16082fbb99a0437
        countType++;

        console.log("countype is: " + countType);
        // return false;
    }

    if(countType >= 1){
        count++;
    } else{
        alert("Please select one valid House type.");
        count =0;
        countType = 0;
    }



<<<<<<< HEAD
    
=======

>>>>>>> bb871a8a99657ef2f07f7ae3e16082fbb99a0437
}
