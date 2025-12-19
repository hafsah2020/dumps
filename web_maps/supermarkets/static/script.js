// Initialize map
const map = L.map("map").setView([9.090342, 7.4312068], 14);

// Add OpenStreetMap tiles
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap contributors"
}).addTo(map);

// --- Office marker (blue) ---
const officeIcon = L.icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png", 
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

// --- Function to return icon based on stage ---
function getStageIcon(stage) {
  let url;
  switch(stage.toLowerCase()) {
    case "yet to contact":
      url = "https://cdn-icons-png.flaticon.com/512/684/684908.png"; // red
      break;
    case "contacted and promising":
      url = "https://cdn-icons-png.flaticon.com/512/684/684908.png"; // yellow
      break;
    case "contacted but unsure":
      url = "https://cdn-icons-png.flaticon.com/512/684/684908.png"; // brown
      break;
    case "converted":
      url = "https://cdn-icons-png.flaticon.com/512/684/684908.png"; // green
      break;
    default:
      url = "https://cdn-icons-png.flaticon.com/512/684/684908.png"; // red as default
  }
  return L.icon({
    iconUrl: url,
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30]
  });
}

// --- Load Google Sheet CSV (ID + Stage) ---
Papa.parse("https://docs.google.com/spreadsheets/d/e/2PACX-1vRQByBMhYI-GqeivceUYqdxpYqeGNJS61_a1OTCzjaVBnEoqTfNL9eTT-ysoBytutaebSc24Swu5gUZ/pub?gid=0&single=true&output=csv", {
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
            const stage = stageLookup[feature.properties.ID] || "yet to contact";
            return L.marker(latlng, { icon: getStageIcon(stage) });
          },
          onEachFeature: (feature, layer) => {
            layer.on("click", () => {
              const props = feature.properties;
              const stage = stageLookup[props.ID] || "yet to contact";
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
