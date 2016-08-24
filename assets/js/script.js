// =========================================================
// Check currently authenticated user.
// =========================================================
$(document).ready(function() {
    firebase.auth().onAuthStateChanged( function(user) {

        var $dashButton = $('<a>').addClass('dashboard-btn navbar-right')
                                  .attr('target', '_self');

        if (user) {
            ownerKey = user.uid;
            console.log("OWNER KEY: ", ownerKey);
            $dashButton.attr('href', 'dashboard.html').text('MY DASHBOARD');
        } else {
            $dashButton.attr('href', 'login.html').text('LOGIN');
        }

        $('.navbar').find('.container').append($dashButton);
    });
});
