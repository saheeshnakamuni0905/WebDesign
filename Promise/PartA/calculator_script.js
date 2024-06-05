$(document).ready(function() {
    var username = localStorage.getItem('loggedInUser');
    if (username) {
        $('#username').text(username);
    } else {
        $('#username').text('Guest');
    }

    const showError = (selector, message) => {
        $(selector).text(message).show();
    };

    const validateInput = (id) => {
        let isValid = true;
        let val = $('#' + id).val();
        let errorDiv = $('#' + id + 'Error');
        errorDiv.hide();

        if (!val || isNaN(val)) {
            showError('#' + id + 'Error', 'Please enter a valid number for ' + (id === 'number1' ? 'Number 1' : 'Number 2'));
            isValid = false;
        } else if (val === Infinity || val === -Infinity) {
            showError('#' + id + 'Error', 'The number entered is too large.');
            isValid = false;
        }

        return isValid;
    };

    $('#number1, #number2').on('keyup', function() {
        validateInput($(this).attr('id'));
    });

    const calculateResult = (operation) => {
        let num1Valid = validateInput('number1');
        let num2Valid = validateInput('number2');

        if (num1Valid && num2Valid) {
            let num1 = parseFloat($('#number1').val());
            let num2 = parseFloat($('#number2').val());
            let result;

            switch (operation) {
                case 'add':
                    result = num1 + num2;
                    break;
                case 'subtract':
                    result = num1 - num2;
                    break;
                case 'multiply':
                    result = num1 * num2;
                    break;
                case 'divide':
                    if (num2 === 0) {
                        showError('#number2Error', 'Cannot divide by zero.');
                        return;
                    }
                    result = num1 / num2;
                    break;
            }

            $('#result').text(`Result: ${result}`);
        }
    };

    $('#add, #subtract, #multiply, #divide').on('click', (event) => {
        calculateResult(event.target.id);
    });
});
