// Google Sheet CSV URL
const sheetURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRQByBMhYI-GqeivceUYqdxpYqeGNJS61_a1OTCzjaVBnEoqTfNL9eTT-ysoBytutaebSc24Swu5gUZ/pub?gid=0&single=true&output=csv";

let sheetData = [];

// Load sheet with Papa Parse
Papa.parse(sheetURL, {
  download: true,
  header: true,
  complete: function(results) {
    sheetData = results.data.filter(row => row["Brand Name"]); // Only rows with Brand Name
    renderCards(sheetData);
  },
  error: function(err) {
    console.error("Error loading sheet:", err);
  }
});

// Render cards dynamically
function renderCards(data) {
  const grid = document.getElementById("cardsGrid");
  grid.innerHTML = "";

  data.forEach((row, index) => {
    const a = document.createElement("a");
    a.href = "#";
    a.className = "group block relative w-full h-40 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all active-scale bg-white dark:bg-gray-900 flex items-center justify-center";

    // Optional: background image if you have a URL column called "Image"
    if(row["Image"]) {
      a.style.backgroundImage = `linear-gradient(0deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.2) 100%), url('${row["Image"]}')`;
      a.style.backgroundSize = "cover";
      a.style.backgroundPosition = "center";
    }

    const h3 = document.createElement("h3");
    h3.className = "text-white text-3xl font-bold tracking-tight drop-shadow-md";
    h3.textContent = row["Brand Name"];
    a.appendChild(h3);

    // Click: show alert or later navigate to details page
    a.addEventListener("click", (e) => {
      e.preventDefault();
      alert(JSON.stringify(row, null, 2));
      // TODO: implement details screen here
    });

    grid.appendChild(a);
  });
}
