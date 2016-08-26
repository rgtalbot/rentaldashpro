var uniqueID,
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

// function to render the main dashboard
function renderOverview() {
    $('#page-content-wrapper').load('assets/ajax/dashboard_overview_template.html', function () {
        buildCard();
        mainFinance();
        renderTodoList();
    });
}

// function validates the add property form
$(function () {
    $('#add_prop_form').parsley().on('field:validated', function () {
        var ok = $('.parsley-error').length === 0;
        $('.bs-callout-warning').toggleClass('hidden', ok);
    })
        .on('form:submit', function () {
            addProperty();
            $('#add_prop_form').parsley().reset();
            $('#formModal').modal('hide');

        });
});


// function that runs to add property once form is validated
function addProperty() {
    //variables for the form fields
    var name = $('#prop_name'),
        address = $('#prop_address'),
        beds = $('#prop_bed'),
        bath = $('#prop_bath'),
        sqft = $('#prop_sqft'),
        desc = $('#prop_description'),
        type = $('#prop_type'),
        status = $('#prop_status');


    //building the object with the form information for firebase
    var property =
    {
        address: address.val().trim(),
        propertydetails: {
            name: name.val().trim(),
            bedrooms: beds.val().trim(),
            bathrooms: bath.val().trim(),
            sqfeet: sqft.val().trim(),
            description: desc.val().trim(),
            type: type.val(),
            status: status.val()
        },
        financials: {
            rent: 0,
            mortgage: 0,
            hoa: 0,
            maint: 0
        },
        image: 'https://firebasestorage.googleapis.com/v0/b/rental-dash-pro.appspot.com/o/starter.png?alt=media&token=ca604cf1-6b2a-4520-8ec4-fae63a6d50c1',
        refID: 0
    };

    //pushing the property object to firebase and logging the unique key created
    uniqueID = database.ref('ownerProfiles/' + ownerKey + '/properties/').push(property).key;

    //setting a value in the property on firebase of the uid to be used later
    database.ref('ownerProfiles/' + ownerKey + '/properties/' + uniqueID + '/refID/').set(uniqueID);

    // run the build card function
    buildCard();

    //refresh bar chart
    barChartBuild();


    // empty the form values
    name.val("");
    address.val("");
    beds.val("");
    bath.val("");
    sqft.val("");
    desc.val("");
    type.val('');
    status.val('');

    return false;

}
