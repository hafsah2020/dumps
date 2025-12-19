// Initialize map
const map = L.map("map").setView([9.090342, 7.4312068], 14);

// Add OpenStreetMap tiles
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap contributors"
}).addTo(map);

// --- Office marker (blue) ---
const officeIcon = L.icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32]
});

L.marker([9.090342, 7.4312068], { icon: officeIcon })
  .addTo(map)
  .bindPopup("<strong>DEER Nigeria (Kado)</strong>")
  .on("click", () => {
    document.getElementById("info").innerHTML = `
      <p><span class="info-label">Name:</span> DEER Nigeria (Kado)</p>
      <p><span class="info-label">Reference:</span> Office / Central Location</p>
    `;
  });

// --- Supermarket icon (blue shopping cart) ---
const supermarketIcon = L.icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/283/283182.png",
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30]
});

// --- Load Google Sheet CSV (only ID and Stage) ---
Papa.parse("https://docs.google.com/spreadsheets/d/e/2PACX-1vRQByBMhYI-GqeivceUYqdxpYqeGNJS61_a1OTCzjaVBnEoqTfNL9eTT-ysoBytutaebSc24Swu5gUZ/pub?gid=0&single=true&output=csv", {
  download: true,
  header: true,
  complete: function(sheetData) {
    // Map IDs to Stage only
    const stageLookup = {};
    sheetData.data.forEach(row => {
      if (row.ID && row.Stage) {
        stageLookup[row.ID] = row.Stage;
      }
    });

    // --- Load GeoJSON ---
    fetch("static/data/supermarkets_in_abuja.geojson")
      .then(res => {
        if (!res.ok) throw new Error("GeoJSON not found: " + res.status);
        return res.json();
      })
      .then(geoData => {
        L.geoJSON(geoData, {
          pointToLayer: (feature, latlng) => L.marker(latlng, { icon: supermarketIcon }),
          onEachFeature: (feature, layer) => {
            layer.on("click", () => {
              const props = feature.properties;
              const stage = stageLookup[props.ID] || "N/A"; // lookup stage by ID
              
              document.getElementById("info").innerHTML = `
                <p><span class="info-label">Supermarket:</span> ${props.super_market || "N/A"}</p>
                <p><span class="info-label">Phone:</span> ${props.phone_number || "N/A"}</p>
                <p><span class="info-label">Email:</span> ${props.Email || "N/A"}</p>
                <p><span class="info-label">Address:</span> ${props.Address || "N/A"}</p>
                <p><span class="info-label">Stage:</span> ${stage}</p>
                <p><span class="info-label">Google Map:</span> <a href="${props.google_map_link || "#"}" target="_blank">View</a></p>
              `;
            });
          }
        }).addTo(map);
      })
      .catch(err => console.error("Failed to load GeoJSON:", err));
  },
  error: function(err) {
    console.error("Failed to load Google Sheet CSV:", err);
  }
});
