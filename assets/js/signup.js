// =========================================================
// Global regex validation variable
// =========================================================
var validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

// =========================================================
// Global Functions
// =========================================================
/**
 * Creates new user and automatically signs user into Firebase.
 *
 * @param {string} name Name value entered by user in sign form name input field.
 * @param {string} email Email value entered by user in sign form email input field.
 * @param {string} password Password value entered by user in sign form password input field.
 * @return {undefined} undefined Sends user to dashboard page on successful sign up or displays error.
 */
function signUpUser(name, email, password) {

    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        console.warn("Sign-up error ", error.code, " with message ", error.message);
        // TODO: DISPLAY ERROR MESSAGE TO USER.
    });

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            user.updateProfile({
                displayName: name
            }).then(function() {
                window.location.assign('dashboard.html');
            }, function(error) {
                console.warn("Update profile error ", error.code, " with message ", error.message);
                // TODO: DISPLAY ERROR MESSAGE TO USER.
            });
        }
    });
}

// =========================================================
// Set click event handlers when document is ready.
// =========================================================
$(document).ready(function() {

    $('#login-btn').on('click', function(event) {
        event.preventDefault();

        var loginEmail = $('#login-email').val().trim();
        var loginPass = $('#login-password').val().trim();

        if ( validEmail.test(loginEmail) && loginPass !== '' ) {
            logInUser(loginEmail, loginPass);
        }
        else {
            // TODO: DISPLAY INVALID FORM FIELD MESSAGES
            console.warn("Invalid form fields.");
        }
    });

    $(document).keypress(function (e) {
        if (e.which == 13)
            $('#login-btn').trigger('click');
    });

    $('.modal-signup-btn').on('click', function(event) {
        event.preventDefault();

        var signupName = $('#signup-name').val().trim();
        var signupEmail = $('#signup-email').val().trim();
        var signupPass = $('#signup-password').val().trim();
        var signupRetype = $('#signup-retype').val().trim();

        if (signupName.length == 0) {
            $('#signup-name').parent().addClass('has-error');
            $('#signup-name').val('').attr('placeholder', 'Name is required');
            return;
        }
        else if (signupEmail.length == 0) {
            $('#signup-email').parent().addClass('has-error');
            $('#signup-email').val('').attr('placeholder', 'Email address is required');
            return;
        }
        else if (signupPass.length < 4) {
            $('#signup-password').parent().addClass('has-error');
            $('#signup-retype').parent().addClass('has-error');
            $('#signup-password').val('').attr('placeholder', 'Password must be at least 4 characters');
            $('#signup-retype').val('').attr('placeholder', 'Confirm password');
            return;
        }
        else if (signupRetype != signupPass) {
            $('#signup-password').parent().addClass('has-error');
            $('#signup-retype').parent().addClass('has-error');
            $('#signup-password').val('').attr('placeholder', 'Passwords do not match');
            $('#signup-retype').val('').attr('placeholder', 'Confirm password');
            return;
        }

        if ( validEmail.test(signupEmail) || grecaptcha.getResponse().length != 0 ) {
            signUpUser(signupName, signupEmail, signupPass);
        }
        else {
            // TODO: VALIDATIONS AND ERROR HANDLING
            console.warn("Error");
        }
    });

    $('.modal-send-reset-btn').on('click', function(event) {
        event.preventDefault();

        var resetEmail = $('#reset-email').val().trim();

        if ( validEmail.test(resetEmail) ) {

            firebase.auth().sendPasswordResetEmail(resetEmail).then(function() {

                var alert = $('<div>').addClass('alert alert-info alert-dismissible fade in')
                                      .attr('role', 'alert')
                                      .text('Please check your email for password reset link.');
                $('.alert-messages').append(alert);

            }, function(error) {
                console.warn("Send reset error ", error.code, " with message ", error.message);
                var alert = $('<div>').addClass('alert alert-danger alert-dismissible fade in')
                                      .attr('role', 'alert')
                                      .text('Error processing your request. Please try again later.');
                $('.alert-messages').append(alert);
            });

            $('#forgot-password-modal').modal('hide');
            $('#reset-email').val('');
            setTimeout(function() {
                $('.alert-dismissible').alert('close');
            }, 5000);

        } else {
            var alert = $('<div>').addClass('alert alert-info alert-dismissible fade in')
                                  .attr('role', 'alert')
                                  .text('Invalid email. Please try your request again.');
            $('.alert-messages').append(alert);

            $('#forgot-password-modal').modal('hide');
            $('#reset-email').val('');
            setTimeout(function() {
                $('.alert-dismissible').alert('close');
            }, 3000);
        }

    })
});