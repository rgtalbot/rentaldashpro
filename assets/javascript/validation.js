var validated = false;
var count = 0 ;

$(document).on("click",".modalAddBtn",function(e) {
    console.log('add button clicked, add property');

    e.preventDefault();

    validateForm();

    if(count==5){

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

    function authWithPassword(userObj) {
        var deferred = $.Deferred();
        console.log(userObj);
        rootRef.authWithPassword(userObj, function onAuth(err, user) {
            if (err) {
                deferred.reject(err);
            }

            if (user) {
                deferred.resolve(user);
            }

        });

        return deferred.promise();
    }

});



function validateForm(){

    var propertyName = document.getElementById('prop_name').value;
    if(propertyName==""){
        alert("Please add a Property Name.");
        count=0;
        // return false;
    }else {
        count++;
    }
    var propertyAddress = document.getElementById('prop_address').value;
    if(propertyAddress==""){
        alert("Please add a Property Address.");
        count=0;
        // return false;
    }else {
        count++;
    }
    var bedrooms = document.getElementById('prop_bed').value;
    if(bedrooms==""){
        alert("Please add valid number for bedrooms.");
        count=0;
        // return false;
    }else if(bedrooms<=0){
        alert("Please provide a value greater than zero.");
        count=0;
    }else {
        count++;
    }
    var bathroom = document.getElementById('prop_bath').value;
    if(bathroom==""){
        alert("Please add a valid bathroom count.");
        count=0;
        // return false;
    }else if(bathroom<=0){
        alert("Please provide a value greater than zero.");
        count=0;
    }else {
        count++;
    }
    var square = document.getElementById('prop_sqft').value;
    if(square==""){
        alert("Please add a valid number for square feet");
        count=0;
        // return false;
    }else if(square<=0){
        alert("Please provide a value greater than zero.");
        count=0;
    }else {
        count++;
    }

    console.log("count is :" + count);

}