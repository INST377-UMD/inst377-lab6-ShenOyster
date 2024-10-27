
const map = L.map('map').setView([37.0902, -95.7129], 4);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
}).addTo(map);


function getRandomInRange(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
}


const markers = [
    { lat: getRandomInRange(30, 35, 3), lng: getRandomInRange(-90, -100, 3), elementId: 'marker1' },
    { lat: getRandomInRange(30, 35, 3), lng: getRandomInRange(-90, -100, 3), elementId: 'marker2' },
    { lat: getRandomInRange(30, 35, 3), lng: getRandomInRange(-90, -100, 3), elementId: 'marker3' }
];


function fetchLocality(lat, lng, elementId) {
    const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const locality = data.locality || 'Unknown';
            document.getElementById(elementId).innerHTML = `Marker: Latitude: ${lat}, Longitude: ${lng}<br>Locality: ${locality}`;
        })
        .catch(error => {
            console.error('Error fetching locality:', error);
            document.getElementById(elementId).innerHTML = `Marker: Latitude: ${lat}, Longitude: ${lng}<br><span class="error">Locality: Failed to load</span>`;
        });
}


function addMarkerAndFetchLocality(lat, lng, elementId) {
    L.marker([lat, lng]).addTo(map).bindPopup(`Latitude: ${lat}, Longitude: ${lng}`);
    fetchLocality(lat, lng, elementId);
}


markers.forEach(marker => addMarkerAndFetchLocality(marker.lat, marker.lng, marker.elementId));