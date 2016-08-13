$(document).ready(function() {



   // make the modal open for adding a new property
   $('.modal-trigger').leanModal();

   //api section for trulia TEST
   $.ajax({
            url: "http://api.trulia.com/webservices.php?library=LocationInfo&function=getCitiesInState&state=CA&apikey=uyyb7rpb3jkmj7nx73m7bxd8",
            // data: {
            //     limit: 10,
            //     api_key: "dc6zaTOxFJmzC",
            //     q: search
            // }
            , method: 'GET'
        })
            .done(function (response) {
               console.log(response);

         
        });
    
});