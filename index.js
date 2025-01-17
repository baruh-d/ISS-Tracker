class ISSTracker {
    constructor() {
        this.map = null;
        this.issMarker = null;
        this.updateInterval = 1000;
        this.url = 'https://api.wheretheiss.at/v1/satellites/25544'; // URL for fetching ISS position
        this.isUpdating = false;
        this.facts = [
            "The ISS travels at a speed of about 17,500 mph (28,000 km/h)",
            "The space station has been continuously occupied since November 2000",
            "The ISS makes 16 orbits of Earth every 24 hours",
            "The solar array wingspan (240 feet) is longer than a Boeing 777's wings",
            "Astronauts aboard the ISS see 16 sunrises and sunsets every day",
            "The ISS is the largest artificial object in space",
            "The living and working space is larger than a six-bedroom house",
            "More than 230 individuals from 18 countries have visited the ISS",
            "The ISS has an internal pressurized volume equal to a Boeing 747",
            "Over 3 million lines of code run on the ISS's computers"
        ];
    }

    async initialize() {
        try {
            // Initialize map and get initial position
            const initialData = await this.fetchISSPosition();
            if (initialData) {
                this.setupMap(initialData); // Set up the map with initial ISS position
                this.setupFactsToggle();    // Setup facts toggle
                this.setupFactsGrid();      // Setup facts grid
                this.startTracking();       // Start tracking ISS position updates
            }
        } catch (error) {
            this.handleError('Failed to initialize ISS tracker', error);
        }
    }

    async fetchISSPosition() {
        try {
            const response = await fetch(this.url);
            if (!response.ok) throw new Error('Network response was not ok');
            return await response.json();
        } catch (error) {
            this.handleError('Failed to fetch ISS position', error);
            return null;
        }
    }

    setupMap(initialData) {
        const { latitude, longitude } = initialData;

        // Initialize MapTiler map with custom style
        this.map = new maptiler.Map({
            container: 'map', // The ID of the div to display the map
            style: 'https://api.maptiler.com/maps/streets/style.json?key=YOUR_MAPTILER_API_KEY', // Use your API key
            center: [longitude, latitude],
            zoom: 3
        });

        // Custom ISS icon
        this.issMarker = new maptiler.Marker()
            .setLngLat([longitude, latitude])
            .setPopup(new maptiler.Popup().setHTML("<strong>ISS</strong>"))
            .addTo(this.map);

        // Add zoom controls
        this.map.addControl(new maptiler.ZoomControl());
    }

    updateISSPosition(position) {
        const { latitude, longitude } = position;
        
        // Update marker position on the map
        this.issMarker.setLngLat([longitude, latitude]);

        // Update details with animation
        const details = document.getElementById('details');
        const elements = {
            time: new Date().toLocaleString(),
            latitude: parseFloat(latitude).toFixed(4),
            longitude: parseFloat(longitude).toFixed(4)
        };

        Object.entries(elements).forEach(([key, value]) => {
            const element = details.querySelector(`.${key}`);
            if (element) {
                element.textContent = value;
                element.classList.add('fade-in');
                setTimeout(() => element.classList.remove('fade-in'), 500);
            }
        });
    }

    async startTracking() {
        try {
            const positionData = await this.fetchISSPosition();
            if (positionData) {
                const { latitude, longitude, timestamp } = positionData;
                this.updateISSPosition({ latitude, longitude }); // Update ISS marker
                this.updateMap(latitude, longitude); // Update the map center

                // Update the stats
                document.querySelector('.latitude').textContent = latitude;
                document.querySelector('.longitude').textContent = longitude;
                document.querySelector('.time').textContent = new Date(timestamp * 1000).toLocaleTimeString(); // Convert timestamp to human-readable time
            } else {
                console.error('Unable to track ISS at the moment. Please try again later.');
            }

            // Set up periodic updates (e.g., every 5 seconds)
            setInterval(async () => {
                const positionData = await this.fetchISSPosition();
                if (positionData) {
                    const { latitude, longitude, timestamp } = positionData;
                    this.updateISSPosition({ latitude, longitude }); // Update ISS marker
                    this.updateMap(latitude, longitude); // Update the map center

                    // Update the stats
                    document.querySelector('.latitude').textContent = latitude;
                    document.querySelector('.longitude').textContent = longitude;
                    document.querySelector('.time').textContent = new Date(timestamp * 1000).toLocaleTimeString(); // Convert timestamp to human-readable time
                } else {
                    console.error('Unable to track ISS at the moment. Please try again later.');
                }
            }, 5000); // Update every 5 seconds
        } catch (error) {
            console.error('Error during ISS tracking', error);
        }
    }

    updateMap(latitude, longitude) {
        this.map.setCenter([longitude, latitude]); // Update the map's center to the ISS's new position
    }

    setupFactsToggle() {
        const button = document.getElementById('toggleFacts');
        const factsList = document.getElementById('factsList');
        let isVisible = false;

        button.addEventListener('click', () => {
            isVisible = !isVisible;
            factsList.style.display = isVisible ? 'grid' : 'none';
            button.querySelector('.button-text').textContent = 
                isVisible ? 'Hide Facts' : 'Show Facts';

            if (isVisible) {
                factsList.classList.add('fade-in');
            }
        });
    }

    setupFactsGrid() {
        const factsGrid = document.getElementById('factsList');
        this.facts.forEach((fact) => {
            const factCard = document.createElement('div');
            factCard.className = 'fact-card';
            factCard.innerHTML = `<p>${fact}</p>`;
            factsGrid.appendChild(factCard);
        });
    }

    handleError(message, error) {
        console.error(message, error);
        // Show user-friendly error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = 'Unable to track ISS at the moment. Please try again later.';
        document.getElementById('map').appendChild(errorDiv);
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    const tracker = new ISSTracker();
    tracker.initialize();
});
