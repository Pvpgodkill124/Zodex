// script.js for ZODEX V3 (with backend connection)

import { fetchZodexResults } from './js/backend.js';

const form = document.getElementById("search-form");
const input = document.getElementById("search-input");
const resultsContainer = document.getElementById("results");
const overlay = document.getElementById("search-overlay");

// Default engine
let currentEngine = "zodex";

// Engine options
const engines = {
  zodex: query => fetchZodexResults(query), // Connected to backend

  google: query => {
    window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, "_blank");
    return Promise.resolve([]);
  },

  bing: query => {
    window.open(`https://www.bing.com/search?q=${encodeURIComponent(query)}`, "_blank");
    return Promise.resolve([]);
  },

  duckduckgo: query => {
    window.open(`https://duckduckgo.com/?q=${encodeURIComponent(query)}`, "_blank");
    return Promise.resolve([]);
  }
};

// Form submission
form.addEventListener("submit", async e => {
  e.preventDefault();
  const query = input.value.trim();
  if (!query) return;

  overlay.classList.remove("hidden");
  resultsContainer.innerHTML = "";

  try {
    const results = await engines[currentEngine](query);
    overlay.classList.add("hidden");

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
  } catch (err) {
    overlay.classList.add("hidden");
    resultsContainer.innerHTML = "<p>Error fetching results.</p>";
    console.error("Zodex Lite API error:", err);
  }
});
