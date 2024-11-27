// Declare 'user' at the appropriate scope
let user = {};

document.getElementById('signupForm').addEventListener('submit', (event) => {
    event.preventDefault();

    // Populate the 'user' object with form data
    user = {
        username: document.getElementById('username').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
    };

    // Send the 'user' object to the server
    fetch('http://localhost:3000/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.message === 'User Registered Successfully') {
                alert('Sign-up successful');
            } else {
                alert('Error: ' + data.message);
            }
        })
        .catch((error) => {
            console.error('Error During API Request:', error);
            alert('Something went wrong');
        });
});

// Add an event listener for the button click (Optional logging for debugging)
document.querySelector('.btn2').addEventListener('click', () => {
   
});
