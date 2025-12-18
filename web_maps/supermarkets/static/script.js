const map = L.map("map").setView([9.090342, 7.4312068], 11);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap contributors"
}).addTo(map);

fetch("static/data/supermarkets_in_abuja.geojson")
  .then(response => response.json())
  .then(data => {
    L.geoJSON(data, {
      onEachFeature: (feature, layer) => {
        layer.on("click", () => {
          document.getElementById("info").innerHTML = `
            <strong>${feature.properties.name || "N/A"}</strong><br>
            Type: ${feature.properties.type || "N/A"}
          `;
        });
      }
    }).addTo(map);
  })
  .catch(err => console.error("GeoJSON load error:", err));
