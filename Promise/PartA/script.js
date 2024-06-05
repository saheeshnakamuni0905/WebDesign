$(document).ready(function() {
    $('input[type="submit"]').prop('disabled', true); 
    
    function enableLoginButton() {
        if ($('.error:visible').length === 0) {
            $('input[type="submit"]').prop('disabled', false);
        } else {
            $('input[type="submit"]').prop('disabled', true);
        }
    }

    function validateEmail(email) {
        return /^[a-zA-Z0-9._%+-]+@northeastern\.edu$/.test(email);
    }

    function hasSpecialCharacters(str) {
        return /[^a-zA-Z0-9_]/.test(str);
    }

    $('#email, #username, #password, #confirmpassword').on('keyup', function() {
        var id = $(this).attr('id');
        var val = $(this).val();
        var errorDiv = $('#' + id + 'Error');
        errorDiv.hide();

        if (id === 'email') {
            if (val === '' || !validateEmail(val)) {
                errorDiv.text('Please enter a valid northeastern.edu email').show();
            }
        }

        else if (id === 'username') {
            if (val === '' || hasSpecialCharacters(val) || val.length < 4 || val.length > 20) {
                errorDiv.text('Username must be 4-20 characters and contain no special characters').show();
            }
        }

        else if (id === 'password') {
            // errorDiv.html('');
            if (val === '' || val.length < 8 || val.length > 20) {
                errorDiv.html('Password must be 8-20 characters long<br>Password must contain at least one uppercase letter<br>Password must contain at least one special character<br>Password must contain at least one number').show();
            }
            else if (!/[A-Z]/.test(val)) {
                errorDiv.html('Password must contain at least one uppercase letter<br>Password must contain at least one special character<br>Password must contain at least one number').show();
            }
            else if (!/[!@#$%^&*(),.?":{}|<>]/.test(val)) {
                errorDiv.html('Password must contain at least one special character<br>Password must contain at least one number').show();
            }
            else if (!/[0-9]/.test(val)) {
                errorDiv.html('Password must contain at least one number').show();
            }
            // if (!isValid) {
            //     errorDiv.show();
            // }
        }

        else if (id === 'confirmpassword') {
            var passwordVal = $('#password').val();
            if (val !== passwordVal) {
                errorDiv.text('Passwords do not match').show();
                $('input[type="submit"]').prop('disabled', true); 
            }
            else{
                enableLoginButton();
            }
        }

        // if (isValid) {
        //     enableLoginButton();
        // } else {
        //     $('input[type="submit"]').prop('disabled', false); 
        // }
    });

    $('form').submit(function(e) {
        e.preventDefault();

        var username = $('#username').val();
        localStorage.setItem('loggedInUser', username); 

        window.location.href = 'calculator.html'; 
    });


});