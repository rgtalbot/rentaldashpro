var fileButton = document.getElementById('filePath');
var storageRef;

fileButton.addEventListener('change', function(e) {
    var file = e.target.files[0];

    storageRef = firebase.storage().ref('house_photos/' + firebase.auth().currentUser.uid + '/' + file.name);

    var task = storageRef.put(file).then(function() {
        storageRef.getDownloadURL().then(function(url) {
            $('#picModal').modal('hide');
            var propID = $('#detailImage').attr('uid');
            console.log(propID);
            database.ref('ownerProfiles/' + ownerKey + '/properties/' + propID + '/image/').set(url);
        });
    });

});