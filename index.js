// JavaScript for ISS Tracking 
// Function to fetch ISS location and update details
function updateIssDetailsAndMap() {
    fetch('https://cors-anywhere.herokuapp.com/http://api.open-notify.org/iss-now.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response is not ok');
            }
            return response.json();
        })
        .then(data => {
            const issPosition = data.iss_position;
            const longitude = parseFloat(issPosition.longitude);
            const latitude = parseFloat(issPosition.latitude);

            // Create and set up the map using Leaflet
            const map = L.map('map').setView([latitude, longitude], 13);
            // zoom control for the map
            L.control.zoom({ position: 'topright' }).addTo(map);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
            

            // Create an ISS marker
            const issIcon = L.icon({
                iconUrl: 'ISS-Tracker/images/iss.png',
                iconSize: [50, 50],
                iconAnchor: [25, 25],
            });

            L.marker([latitude, longitude], { icon: issIcon }).addTo(map);

            // Update ISS details
            const details = document.getElementById('details');
            details.querySelector('.time').textContent = new Date(data.timestamp * 1000).toLocaleString();
            details.querySelector('.latitude').textContent = latitude;
            details.querySelector('.longitude').textContent = longitude;
        })
        .catch(error => {
            console.log('Error has occurred', error);
        });
}

// Initial fetch and update
updateIssDetailsAndMap();

// Getting a reference to the random facts list and toggle button
const randomFactsList = document.querySelector('#random-facts');
const toggleFactsButton = document.querySelector('#toggle-facts-button');

// Hide random facts initially
randomFactsList.style.display = 'none';

// Adding a click event listener to the toggle button
function toggleRandomFacts() {
    if (randomFactsList.style.display === 'none') {
        randomFactsList.style.display = 'block';
    } else {
        randomFactsList.style.display = 'none';
    }
}
toggleFactsButton.addEventListener('click', toggleRandomFacts);
