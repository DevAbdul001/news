document.getElementById('loginForm').addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent form from reloading the page

    // Collect form data
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const userInfo = {
        email: email,
        password: password
    };

    // Send POST request to the server
    fetch('http://localhost:3000/signin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userInfo)
    })
        .then(response => response.json()) // Parse JSON response
        .then(data => {
            if (data.message === 'Login Successful') {
                alert('Login Successful');
            } else {
                alert('Error: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Database Error:', error);
            alert('Something went wrong');
        });
});