// script.js for ZODEX V3 (Zodex AI Engine patched)

const form = document.getElementById("search-form");
const input = document.getElementById("search-input");
const resultsContainer = document.getElementById("results");
const overlay = document.getElementById("search-overlay");

// ✅ Zodex AI Engine (local results)
async function fetchZodexResults(query) {
  const database = [
    {
      title: "Zodex Home",
      url: "https://pvpgodkill124.github.io/Zodex/",
      keywords: ["zodex", "home", "main"]
    },
    {
      title: "Zodex Elite Search",
      url: "https://pvpgodkill124.github.io/Zodex/?search=elite",
      keywords: ["elite", "engine", "search"]
    },
    {
      title: "ReminderNova - Smart Reminder",
      url: "https://www.remidernova.nichesite.org",
      keywords: ["remindernova", "reminder", "nova", "zodex"]
    },
    {
      title: "Zodex Docs",
      url: "https://zodex.docs.io",
      keywords: ["docs", "documentation", "help"]
    },
    {
      title: "Zodex Privacy Center",
      url: "https://zodex.privacy.io",
      keywords: ["privacy", "settings", "secure"]
    },
    {
      title: "DR1WEB",
      url: "https://dr1web.site.io",
      keywords: ["dr1web", "dr1", "browser"]
    }
  ];

  const q = query.toLowerCase();
  const results = database.filter(entry => {
    return (
      entry.title.toLowerCase().includes(q) ||
      entry.url.toLowerCase().includes(q) ||
      entry.keywords.some(k => k.toLowerCase().includes(q) || q.includes(k.toLowerCase()))
    );
  });

  await new Promise(resolve => setTimeout(resolve, 300)); // Simulated delay
  return results;
}

// ✅ Search engine handlers
const engines = {
  zodex: query => fetchZodexResults(query),

  // Optional: external engines (currently not used)
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

let currentEngine = "zodex";

// 🔍 Search logic
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
    console.error("Zodex AI Engine error:", err);
  }
});
