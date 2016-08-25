var count = 0,
    uniqueID;

var ownerKey = firebase.auth().currentUser.uid;

$('#overViewButton').on('click', renderOverview);

function renderOverview() {
    $('#page-content-wrapper').load('assets/ajax/dashboard_overview_template.html', function () {
        buildCard();
        mainFinance();
    });
}


// Function that pulls firebase values to build bar graph on the main overview page
function mainFinance() {

    database.ref('ownerProfiles/'+ownerKey+'/properties/').once('value').then(function(snapshot) {
        var nameData = [];
        var rentData = [];
        var expenseData = [];
        $.each(snapshot.val(), function(index, value) {
            if (value.status !== 'archived')
            {
                var rent = value.financials.rent;
                var mortgage = value.financials.mortgage;
                var hoa = value.financials.hoa;
                var maint = value.financials.maint;
                var name = value.name;

                rent = parseFloat(rent).toFixed(2);
                mortgage = parseFloat(mortgage).toFixed(2);
                hoa = parseFloat(hoa).toFixed(2);
                maint = parseFloat(maint).toFixed(2);

                var rentTotal = 0,
                    expenseTotal = 0;

                rentTotal = (rentTotal + (parseFloat(rent))).toFixed(2);
                expenseTotal = (parseFloat(expenseTotal) + (parseFloat(mortgage))).toFixed(2);
                expenseTotal = (parseFloat(expenseTotal) + (parseFloat(hoa))).toFixed(2);
                expenseTotal = (parseFloat(expenseTotal) + (parseFloat(maint))).toFixed(2);
                expenseTotal = Number(expenseTotal);
                rentTotal = Number(rentTotal);

                rentData.push(rentTotal);
                expenseData.push(expenseTotal);
                nameData.push(name);
            }
        });
        console.log('rentData', rentData);
        console.log('expenseData', expenseData);
        console.log('nameData', nameData);
        // bar chart data
        var barData = {
            labels: nameData,
            datasets: [
                {
                    backgroundColor: "#408a82",
                    data: rentData,
                    label: 'INCOME'
                },
                {
                    backgroundColor: "#d6edec",
                    data: expenseData,
                    label: 'EXPENSES'
                }
            ]
        };
        // get bar chart canvas
        var ctx = document.getElementById("income").getContext("2d");
        // draw bar chart
        var chartInstance= new Chart(ctx, {
            type: 'bar',
            data: barData,
            options: {
                hover: {
                    mode: 'label'
                },
                legend: {
                }
            }
        });
        // new Chart(ctx).Bar(barData);
    });
}

var $build;

$('.tabList').on('click', function() {
    if ($(this).attr('id') == 'occupiedTab') {
        $(this).addClass('active activeTab');
        $('#allTab').removeClass('active activeTab');
        $('#vacantTab').removeClass('active activeTab');
        $('#archivedTab').removeClass('active activeTab');
        $build = 'occupied';
        buildCardTabs();
    } else if ($(this).attr('id') == 'vacantTab') {
        $(this).addClass('active activeTab');
        $('#allTab').removeClass('active activeTab');
        $('#occupiedTab').removeClass('active activeTab');
        $('#archivedTab').removeClass('active activeTab');
        $build = 'vacant';
        buildCardTabs();
    } else if ($(this).attr('id') == 'allTab') {
        $(this).addClass('active activeTab');
        $('#vacantTab').removeClass('active activeTab');
        $('#occupiedTab').removeClass('active activeTab');
        $('#archivedTab').removeClass('active activeTab');
        buildCard();
    } else if ($(this).attr('id') == 'archivedTab') {
        $(this).addClass('active activeTab');
        $('#allTab').removeClass('active activeTab');
        $('#occupiedTab').removeClass('active activeTab');
        $('#vacantTab').removeClass('active activeTab');
        $build = 'archived';
        buildCardTabs();
    }
});

function buildCardTabs() {

    database.ref('ownerProfiles/' + ownerKey + '/properties/').once('value').then(function (snapshot) {
        $('.ownerList').empty();
        $.each(snapshot.val(), function (index, value) {
            console.log('firebase', value.status);
            console.log('local', $build);
            if (value.status == $build) {
                var houseCol = $('<div>').addClass("col-xs-6 col-md-4 col-lg-3").attr('data-id', value.refID).on('click', testFunction);
                var houseDiv = $('<div>').addClass("rdp-photo-card-property");
                var houseImg = $('<img>').addClass("rdp-photo-card-img")
                    .attr("src", value.image);
                var houseDiv2 = $('<div>')
                    .addClass("caption");

                var housePara = $('<p>')
                    .addClass("text-center")
                    .text(value.address);

                housePara.appendTo(houseDiv2);
                houseImg.appendTo(houseDiv);
                houseDiv2.appendTo(houseDiv);
                houseDiv.appendTo(houseCol);
                $('.ownerList').append(houseCol);
            }
        });
    });
}


