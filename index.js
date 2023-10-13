// JavaScript for ISS Tracking
// Function to fetch ISS location and update details
const url = 'https://corsproxy.io/?' + encodeURIComponent('http://api.open-notify.org/iss-now.json');
let issMarker;
let latitude; // Defining latitude and longitude here
let longitude;

function updateIssMarkerPosition(latitude, longitude) {
    if (issMarker && typeof latitude !== 'undefined' && typeof longitude !== 'undefined') {
        issMarker.setLatLng([latitude, longitude]);
    }
}

function updateIssDetailsAndMap() {
    try {
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response is not ok');
                }
                return response.json();
            })
            .then(data => {
                const issPosition = data.iss_position;
                longitude = parseFloat(issPosition.longitude); // Update global variables
                latitude = parseFloat(issPosition.latitude);

                // Create and set up the map using Leaflet
                const map = L.map('map').setView([latitude, longitude], 5);
                // zoom control for the map
                L.control.zoom({ position: 'topright' }).addTo(map);
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

                // Create an ISS marker
                const issIcon = L.icon({
                    iconUrl: 'images/iss.png',
                    iconSize: [25, 25],
                    iconAnchor: [12.5, 12.5],
                });

                issMarker = L.marker([latitude, longitude], { icon: issIcon }).addTo(map);

                // Update ISS details
                const details = document.getElementById('details');
                details.querySelector('#details .time').textContent = new Date(data.timestamp * 1000).toLocaleString();
                details.querySelector('#details .latitude').textContent = latitude;
                details.querySelector('#details .longitude').textContent = longitude;
            })
            .catch(error => {
                console.log('Error has occurred', error);
            });
    } catch (error) {
        console.log('Error has occurred', error);
    }
}

// Initial fetch and update
updateIssDetailsAndMap();

// Waiting for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
// Getting a reference to the random facts list and toggle button
const randomFactsList = document.querySelector('#factsList');
const toggleFactsButton = document.querySelector('#toggleFacts');

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
});

// Updates ISS marker position every second
const updateInterval = 1000;
setInterval(() => {
    updateIssMarkerPosition([latitude, longitude]);
}, 1000);
