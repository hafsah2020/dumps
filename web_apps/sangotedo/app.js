const sheetURL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRQByBMhYI-GqeivceUYqdxpYqeGNJS61_a1OTCzjaVBnEoqTfNL9eTT-ysoBytutaebSc24Swu5gUZ/pub?gid=0&single=true&output=csv";

let sheetData = [];

// Load data
Papa.parse(sheetURL, {
  download: true,
  header: true,
  complete: function (results) {
    sheetData = results.data.filter(row => row["Brand Name"]);
    renderCards(sheetData);
  },
  error: function (err) {
    console.error("Error loading sheet:", err);
  }
});

function renderCards(data) {
  const grid = document.getElementById("cardGrid");
  grid.innerHTML = "";

  data.forEach((row, index) => {
    const card = document.createElement("div");
    card.className = "card";
    card.textContent = row["Brand Name"]; // 👈 only brand name

    card.addEventListener("click", () => showDetails(index));

    grid.appendChild(card);
  });
}

function showDetails(index) {
  const row = sheetData[index];
  const detailsCard = document.getElementById("detailsCard");
  detailsCard.innerHTML = "";

  Object.entries(row).forEach(([key, value]) => {
    const div = document.createElement("div");
    div.className = "details-row";

    div.innerHTML = `
      <div class="details-label">${key}</div>
      <div>${value || "-"}</div>
    `;

    detailsCard.appendChild(div);
  });

  document.getElementById("gridView").style.display = "none";
  document.getElementById("detailsView").style.display = "block";
}

// Back button
document.getElementById("backBtn").addEventListener("click", () => {
  document.getElementById("detailsView").style.display = "none";
  document.getElementById("gridView").style.display = "block";
});
