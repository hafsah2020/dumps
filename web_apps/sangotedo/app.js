// Google Sheet CSV URL (replace with your own if needed)
const sheetURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRQByBMhYI-GqeivceUYqdxpYqeGNJS61_a1OTCzjaVBnEoqTfNL9eTT-ysoBytutaebSc24Swu5gUZ/pub?gid=0&single=true&output=csv";

let sheetData = [];

// Elements
const grid = document.getElementById("cardsGrid");
const detailsView = document.getElementById("detailsView");
const detailsContent = document.getElementById("detailsContent");
const backBtn = document.getElementById("backBtn");

// Load CSV
Papa.parse(sheetURL, {
  download: true,
  header: true,
  skipEmptyLines: true,
  complete: function(results) {
    sheetData = results.data.filter(row => row["Brand Name"]); // Only rows with Brand Name
    renderCards(sheetData);
  },
  error: function(err) {
    console.error("Error loading sheet:", err);
  }
});

// Render cards
function renderCards(data) {
  grid.innerHTML = "";
  data.forEach((row, index) => {
    const card = document.createElement("div");
    card.className = "h-40 rounded-xl shadow-md flex items-center justify-center text-white text-xl font-bold cursor-pointer bg-blue-600 hover:bg-blue-700 transition-colors active-scale";

    card.textContent = row["Brand Name"];

    card.addEventListener("click", () => showDetails(index));

    grid.appendChild(card);
  });
}

// Show details
function showDetails(index) {
  const row = sheetData[index];
  detailsContent.innerHTML = "";

  Object.entries(row).forEach(([key, value]) => {
    const div = document.createElement("div");
    div.className = "mb-2";
    div.innerHTML = `<span class="font-semibold">${key}:</span> ${value || "-"}`;
    detailsContent.appendChild(div);
  });

  grid.classList.add("hidden");
  detailsView.classList.remove("hidden");
}

// Back button
backBtn.addEventListener("click", () => {
  detailsView.classList.add("hidden");
  grid.classList.remove("hidden");
});
