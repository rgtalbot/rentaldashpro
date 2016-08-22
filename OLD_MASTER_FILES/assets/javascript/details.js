// Initialize Firebase
var config = {
    apiKey: "AIzaSyBz1HP3qVgiI2CyXWFnKV6z9AKnM4CXJyE",
    authDomain: "rental-dash-pro.firebaseapp.com",
    databaseURL: "https://rental-dash-pro.firebaseio.com",
    storageBucket: "rental-dash-pro.appspot.com",
};
firebase.initializeApp(config);

var database = firebase.database();
var uniqueID = "-KPnesSJ89KEleJVd7UZ";
database.ref('ownerProfiles/4XbtNvOf57REXofdwETCfpiOBKI2/properties/' + uniqueID).on("value", function (childSnapshot, key) {

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
