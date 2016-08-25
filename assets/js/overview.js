// Function that pulls firebase values to build bar graph on the main overview page
function mainFinance() {

    database.ref('ownerProfiles/' + ownerKey + '/properties/').once('value').then(function (snapshot) {



        //interate through properties to get financials for bar chart
        $.each(snapshot.val(), function (index, value) {
            console.log(snapshot.val())
            // check to make sure that the property is not archived first
            if (value.status !== 'Archived') {

                // set variables based in information in firebase and convert to numbers
                var rent = Number(value.financials.rent),
                    mortgage = Number(value.financials.mortgage),
                    hoa = Number(value.financials.hoa),
                    maint = Number(value.financials.maint);

                //set the name var base on the property name given from firebase
                var name = value.propertydetails.name;

                //add up the expenses
                var expenseTotal = mortgage + hoa + maint;

                //push the rent, expenses, and name to arrays to use for bar chart
                if (rent !== 0 && expenseTotal !== 0) {
                    rentData.push(rent);
                    expenseData.push(expenseTotal);
                    nameData.push(name);
                }
            }
        });
        barChartBuild();

    });
}

//variables for bar chart
var nameData = [];
var rentData = [];
var expenseData = [];

//function that builds bar chart
function barChartBuild() {
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

// get bar chart canvas location in the html
    var ctx = $('#income');

// draw bar chart
    var chartInstance = new Chart(ctx, {
        type: 'bar',
        data: barData,
        options: {
            hover: {
                mode: 'label'
            },
            legend: {}
        }
    });

}
//function that filters through tabs
var $build;

$('.tabList').on('click', function () {
    if ($(this).attr('id') == 'occupiedTab') {
        $(this).addClass('active activeTab');
        $('#allTab').removeClass('active activeTab');
        $('#vacantTab').removeClass('active activeTab');
        $('#archivedTab').removeClass('active activeTab');
        $build = 'Occupied';
        buildCardTabs();
    } else if ($(this).attr('id') == 'vacantTab') {
        $(this).addClass('active activeTab');
        $('#allTab').removeClass('active activeTab');
        $('#occupiedTab').removeClass('active activeTab');
        $('#archivedTab').removeClass('active activeTab');
        $build = 'Vacant';
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

//function that builds cards based on the tab sort
function buildCardTabs() {

    database.ref('ownerProfiles/' + ownerKey + '/properties/').once('value').then(function (snapshot) {
        $('.ownerList').empty();
        $.each(snapshot.val(), function (index, value) {
            if (value.propertydetails.status == $build) {
                var houseCol = $('<div>').addClass("col-xs-6 col-md-4 col-lg-3").attr('data-id', value.refID).on('click', propertyDetailsFunction);
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

// builds cards for the All tab
function buildCard() {
    database.ref('ownerProfiles/' + ownerKey + '/properties/').once('value').then(function (snapshot) {
        $('.ownerList').empty();
        $.each(snapshot.val(), function (index, value) {
            if (value.propertydetails.status !== 'Archived') {
                console.log(value.address);
                var houseCol = $('<div>').addClass("col-xs-6 col-md-4 col-lg-3").attr('data-id', value.refID).on('click', propertyDetailsFunction);
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


//loads the property details template page when a property is clicked
function propertyDetailsFunction() {
    userID = $(this).data('id');
    $('#page-content-wrapper').load('assets/ajax/property_details_template.html', function () {

    });
}