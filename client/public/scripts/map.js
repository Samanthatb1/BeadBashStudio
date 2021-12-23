var mymap = L.map('torontoMap').setView([43.69, -79.4], 5);
console.log(document.getElementById('torontoMap'));
console.log('hey');

const attribution =
'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(mymap);

var greenIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [35, 56],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

var marker = L.marker([43.8, -79.4], {icon: greenIcon})
            .addTo(mymap)
            .bindPopup("<b>Our Home Town</b><br>Toronto.");

plotLocations();

async function plotLocations() {
    const response = await fetch('scripts/locations.json');
    const data = await response.json();

    for ( var i = 0 ; i < data.length ; i++){
        L.marker([data[i].latitude, data[i].longitude])
        .addTo(mymap)
        .bindPopup(data[i].location); 
    } 
}



