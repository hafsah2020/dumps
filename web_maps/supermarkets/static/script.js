const map = L.map("map").setView([9.090342, 7.4312068], 11);

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

