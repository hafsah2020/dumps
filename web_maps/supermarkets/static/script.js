const map = L.map("map").setView([9.090342, 7.4312068], 14);

// Add base tile layer
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap contributors"
}).addTo(map);

// Add central office marker
L.marker([9.090342, 7.4312068], {
    icon: L.icon({
        iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png", // office icon
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
    })
}).addTo(map)
.bindPopup("<strong>DEER Nigeria (Kado)</strong>")
.on("click", () => {
    document.getElementById("info").innerHTML = `
      <p><span class="info-label">Name:</span> DEER Nigeria (Kado)</p>
      <p><span class="info-label">Type:</span> Headquarters</p>
      <p><span class="info-label">Status:</span> Active</p>
    `;
});

// Load supermarkets GeoJSON
fetch("static/data/supermarkets_in_abuja.geojson")
  .then(res => res.json())
  .then(data => {
    L.geoJSON(data, {
      pointToLayer: (feature, latlng) => {
        // Optional: custom icon for supermarkets
        return L.marker(latlng, {
          icon: L.icon({
            iconUrl: "https://cdn-icons-png.flaticon.com/512/148/148836.png",
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [0, -41]
          })
        });
      },
      onEachFeature: (feature, layer) => {
        layer.on("click", () => {
          document.getElementById("info").innerHTML = `
            <p><span class="info-label">Supermarket:</span> ${feature.properties.super_market || "N/A"}</p>
            <p><span class="info-label">Phone:</span> ${feature.properties.phone_number || "N/A"}</p>
            <p><span class="info-label">Email:</span> ${feature.properties.Email || "N/A"}</p>
            <p><span class="info-label">Address:</span> ${feature.properties.Address || "N/A"}</p>
            <p><span class="info-label">Google Map:</span> <a href="${feature.properties.google_map_link || "#"}" target
