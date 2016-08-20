var validated = false;
var count = 0 ;
var countType = 0;

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


    if(property.condo == "true" || property.townHouse == "true" || property.house == "true"){
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




}
