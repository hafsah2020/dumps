const map = L.map("map").setView([9.090342, 7.4312068], 14);

// Add central office marker
L.marker([9.090342, 7.4312068], {
    icon: L.icon({
        iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png", // office icon
        iconSize: [64, 64], // size of the icon
        iconAnchor: [16, 32], // point of the icon which will correspond to marker's location
        popupAnchor: [0, -32] // point from which the popup should open
    })
}).addTo(map)
.bindPopup("<strong>DEER Nigeria (Kado)</strong>"); // popup on click


L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap contributors"
}).addTo(map);

fetch("static/data/supermarkets_in_abuja.geojson")  // relative path
  .then(res => res.json())
  .then(data => {
    L.geoJSON(data, {
      onEachFeature: (feature, layer) => {
        layer.on("click", () => {
          document.getElementById("info").innerHTML = `
            <strong>${feature.properties.super_market || "N/A"}</strong><br>
            Phone: ${feature.properties.phone_number || "N/A"}<br>
            Email: ${feature.properties.Email || "N/A"}<br>
            Address: ${feature.properties.Address || "N/A"}<br>
            Location: ${feature.properties.google_map_link || "N/A"}<br>
          `;
        });
      }
    }).addTo(map);
  })
  .catch(err => console.error("Failed to load GeoJSON:", err));

