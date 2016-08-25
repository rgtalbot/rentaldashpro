// Function that pulls firebase values to build bar graph on the main overview page
function mainFinance() {

    database.ref('ownerProfiles/' + ownerKey + '/properties/').once('value').then(function (snapshot) {
        var nameData = [];
        var rentData = [];
        var expenseData = [];
        $.each(snapshot.val(), function (index, value) {
            if (value.status !== 'archived') {
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
        // new Chart(ctx).Bar(barData);
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

//function that builds cards based on the tab sort
function buildCardTabs() {

    database.ref('ownerProfiles/' + ownerKey + '/properties/').once('value').then(function (snapshot) {
        $('.ownerList').empty();
        $.each(snapshot.val(), function (index, value) {
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

// builds cards for the All tab
function buildCard() {
    database.ref('ownerProfiles/' + ownerKey + '/properties/').once('value').then(function (snapshot) {
        $('.ownerList').empty();
        $.each(snapshot.val(), function (index, value) {
            if (value.status !== 'archived') {
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

function propertyDetailsFunction() {
    userID = $(this).data('id');
    $('#page-content-wrapper').load('assets/ajax/property_details_template.html', function() {

        console.log(this);
        console.log(userID);
    })
}