//Uus interaktiivne kaart
//Baseerub  leafletjs.com põhjal
kaart();

function kaart() {
    //loob kaardi
    var mymap = L.map('mapid').setView([58.43, 26.7290], 9);
    //loob layeri, teeb viited
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
        maxZoom: 18,
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
            '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
            'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1
    }).addTo(mymap);
    //teeb kindla ikooni standartse asemel, veel implementeerimata
    var myIcon = L.icon({
        iconUrl: 'skin/tahis_kaart_transparent.png',
        iconSize: [20, 30],
        iconAnchor: [10,30],
        popupAnchor: [0,-30],
    });
    //loenduvad markerid serveri ühilduvuse jaoks
    var Opins = [];
    Opins[0] = L.marker([58.283917, 26.894074], {icon: myIcon}).bindPopup("1. Tartu päevak <br> 02.07 <br> Vooremägi").openPopup().addTo(mymap);
    Opins[1] = L.marker([58.650581, 26.780543], {icon: myIcon}).bindPopup("2. Tartu päevak <br> 09.07 <br> Saare").openPopup().addTo(mymap);
    Opins[2] = L.marker([58.168966, 26.414737], {icon: myIcon}).bindPopup("3. Tartu päevak <br> 08.10 <br> Vitipalu").openPopup().addTo(mymap);
}
