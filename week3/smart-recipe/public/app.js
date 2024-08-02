// Get the modal
var modal = document.getElementById('authModal');

// Get the button that opens the modal
var authButton = document.querySelector('.auth-button');

// Get the <span> element that closes the modal
var closeButton = document.getElementsByClassName("close-button")[0];

// When the user clicks the button, open the modal 
authButton.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
closeButton.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Handle form submission with AJAX
document.getElementById('authForm').addEventListener('submit', function(e) {
    e.preventDefault();  // Prevent default form submission behavior

    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    // AJAX request to server-side script
    fetch('/path_to_server_script', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({username: username, password: password})
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);  // Process server response
        modal.style.display = "none";  // Optionally close modal on success
    })
    .catch(error => console.error('Error:', error));
});
