var count = 0,
    uniqueID,
    ownerKey,
    userID;

firebase.auth().onAuthStateChanged(function (user) {

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

$(function () {
    $('#add_prop_form').parsley().on('field:validated', function () {
        var ok = $('.parsley-error').length === 0;
        $('.bs-callout-info').toggleClass('hidden', !ok);
        $('.bs-callout-warning').toggleClass('hidden', ok);
    })
        .on('form:submit', function () {
            addProperty();
            $('#formModal').modal('toggle');
        });
});

function addProperty() {

    var property =
    {
        name: $('#prop_name').val().trim(),
        address: $('#prop_address').val().trim(),
        bedrooms: $('#prop_bed').val().trim(),
        bathrooms: $('#prop_bath').val().trim(),
        sqfeet: $('#prop_sqft').val().trim(),
        description: $('#prop_description').val().trim(),
        type: $('#prop_type').val(),
        image: 'https://firebasestorage.googleapis.com/v0/b/rental-dash-pro.appspot.com/o/starter.png?alt=media&token=ca604cf1-6b2a-4520-8ec4-fae63a6d50c1',
        status: $('#prop_status').val(),
        refID: 0
    };

    uniqueID = database.ref('ownerProfiles/' + ownerKey + '/properties/').push(property).key;
    database.ref('ownerProfiles/' + ownerKey + '/properties/' + uniqueID + '/refID/').set(uniqueID);
    console.log(uniqueID);

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

    return false;

};
