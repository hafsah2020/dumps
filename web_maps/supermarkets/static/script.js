// Initialize map
const map = L.map("map").setView([9.090342, 7.4312068], 14);

// Add OpenStreetMap tiles
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap contributors"
}).addTo(map);

// --- Office marker (blue) ---
const officeIcon = L.icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png", // blue office
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

// --- Function to select marker icon based on stage ---
function getStageIcon(stage) {
  let url;
  switch(stage.toLowerCase()) {
    case "contacted":
      url = "https://maps.google.com/mapfiles/ms/icons/yellow-dot.png";
      break;
    case "negotiating":
      url = "https://maps.google.com/mapfiles/ms/icons/orange-dot.png";
      break;
    case "signed":
      url = "https://maps.google.com/mapfiles/ms/icons/green-dot.png";
      break;
    default:
      url = "https://maps.google.com/mapfiles/ms/icons/blue-dot.png";
  }
  return L.icon({
    iconUrl: url,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
  });
}

// --- Load Google Sheet CSV (only ID and Stage) ---
Papa.parse("https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/pub?output=csv", {
  download: true,
  header: true,
  complete: function(sheetData) {
    const stageLookup = {};
    sheetData.data.forEach(row => {
      if (row.ID && row.Stage) stageLookup[row.ID] = row.Stage;
    });

    // Load GeoJSON
    fetch("static/data/supermarkets_in_abuja.geojson")
      .then(res => res.json())
      .then(geoData => {
        L.geoJSON(geoData, {
          pointToLayer: (feature, latlng) => {
            const stage = stageLookup[feature.properties.ID] || "N/A";
            return L.marker(latlng, { icon: getStageIcon(stage) });
          },
          onEachFeature: (feature, layer) => {
            layer.on("click", () => {
              const props = feature.properties;
              const stage = stageLookup[props.ID] || "N/A";
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
