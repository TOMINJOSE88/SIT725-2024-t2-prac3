// Get the modals
var signInModal = document.getElementById('signInModal');
var signUpModal = document.getElementById('signUpModal');

// Get the buttons that open the modals
var signInButton = document.querySelector('.sign-in-button');
var signUpButton = document.querySelector('.sign-up-button');

// Get the <span> elements that close the modals
var closeButtons = document.getElementsByClassName("close-button");

// When the user clicks the button, open the respective modal 
signInButton.onclick = function() {
    signInModal.style.display = "block";
}

signUpButton.onclick = function() {
    signUpModal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
for (var i = 0; i < closeButtons.length; i++) {
    closeButtons[i].onclick = function() {
        signInModal.style.display = "none";
        signUpModal.style.display = "none";
    }
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == signInModal) {
        signInModal.style.display = "none";
    } else if (event.target == signUpModal) {
        signUpModal.style.display = "none";
    }
}

// Handle Sign In form submission with AJAX
document.getElementById('signInForm').addEventListener('submit', function(e) {
    e.preventDefault();  // Prevent default form submission behavior

    var username = document.getElementById('signInUsername').value;
    var password = document.getElementById('signInPassword').value;

    // AJAX request to server-side script for Sign In
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
        signInModal.style.display = "none";  // Optionally close modal on success
    })
    .catch(error => console.error('Error:', error));
});

// Handle Sign Up form submission with AJAX
document.getElementById('signUpForm').addEventListener('submit', function(e) {
    e.preventDefault();  // Prevent default form submission behavior

    var username = document.getElementById('signUpUsername').value;
    var password = document.getElementById('signUpPassword').value;

    // AJAX request to server-side script for Sign Up
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
        signUpModal.style.display = "none";  // Optionally close modal on success
    })
    .catch(error => console.error('Error:', error));
});

// Handle Logout button click
document.getElementById('logout-button').addEventListener('click', function() {
    // Clear user info
    document.getElementById('display-username').textContent = '';
    document.getElementById('user-info-container').style.display = 'none';
    signInButton.style.display = 'inline';
    signUpButton.style.display = 'inline';
});
