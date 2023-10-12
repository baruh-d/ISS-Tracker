// javascript for ISS Tracking Site
function getIssTrackerLocation(){
fetch('http://api.open-notify.org/iss-now.json')
    .then(response=> {
        if(!response.ok){
            throw new Error('Network response is not ok');
        }
        return response.json();
    })
    .then(data=> {
        // process the data is received from the api
        const issPosition = data.iss_position;
        const longitude = issPosition.longitude;
        const latitude = issPosition.latitude;
        console.log(data);

        const map = L.map('map').setView([parseFloat(latitude), parseFloat(longitude)], 13);
    })
    .catch(error=> {
        console.log('Error has occured', error);
    });
}

