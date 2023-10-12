// javascript for ISS Tracking Site
function getIssTrackerLocation() {
    fetch('https://cors-anywhere.herokuapp.com/http://api.open-notify.org/iss-now.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response is not ok');
            }
            return response.json();
        })
        .then(data => {
            // process the data received from the API
            const issPosition = data.iss_position;
            const longitude = issPosition.longitude;
            const latitude = issPosition.latitude;

            // creating and setting up the map using Leaflet
            const map = L.map('map').setView([parseFloat(latitude), parseFloat(longitude)], 13);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

            // creating an ISS marker
            const issIcon = L.icon({
                iconUrl: 'ISS-Tracker/images/iss.png',
                iconSize: [50, 50],
                iconAnchor: [25, 25],
            });
            const issMarker = L.marker([latitude, longitude], { icon: issIcon }).addTo(map);
        })
        .catch(error => {
            console.log('Error has occurred', error);
        });
}

getIssTrackerLocation();
function updateIssDetails(){
    fetch('https://cors-anywhere.herokuapp.com/http://api.open-notify.org/iss-now.json')
        .then(response=> response.json())
        .then(data=> {
            const details = document.getElementById('details');
            details.querySelector('.time').textContent = new Date(data.timestamp * 1000).toLocaleString();
            details.querySelector('.latitude').textContent = data.iss_position.latitude;
            details.querySelector('.longitude').textContent = data.iss_position.longitude;
        })
}
updateIssDetails();
// getting a reference to the random facts list and toggle button
const randomFactsList = document.querySelector('#random-facts');
const toggleFactsButton = document.querySelector('#toggle-facts-button');

// hide random facts initially - initially
randomFactsList.style.display = 'none';

//adding a click event listener to the toggle button
function toggleRandomFacts(){
    if(randomFactsList.style.display === 'none'){
        randomFactsList.style.display = 'block';
    }
    else{
        randomFactsList.style.display = 'none';
    }
}
toggleFactsButton.addEventListener('click', toggleRandomFacts);