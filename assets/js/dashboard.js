// =========================================================
// Initialize Firebase
// =========================================================
// var config = {
//     apiKey: "AIzaSyBz1HP3qVgiI2CyXWFnKV6z9AKnM4CXJyE",
//     authDomain: "rental-dash-pro.firebaseapp.com",
//     databaseURL: "https://rental-dash-pro.firebaseio.com",
//     storageBucket: "rental-dash-pro.appspot.com",
// };
//
// firebase.initializeApp(config);

var database = firebase.database();
var authData = firebase.auth();


var count = 0,
    uniqueID,
    // ownerKey = firebase.auth().currentUser.uid;
    ownerKey ="4XbtNvOf57REXofdwETCfpiOBKI2";


function buildCard() {
    database.ref('ownerProfiles/' + ownerKey + '/properties/').once('value').then(function (snapshot) {
        $('.ownerList').empty();
        $.each(snapshot.val(), function (index, value) {
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
        });
    });
}

function testFunction() {
    var testID = $(this).data('id');
    console.log(testID);
    $('#page-content-wrapper').load('assets/ajax/property_details_template.html', function() {

        $("#editSaveBtn").on('click', function () {
            if ($('#editSaveBtn').text() == "Save") {
                $('#editSaveBtn').text('Edit');
                $('.test').attr('disabled', true);
                $('#rent-input').attr('value', $('#rent-input').val());
                $('#mort-input').attr('value', $('#mort-input').val());
                $('#hoa-input').attr('value', $('#hoa-input').val());
                $('#maint-input').attr('value', $('#maint-input').val());

                var rent = $('#rent-input').val().trim();
                var mortgage = $('#mort-input').val().trim();
                var hoa = $('#hoa-input').val().trim();
                var maint = $('#maint-input').val().trim();

                database.ref('ownerProfiles/'+ownerKey+'/properties/'+testID+'/financials').set({
                    rent: rent,
                    mortgage: mortgage,
                    hoa: hoa,
                    maint: maint,
                });

            } else if ($('#editSaveBtn').text() == "Edit") {
                $('#editSaveBtn').text('Save');
                $('.test').removeAttr('disabled');
            }

        });



        database.ref('ownerProfiles/'+ownerKey+'/properties/' + testID).on("value", function (childSnapshot, key) {

            var propName = childSnapshot.val().name;
            var propAddress = childSnapshot.val().address;
            var propBed = childSnapshot.val().bedrooms;
            var propBath = childSnapshot.val().bathrooms;
            var propSqFt = childSnapshot.val().sqfeet;
            var propStatus = childSnapshot.val().status;
            var propImg = childSnapshot.val().image;
            var propDescription = childSnapshot.val().description;
            var propType = childSnapshot.val().type;

            $('#bedroomDetail').html(propBed);
            $('#bathroomDetail').html(propBath);
            $('#sqfeetDetail').html(propSqFt);
            $('#occupancyDetail').html(propStatus);
            $('#descriptionDetails').html(propDescription);
            $('#nameDetails').html(propName);
            $('#detailImage').attr('src', propImg);
            $('#addressDetail').html(propAddress);

            var rent = childSnapshot.val().financials.rent;
            var mortgage = childSnapshot.val().financials.mortgage;
            var hoa = childSnapshot.val().financials.hoa;
            var maint = childSnapshot.val().financials.maint;

            $('#rent-input').attr('value', rent);
            $('#mort-input').attr('value', mortgage);
            $('#hoa-input').attr('value', hoa);
            $('#maint-input').attr('value', maint);

            rent = parseInt(rent);
            mortgage = parseInt(mortgage);
            hoa = parseInt(hoa);
            maint = parseInt(maint);

            
            var mortPie = (mortgage/rent)*100;
            console.log(mortPie);
            var hoaPie = (hoa/rent)*100;
            console.log(hoaPie);
            var maintPie = (maint/rent)*100;
            console.log(maintPie);
            console.log(rent);
            console.log(hoa);
            console.log(maint);
            console.log(mortgage);
            var extra = (maint+hoa+mortgage);
            console.log(extra);
            var extraR = rent-extra;
            var extraT = (extraR/rent)*100;
            console.log(extraT);

            // pie chart data
            var pieData = [
                {
                    value: mortPie,
                    color:"red"
                },
                {
                    value : hoaPie,
                    color : "blue"
                },
                {
                    value : maintPie,
                    color : "yellow"
                },
                {
                    value : extraT,
                    color : "green"
                }
            ];
            // pie chart options
            var pieOptions = {
                segmentShowStroke : false,
                animateScale : true
            };
            // get pie chart canvas
            var countries= document.getElementById("financialDetails").getContext("2d");
            // draw pie chart
            new Chart(countries).Pie(pieData, pieOptions);

        });
        var file;

        $('.modalUpload').on('click', function () {
            console.log($('#previewFile'));
            console.log($('#previewFilePath'));

            var ref = firebase.storage().ref();
            var upload = ref.child(file.name);
            ref.put(upload).then(function (snapshot) {
                console.log('Uploaded a blob or file!');
            });

        });


        function filePreview() {
            var preview = document.querySelector('#previewFile');
            file = document.querySelector('input[type=file]').files[0];
            var reader = new FileReader();

            reader.addEventListener("load", function () {
                preview.src = reader.result;
            }, false);

            if (file) {
                reader.readAsDataURL(file);
            }

            console.log(file.webkitRelativePath);
        }


    });
}




buildCard();


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
    database.ref('ownerProfiles/' + ownerKey + '/properties/' +uniqueID + '/refID/').set(uniqueID);
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

// ==============================
// details financials
// ==============================
