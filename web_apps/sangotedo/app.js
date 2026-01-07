// Google Sheet CSV URL
const sheetURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRQByBMhYI-GqeivceUYqdxpYqeGNJS61_a1OTCzjaVBnEoqTfNL9eTT-ysoBytutaebSc24Swu5gUZ/pub?gid=0&single=true&output=csv";

let sheetData = [];

// Elements
const grid = document.getElementById("cardsGrid");
const detailsView = document.getElementById("detailsView");
const detailsContent = document.getElementById("detailsContent");
const backBtn = document.getElementById("backBtn");

// Load data from Google Sheets
Papa.parse(sheetURL, {
  download: true,
  header: true,
  complete: function(results) {
    sheetData = results.data.filter(row => row["Brand Name"]);
    renderCards(sheetData);
  },
  error: function(err) {
    console.error("Error loading sheet:", err);
  }
});

// Render the grid of cards
function renderCards(data) {
  grid.innerHTML = "";
  data.forEach((row, index) => {
    const card = document.createElement("div");
    card.className = "group relative h-40 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all active-scale bg-white dark:bg-gray-900 flex items-center justify-center cursor-pointer";
    
    const title = document.createElement("h3");
    title.className = "text-white text-2xl font-bold drop-shadow-md z-10 text-center px-2";
    title.textContent = row["Brand Name"];
    card.appendChild(title);

    // Optional background image if you have Image column
    if(row["Image"]) {
      card.style.backgroundImage = `linear-gradient(0deg, rgba(0,0,0,0.5), rgba(0,0,0,0.2)), url('${row["Image"]}')`;
      card.style.backgroundSize = "cover";
      card.style.backgroundPosition = "center";
    } else {
      card.style.backgroundColor = "#135bec"; // fallback color
    }

    card.addEventListener("click", () => showDetails(index));
    grid.appendChild(card);
  });
}

// Show details of a brand
function showDetails(index) {
  const row = sheetData[index];
  detailsContent.innerHTML = ""; // clear previous
  Object.entries(row).forEach(([key, value]) => {
    const div = document.createElement("div");
    div.className = "mb-2";
    div.innerHTML = `<span class="font-semibold">${key}:</span> ${value || "-"}`;
    detailsContent.appendChild(div);
  });

  // Toggle visibility
  grid.classList.add("hidden");
  detailsView.classList.remove("hidden");
}

// Back button
backBtn.addEventListener("click", () => {
  detailsView.classList.add("hidden");
  grid.classList.remove("hidden");
});
