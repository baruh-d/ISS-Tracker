## ISS-Tracker
The ISS Tracker is a web-based application designed to provide real-time tracking information about the International Space Station (ISS).

## Features
Real-Time ISS Tracking
The web application uses Leaflet, a popular JavaScript library, to display a map with a real-time marker representing the current location of the ISS.

## Random Fun Facts
Users can toggle a list of random fun facts about the ISS using the "Toggle Random Facts" button. The facts are displayed in an attractive, expandable list.

## Crew List
The application lists the crew members aboard the ISS in 2023, providing information about their names and affiliations.

## CORS Proxy
To fetch real-time ISS coordinates, the web application relies on a CORS (Cross-Origin Resource Sharing) proxy to overcome cross-origin security restrictions when making HTTP requests.

## Auto-Update Coordinates
The ISS's coordinates update every second, providing users with real-time data about its movement.

## Easy Deployment
The application's frontend is developed using HTML, CSS, and JavaScript, making it easy to deploy on any web server.

## Usage
Open the web application in a web browser.
The main page displays a brief introduction and information about the ISS.
Click the "Toggle Random Facts" button to view interesting facts about the ISS.
Explore the real-time map to see the ISS's current location.
Watch the coordinates of the ISS update automatically every second.
To learn more about the ISS, visit NASA's ISS page by clicking the provided link.
The coordinates of the ISS update every second. To get the latest coordinates, refresh the page.

## Deployment
Download the project files, including HTML, CSS, JavaScript, and image assets.
Deploy the project on a web server or locally using an HTTP server (e.g., http-server).
Ensure the CORS proxy is set up correctly for fetching JSON data.
Users can access the ISS Tracking Site by visiting the deployed URL.

## Technologies Used
HTML, CSS, and JavaScript for the frontend.
Leaflet library for map visualization.
CORS proxy to fetch real-time ISS data.

- The ISS Tracking Site relies on the [Open Notify API](http://api.open-notify.org/iss-now.json) to obtain real-time International Space Station (ISS) location data. This is a JSON file containing the ISS's latitude and longitude coordinates.

- To explore the API further or access additional data related to the ISS, please visit the official [Open Notify API documentation](http://open-notify.org/Open-Notify-API/ISS-Location-Now/).


## Contributors
[Daniel Baru] - [barudaniel6@gmail.com]

## License
This project is licensed under the [MIT] License - see the LICENSE.md file for details.

## Acknowledgments
- Special thanks to NASA for providing ISS data and information.



