// ZODEX Lite Search (V1)

// Mock Results for demo purposes
const mockResults = [
  {
    title: "ZODEX – Official Site",
    link: "https://zodex.lite/search",
    description: "ZODEX is a fast, secure, and private search engine."
  },
  {
    title: "ReminderNova – Free Reminder App",
    link: "https://www.remidernova.nichesite.org",
    description: "Set reminders, get notified, and stay on track with ReminderNova."
  },
  {
    title: "DR1WEB Project – GitHub",
    link: "https://dr1web.neocities.org",
    description: "Explore the browser and homepage project by DR1TRA."
  }
];

function performSearch() {
  const input = document.getElementById("searchInput");
  const query = input.value.trim().toLowerCase();
  const resultsBox = document.getElementById("results");
  resultsBox.innerHTML = "";

  if (!query) {
    resultsBox.innerHTML = "<p>Please enter a search query.</p>";
    return;
  }

  // Simulate fetching results (use real API later)
  const filtered = mockResults.filter(result =>
    result.title.toLowerCase().includes(query) ||
    result.description.toLowerCase().includes(query)
  );

  if (filtered.length === 0) {
    resultsBox.innerHTML = "<p>No results found.</p>";
    return;
  }

  // Display results
  filtered.forEach(result => {
    const div = document.createElement("div");
    div.className = "result";
    div.innerHTML = `
      <a href="${result.link}" target="_blank">${result.title}</a>
      <p>${result.description}</p>
    `;
    resultsBox.appendChild(div);
  });
}
