$(document).on("click",".modalAddBtn",function() {
    console.log('add button clicked, add property');

    var houseCol = $('<div>').addClass("col-xs-6 col-md-4 col-lg-3");

    var houseDiv = $('<div>').addClass("thumbnail");

    var houseImg = $('<img>').addClass("img-responsive")
        .attr("src", "assets/images/house2.jpg");

    var houseDiv2 = $('<div>')
        .addClass("caption");

    var housePara = $('<p>')
        .addClass("text-center")
        .text("Simple Information about this house");

    housePara.appendTo(houseDiv2);
    houseImg.appendTo(houseDiv);
    houseDiv2.appendTo(houseDiv);
    houseDiv.appendTo(houseCol);


    $('.ownerList').prepend(houseCol);

    $('.modal').modal('toggle');

});