const myMap = L.map('map').setView([22.9074872, 79.07306671], 5);
const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const attribution =
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Coded by SHIVANG GUPTA with ❤️';
const tileLayer = L.tileLayer(tileUrl, { attribution });
tileLayer.addTo(myMap);


function generateList() {
    const ul = document.querySelector('.list');
    stadiumList.forEach((stadium) => {
        const li = document.createElement('li');
        const div = document.createElement('div');
        const a = document.createElement('a');
        const p = document.createElement('p');
        a.addEventListener('click', () => {
            flyToStore(stadium);
        });
        div.classList.add('stadium-item');
        a.innerText = stadium.properties.name;
        a.href = '#';
        p.innerText = stadium.properties.address;

        div.appendChild(a);
        div.appendChild(p);
        li.appendChild(div);
        ul.appendChild(li);
    });
}

generateList();

function makePopupContent(stadium) {
    return `
    <div>
        <h4>${stadium.properties.name}</h4>
        <p>${stadium.properties.address}</p>
    </div>
  `;
}

function onEachFeature(feature, layer) {
    layer.bindPopup(makePopupContent(feature), { closeButton: false, offset: L.point(0, -8) });
}

var myIcon = L.icon({
    iconUrl: 'marker.png',
    iconSize: [30, 40]
});

const stadiumsLayer = L.geoJSON(stadiumList, {
    onEachFeature: onEachFeature,
    pointToLayer: function(feature, latlng) {
        return L.marker(latlng, { icon: myIcon });
    }
});
stadiumsLayer.addTo(myMap);

function flyToStore(stadium) {
    const lat = stadium.geometry.coordinates[1];
    const lng = stadium.geometry.coordinates[0];
    myMap.flyTo([lat, lng], 14, {
        duration: 3
    });
    setTimeout(() => {
        L.popup({ closeButton: false, offset: L.point(0, -8) })
            .setLatLng([lat, lng])
            .setContent(makePopupContent(stadium))
            .openOn(myMap);
    }, 3000);
}
