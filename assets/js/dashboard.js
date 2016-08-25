var count = 0,
    uniqueID,
    ownerKey,
    userID;

firebase.auth().onAuthStateChanged( function(user) {

    if (user) {
        ownerKey = user.uid;
        console.log("OWNER KEY: ", user.uid);
        renderOverview();
    } else {
        console.log("NO USER AUTHENTICATED!!!!!");
    }
});

$('#overViewButton').on('click', renderOverview);

function renderOverview() {
    $('#page-content-wrapper').load('assets/ajax/dashboard_overview_template.html', function () {
        buildCard();
        mainFinance();
    });
}



$('.modalAddBtn').click(function () {

    var property =
    {
        name: $('#prop_name').val().trim(),
        address: $('#prop_address').val().trim(),
        bedrooms: $('#prop_bed').val().trim(),
        bathrooms: $('#prop_bath').val().trim(),
        sqfeet: $('#prop_sqft').val().trim(),
        description: $('#prop_description').val().trim(),
        type: $('input:radio[name=propertyOptions]:checked').val(),
        image: 'https://firebasestorage.googleapis.com/v0/b/rental-dash-pro.appspot.com/o/starter.png?alt=media&token=ca604cf1-6b2a-4520-8ec4-fae63a6d50c1',
        status: 'vacant',
        refID: 0
    };
    console.log(property);
    validateForm(property);
    uniqueID = database.ref('ownerProfiles/' + ownerKey + '/properties/').push(property).key;
    database.ref('ownerProfiles/' + ownerKey + '/properties/' + uniqueID + '/refID/').set(uniqueID);
    console.log(uniqueID);

    console.log("count is before if : " + count);
    if (count == 6) {
        buildCard();
        $('#prop_name').val("");
        $('#prop_address').val("");
        $('#prop_bed').val("");
        $('#prop_bath').val("");
        $('#prop_sqft').val("");
        $('#prop_description').val("");
        $('#condo').prop('checked', false);
        $('#townHouse').prop('checked', false);
        $('#house').prop('checked', false);

    }
    return false;

});


function validateForm(property) {
    count = 0;
    countType = 0;


    if (property.propertyName == "") {

        alert("Please add a Property Name.");
        count = 0;
        // return false;
    } else {
        count++;
    }

    if (property.propertyAddress == "") {
        alert("Please add a Property Address.");
        count = 0;
        // return false;
    } else {
        count++;
    }

    if (property.bedrooms == "") {
        alert("Please add valid number for bedrooms.");
        count = 0;
        // return false;
    } else if (property.bedrooms <= 0) {
        alert("Please provide a value greater than zero.");
        count = 0;
    } else {
        count++;
    }

    if (property.bathroom == "") {
        alert("Please add a valid bathroom count.");
        count = 0;
        // return false;
    } else if (property.bathroom <= 0) {
        alert("Please provide a value greater than zero.");
        count = 0;
    } else {
        count++;
    }

    if (property.square == "") {
        alert("Please add a valid number for square feet");
        count = 0;
        // return false;
    } else if (property.square <= 0) {
        alert("Please provide a value greater than zero.");
        count = 0;
    } else {
        count++;
    }

    console.log("count is :" + count);

    if (property.type == "Condo" || property.type == "House" || property.type == "Townhouse") {
        count++;

        console.log(property.type);

    } else {
        alert("Please select one valid House type.");
        count = 0;
    }

}
