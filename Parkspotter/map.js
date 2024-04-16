let map;

function initMap() {
    // Set default center coordinates (e.g., city center)
    const center = { lat: 40.7128, lng: -74.0060 };
    
    // Initialize map
    map = new google.maps.Map(document.getElementById('map'), {
        center: center,
        zoom: 12 // Adjust zoom level as needed
    });

    // Add markers for available parking spots
    addParkingSpotMarkers();
}

function addParkingSpotMarkers() {
    // Example: Add marker for a parking spot
    const parkingSpot1 = { lat: 40.7128, lng: -74.0060 };
    const marker1 = new google.maps.Marker({
        position: parkingSpot1,
        map: map,
        title: 'Parking Spot 1'
    });

    // Example: Add marker with info window
    const parkingSpot2 = { lat: 40.7214, lng: -73.9986 };
    const marker2 = new google.maps.Marker({
        position: parkingSpot2,
        map: map,
        title: 'Parking Spot 2'
    });

    const infowindow = new google.maps.InfoWindow({
        content: '<h3>Parking Spot 2</h3><p>Price: $10/hr<br>Capacity: 20 spots<br>Hours: 24/7</p>'
    });

    marker2.addListener('click', function() {
        infowindow.open(map, marker2);
    });
}
