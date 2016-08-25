var fileButton = document.getElementById('filePath');
var storageRef;

fileButton.addEventListener('change', function (e) {
    var file = e.target.files[0];

    storageRef = firebase.storage().ref('house_photos/' + firebase.auth().currentUser.uid + '/' + file.name);

    var task = storageRef.put(file).then(function () {
        storageRef.getDownloadURL().then(function (url) {
            $('#picModal').modal('hide');
            var propID = $('#detailImage').attr('uid');
            console.log(propID);
            database.ref('ownerProfiles/' + ownerKey + '/properties/' + propID + '/image/').set(url);
        });
    });

});


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

console.log(userID);
console.log(ownerKey);
database.ref('ownerProfiles/' + ownerKey + '/properties/' + userID).on("value", function (childSnapshot, key) {

    var propName = childSnapshot.val().name;
    var propAddress = childSnapshot.val().address;
    var propBed = childSnapshot.val().bedrooms;
    var propBath = childSnapshot.val().bathrooms;
    var propSqFt = childSnapshot.val().sqfeet;
    var propStatus = childSnapshot.val().status;
    var propImg = childSnapshot.val().image;
    var propDescription = childSnapshot.val().description;
    var propType = childSnapshot.val().type;

    database.ref('ownerProfiles/' + ownerKey + '/financials/' + userID + '/name/').set(propName);

    $('#bedroomDetail').html(propBed);
    $('#bathroomDetail').html(propBath);
    $('#sqfeetDetail').html(propSqFt);
    $('#occupancyDetail').html(propStatus);
    $('#descriptionDetails').html(propDescription);
    $('#nameDetails').html(propName);
    $('#detailImage').attr('src', propImg).attr('uid', userID);
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
