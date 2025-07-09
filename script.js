// script.js for ZODEX V3 (All-in-one version, no imports)

const form = document.getElementById("search-form"); const input = document.getElementById("search-input"); const resultsContainer = document.getElementById("results"); const overlay = document.getElementById("search-overlay");

// Simulated Zodex Lite API - backend async function fetchZodexResults(query) { const database = [ { title: "Zodex Home", url: "https://pvpgodkill124.github.io/Zodex/" }, { title: "Zodex Elite Search", url: "https://pvpgodkill124.github.io/Zodex/?search=elite" }, { title: "ReminderNova - Smart Reminder", url: "https://www.remidernova.nichesite.org" }, { title: "Zodex Docs", url: "https://zodex.docs.io" }, { title: "Zodex Privacy Center", url: "https://zodex.privacy.io" }, { title: "Build your own browser", url: "https://zodex.dev/blog/build-browser" } ];

const results = database.filter(entry => entry.title.toLowerCase().includes(query.toLowerCase()) || entry.url.toLowerCase().includes(query.toLowerCase()) );

await new Promise(resolve => setTimeout(resolve, 500)); return results; }

// Default engine let currentEngine = "zodex";

// Engine options const engines = { zodex: query => fetchZodexResults(query),

google: query => { window.open(https://www.google.com/search?q=${encodeURIComponent(query)}, "_blank"); return Promise.resolve([]); },

bing: query => { window.open(https://www.bing.com/search?q=${encodeURIComponent(query)}, "_blank"); return Promise.resolve([]); },

duckduckgo: query => { window.open(https://duckduckgo.com/?q=${encodeURIComponent(query)}, "_blank"); return Promise.resolve([]); } };

// Form submission form.addEventListener("submit", async e => { e.preventDefault(); const query = input.value.trim(); if (!query) return;

overlay.classList.remove("hidden"); resultsContainer.innerHTML = "";

try { const results = await enginescurrentEngine; overlay.classList.add("hidden");

if (results.length === 0) {
  resultsContainer.innerHTML = "<p>No results found.</p>";
} else {
  const ul = document.createElement("ul");
  results.forEach(result => {
    const li = document.createElement("li");
    const link = document.createElement("a");
    link.href = result.url;
    link.textContent = result.title;
    link.target = "_blank";
    li.appendChild(link);
    ul.appendChild(li);
  });
  resultsContainer.appendChild(ul);
}

} catch (err) { overlay.classList.add("hidden"); resultsContainer.innerHTML = "<p>Error fetching results.</p>"; console.error("Zodex Lite API error:", err); } });

