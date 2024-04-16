// script.js

// Function to toggle the display of the map description
function toggleMapDescription() {
    const mapDescription = document.getElementById('mapDescription');
    mapDescription.classList.toggle('show'); // Toggle the 'show' class
}

// Event listener for the "View Map" button
document.getElementById('mapButton').addEventListener('click', function(event) {
    // Prevent the default action of the link
    event.preventDefault();

    // Toggle the display of the map description
    toggleMapDescription();
});

// Event listener to hide the description when the user clicks outside of it
window.addEventListener('click', function(event) {
    const mapDescription = document.getElementById('mapDescription');
    if (!event.target.closest('#mapButton') && !event.target.closest('#mapDescription')) {
        mapDescription.classList.remove('show'); // Hide the description
    }
});

fetch("https://formspree.io/f/myyrwwyp")           //api for the get request
    .then(response => response.json())
    .then(data => console.log(data));
 
