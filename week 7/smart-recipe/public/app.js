// Establish a connection to the socket server
let socket = io();

// Listen for the 'number' event from the server and log the random number
socket.on('number', function(msg) {
    console.log('Random number from server: ' + msg);
});

// Existing code for handling modals and form submissions
var signInModal = document.getElementById('signInModal');
var signUpModal = document.getElementById('signUpModal');
var signInButton = document.querySelector('.sign-in-button');
var signUpButton = document.querySelector('.sign-up-button');
var closeButtons = document.getElementsByClassName("close-button");

signInButton.onclick = function() {
    signInModal.style.display = "block";
}

signUpButton.onclick = function() {
    signUpModal.style.display = "block";
}

for (var i = 0; i < closeButtons.length; i++) {
    closeButtons[i].onclick = function() {
        signInModal.style.display = "none";
        signUpModal.style.display = "none";
    }
}

window.onclick = function(event) {
    if (event.target == signInModal) {
        signInModal.style.display = "none";
    } else if (event.target == signUpModal) {
        signUpModal.style.display = "none";
    }
}

document.getElementById('signInForm').addEventListener('submit', function(e) {
    e.preventDefault();
    var username = document.getElementById('signInUsername').value;
    var password = document.getElementById('signInPassword').value;

    fetch('/auth/signin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: username, password: password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.username) {
            document.getElementById('display-username').textContent = data.username;
            document.getElementById('user-info-container').style.display = 'flex';
            signInButton.style.display = 'none';
            signUpButton.style.display = 'none';
        }
        signInModal.style.display = "none";
    })
    .catch(error => console.error('Error:', error));
});

document.getElementById('signUpForm').addEventListener('submit', function(e) {
    e.preventDefault();
    var username = document.getElementById('signUpUsername').value;
    var password = document.getElementById('signUpPassword').value;

    fetch('/auth/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: username, password: password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.username) {
            document.getElementById('display-username').textContent = data.username;
            document.getElementById('user-info-container').style.display = 'flex';
            signInButton.style.display = 'none';
            signUpButton.style.display = 'none';
        }
        signUpModal.style.display = "none";
    })
    .catch(error => console.error('Error:', error));
});

document.getElementById('logout-button').addEventListener('click', function() {
    document.getElementById('display-username').textContent = '';
    document.getElementById('user-info-container').style.display = 'none';
    signInButton.style.display = 'inline';
    signUpButton.style.display = 'inline';
});
