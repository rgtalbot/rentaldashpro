// =========================================================
// Creates My Dashboard or login button based on auth state
// =========================================================
$(document).ready(function() {

    firebase.auth().onAuthStateChanged( function(user) {

        var $dashButton = $('<a>').addClass('dashboard-btn navbar-right')
                                  .attr('target', '_self');

        if (user)
            $dashButton.attr('href', 'dashboard.html').text('MY DASHBOARD');
        else
            $dashButton.attr('href', 'login.html').text('LOGIN');

        $('.navbar').find('.container').append($dashButton);
    });

});