function buildCard() {

    database.ref('ownerProfiles/' + ownerKey + '/properties/').once('value').then(function (snapshot) {
        $('.ownerList').empty();
        $.each(snapshot.val(), function (index, value) {
            if (value.status !== 'archived') {
                var houseCol = $('<div>').addClass("col-xs-6 col-md-4 col-lg-3").attr('data-id', value.refID).on('click', testFunction);
                var houseDiv = $('<div>').addClass("rdp-photo-card-property");
                var houseImg = $('<img>').addClass("rdp-photo-card-img")
                    .attr("src", value.image);
                var houseDiv2 = $('<div>')
                    .addClass("caption");

                var housePara = $('<p>')
                    .addClass("text-center")
                    .text(value.address);

                housePara.appendTo(houseDiv2);
                houseImg.appendTo(houseDiv);
                houseDiv2.appendTo(houseDiv);
                houseDiv.appendTo(houseCol);
                $('.ownerList').append(houseCol);
            }
        });
    });
}

function testFunction() {
    var testID = $(this).data('id');
    console.log(testID);
    $('#page-content-wrapper').load('assets/ajax/property_details_template.html', function () {

        $("#editSaveBtn").on('click', function () {
            if ($(this).text() == "Save") {
                $(this).text('Edit');
                $('.financialDetailsInput').attr('disabled', true);
                $('#rent-input').attr('value', $('#rent-input').val());
                $('#mort-input').attr('value', $('#mort-input').val());
                $('#hoa-input').attr('value', $('#hoa-input').val());
                $('#maint-input').attr('value', $('#maint-input').val());

                var rent = $('#rent-input').val().trim();
                var mortgage = $('#mort-input').val().trim();
                var hoa = $('#hoa-input').val().trim();
                var maint = $('#maint-input').val().trim();

                rent = parseFloat(rent).toFixed(2);
                mortgage = parseFloat(mortgage).toFixed(2);
                hoa = parseFloat(hoa).toFixed(2);
                maint = parseFloat(maint).toFixed(2);

                database.ref('ownerProfiles/' + ownerKey + '/properties/' + testID + '/financials').set({
                    rent: rent,
                    mortgage: mortgage,
                    hoa: hoa,
                    maint: maint
                });

            } else if ($('#editSaveBtn').text() == "Edit") {
                $('#editSaveBtn').text('Save');
                $('.financialDetailsInput').removeAttr('disabled');
            }

        });


        database.ref('ownerProfiles/' + ownerKey + '/properties/' + testID).on("value", function (childSnapshot, key) {

            var propName = childSnapshot.val().name;
            var propAddress = childSnapshot.val().address;
            var propBed = childSnapshot.val().bedrooms;
            var propBath = childSnapshot.val().bathrooms;
            var propSqFt = childSnapshot.val().sqfeet;
            var propStatus = childSnapshot.val().status;
            var propImg = childSnapshot.val().image;
            var propDescription = childSnapshot.val().description;
            var propType = childSnapshot.val().type;

            database.ref('ownerProfiles/' + ownerKey + '/financials/' + testID + '/name/').set(propName);

            $('#bedroomDetail').html(propBed);
            $('#bathroomDetail').html(propBath);
            $('#sqfeetDetail').html(propSqFt);
            $('#occupancyDetail').html(propStatus);
            $('#descriptionDetails').html(propDescription);
            $('#nameDetails').html(propName);
            $('#detailImage').attr('src', propImg).attr('uid', testID);
            $('#addressDetail').html(propAddress);

            var rent = childSnapshot.val().financials.rent;
            var mortgage = childSnapshot.val().financials.mortgage;
            var hoa = childSnapshot.val().financials.hoa;
            var maint = childSnapshot.val().financials.maint;

            $('#rent-input').attr('value', rent);
            $('#mort-input').attr('value', mortgage);
            $('#hoa-input').attr('value', hoa);
            $('#maint-input').attr('value', maint);

            rent = Number(parseFloat(rent).toFixed(2));
            mortgage = Number(parseFloat(mortgage).toFixed(2));
            hoa = Number(parseFloat(hoa).toFixed(2));
            maint = Number(parseFloat(maint).toFixed(2));

            var profit = Number(parseFloat(rent - (maint + hoa + mortgage)).toFixed(2));
            var pieDataChart = [mortgage, hoa, maint, profit];

            // pie chart data
            var pieData = {

                labels: [
                    "MORTGAGE",
                    "HOA FEES",
                    "MAINTENANCE",
                    "PROFIT"
                ],
                datasets: [
                    {
                        data: pieDataChart,
                        backgroundColor: [
                            "#1b4556",
                            "#2b6970",
                            "#408a82",
                            "#d6edec"
                        ]
                    }]
            };
            // pie chart options
            var pieOptions = {
                legend: {
                    display: false
                },
                hover: {
                    mode: 'label'
                }
            };
            // get pie chart canvas
            var ctx = $('#financialDetails');
            // draw pie chart
            var myDoughnutChart = new Chart(ctx, {
                type: 'doughnut',
                data: pieData,
                options: pieOptions
            })

        });



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
