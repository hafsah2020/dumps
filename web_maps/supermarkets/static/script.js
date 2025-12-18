// Initialize map centered at DEER Nigeria office
const map = L.map("map").setView([9.090342, 7.4312068], 14);

// Add OpenStreetMap tile layer
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap contributors"
}).addTo(map);

// --- Office marker ---
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
    <p><span class="info-label">Name:</span> Reference point</p>
  `;
});

// --- Load supermarkets GeoJSON ---
fetch("static/data/supermarkets_in_abuja.geojson") // relative path from index.html
  .then(res => {
    if (!res.ok) throw new Error("GeoJSON not found: " + res.status);
    return res.json();
  })
  .then(data => {
    console.log("GeoJSON loaded:", data); // debug

    L.geoJSON(data, {
      pointToLayer: (feature, latlng) => {
        // Use custom marker for supermarkets
        return L.marker(latlng, {
          icon: L.icon({
            iconUrl: "https://www.pngkit.com/png/detail/129-1294869_pin-location-map-icon-navigation-symbol-ma-google.png"",
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [0, -41]
          })
        });
      },
      onEachFeature: (feature, layer) => {
        layer.on("click", () => {
          // Update sidebar
          const props = feature.properties;
          document.getElementById("info").innerHTML = `
            <p><span class="info-label">Supermarket:</span> ${props.super_market || "N/A"}</p>
            <p><span class="info-label">Phone:</span> ${props.phone_number || "N/A"}</p>
            <p><span class="info-label">Email:</span> ${props.Email || "N/A"}</p>
            <p><span class="info-label">Address:</span> ${props.Address || "N/A"}</p>
            <p><span class="info-label"><a href="${props.google_map_link || "#"}" target="_blank">View on google map</a></p>
          `;
        });
      }
    }).addTo(map);
  })
  .catch(err => console.error("Failed to load GeoJSON:", err));
