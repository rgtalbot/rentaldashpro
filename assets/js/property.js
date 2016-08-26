var fileButton = document.getElementById('filePath');
var storageRef;

fileButton.addEventListener('change', function (e) {
    var file = e.target.files[0];
    var propID = $('#detailImage').attr('uid');
    storageRef = firebase.storage().ref('house_photos/' + firebase.auth().currentUser.uid + '/' + propID);

    var task = storageRef.put(file).then(function () {
        storageRef.getDownloadURL().then(function (url) {
            $('#picModal').modal('hide');

            console.log(propID);
            database.ref('ownerProfiles/' + ownerKey + '/properties/' + propID + '/image/').set(url);
        });
    });

});

//on click to edit property details
var test = 0;
$("#editPropDetails").on('click', function () {
    if (test == 0) {
        $('.propStats').removeAttr('disabled');
        test = 1;
    } else if (test == 1) {
        $('.propStats').attr('disabled', true);
        var name = $('#name-input').val().trim(),
            beds = $('#bed-input').val(),
            bath = $('#bath-input').val(),
            sqft = $('#sqft-input').val(),
            status = $('#status-input').val(),
            type = $('#type-input').val(),
            description = $('#description-input').val().trim();
        database.ref('ownerProfiles/' + ownerKey + '/properties/' + userID + '/propertydetails').set({
            name: name,
            bedrooms: beds,
            bathrooms: bath,
            sqfeet: sqft,
            status: status,
            type: type,
            description: description
        });

        test = 0;
    }
});

$("#editSaveBtn").on('click', function () {
    if ($(this).text() == "Save") {
        $(this).text('Edit');
        $('.financialDetailsInput').attr('disabled', true);
        var rent = $('#rent-input').val().trim(),
            mortgage = $('#mort-input').val().trim(),
            hoa = $('#hoa-input').val().trim(),
            maint = $('#maint-input').val().trim();

        rent = parseFloat(rent).toFixed(2);
        mortgage = parseFloat(mortgage).toFixed(2);
        hoa = parseFloat(hoa).toFixed(2);
        maint = parseFloat(maint).toFixed(2);

        database.ref('ownerProfiles/' + ownerKey + '/properties/' + userID + '/financials').set({
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

database.ref('ownerProfiles/' + ownerKey + '/properties/' + userID).on("value", function (snapshot, key) {

    var propName = snapshot.val().propertydetails.name,
        propAddress = snapshot.val().address,
        propBed = snapshot.val().propertydetails.bedrooms,
        propBath = snapshot.val().propertydetails.bathrooms,
        propSqFt = snapshot.val().propertydetails.sqfeet,
        propStatus = snapshot.val().propertydetails.status,
        propImg = snapshot.val().image,
        propDescription = snapshot.val().propertydetails.description,
        propType = snapshot.val().propertydetails.type,

        rent = snapshot.val().financials.rent,
        mortgage = snapshot.val().financials.mortgage,
        hoa = snapshot.val().financials.hoa,
        maint = snapshot.val().financials.maint;

    $('#bed-input').attr('value', propBed);
    $('#bath-input').attr('value', propBath);
    $('#sqft-input').attr('value', propSqFt);
    $('#name-input').attr('value', propName);
    $('#status-input').val(propStatus);
    $('#type-input').val(propType);
    $('#description-input').val(propDescription);
    // $('#descriptionDetails').html(propDescription);
    $('#detailImage').attr('src', propImg).attr('uid', userID);
    $('#addressDetail').html(propAddress);

    $('#rent-input').attr('value', rent);
    $('#mort-input').attr('value', mortgage);
    $('#hoa-input').attr('value', hoa);
    $('#maint-input').attr('value', maint);

    rent = Number(parseFloat(rent).toFixed(2));
    mortgage = Number(parseFloat(mortgage).toFixed(2));
    hoa = Number(parseFloat(hoa).toFixed(2));
    maint = Number(parseFloat(maint).toFixed(2));

    var profit = Number(parseFloat(rent - (maint + hoa + mortgage)).toFixed(2));
    console.log(profit);
    var pieDataChart = [mortgage, hoa, maint, profit];
    console.log(pieDataChart);

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
