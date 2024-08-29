// Get the modals
const signInModal = document.getElementById('signInModal');
const signUpModal = document.getElementById('signUpModal');
console.log('signUpModal:', signUpModal);  // Check if element is correctly referenced

// Get the buttons that open the modals
const signInButton = document.querySelector('.sign-in-button');
const signUpButton = document.querySelector('.sign-up-button');

// Get the <span> elements that close the modals
const closeButtons = document.getElementsByClassName("close-button");

// Function to open a modal
function openModal(modal) {
    modal.style.display = "block";
    console.log(modal.id + ' display:', modal.style.display); // Debugging log
    
    // Force style update (sometimes needed in JSDOM)
    const forcedDisplay = window.getComputedStyle(modal).display;
    console.log(modal.id + ' forced display:', forcedDisplay); // Confirm forced style update
}

// Function to close a modal
function closeModal(modal) {
    modal.style.display = "none";
    console.log(modal.id + ' display:', modal.style.display); // Debugging log
}

// Event listeners for opening the modals
signInButton.addEventListener('click', () => {
    console.log('Sign In button clicked');
    openModal(signInModal);
});

signUpButton.addEventListener('click', () => {
    console.log('Sign Up button clicked');
    openModal(signUpModal);
});

// Event listeners for closing the modals using close buttons
Array.from(closeButtons).forEach(button => {
    button.addEventListener('click', () => {
        closeModal(signInModal);
        closeModal(signUpModal);
    });
});

// Close the modal if the user clicks outside of it
window.addEventListener('click', event => {
    if (event.target === signInModal) {
        closeModal(signInModal);
    } else if (event.target === signUpModal) {
        closeModal(signUpModal);
    }
});

// Handle Sign In form submission with AJAX
document.getElementById('signInForm').addEventListener('submit', function(e) {
    e.preventDefault();  // Prevent default form submission behavior

    const username = document.getElementById('signInUsername').value;
    const password = document.getElementById('signInPassword').value;

    // AJAX request to server-side script for Sign In
    fetch('/auth/signin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.username) {
            document.getElementById('display-username').textContent = data.username;
            document.getElementById('user-info-container').style.display = 'flex';
            signInButton.style.display = 'none';
            signUpButton.style.display = 'none';
            closeModal(signInModal);  // Optionally close modal on success
        }
    })
    .catch(error => console.error('Error:', error));
});

// Handle Sign Up form submission with AJAX
document.getElementById('signUpForm').addEventListener('submit', function(e) {
    e.preventDefault();  // Prevent default form submission behavior

    const username = document.getElementById('signUpUsername').value;
    const password = document.getElementById('signUpPassword').value;

    // AJAX request to server-side script for Sign Up
    fetch('/auth/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.username) {
            document.getElementById('display-username').textContent = data.username;
            document.getElementById('user-info-container').style.display = 'flex';
            signInButton.style.display = 'none';
            signUpButton.style.display = 'none';
            closeModal(signUpModal);  // Optionally close modal on success
        }
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
