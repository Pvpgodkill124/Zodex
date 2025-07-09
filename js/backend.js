
// backend.js (Zodex Lite API - Simulated backend)

export async function fetchZodexResults(query) {
  const database = [
    { title: "Zodex Home", url: "https://pvpgodkill124.github.io/Zodex/" },
    { title: "Zodex Elite Search", url: "https://pvpgodkill124.github.io/Zodex/?search=elite" },
    { title: "ReminderNova - Smart Reminder", url: "https://www.remidernova.nichesite.org" },
    { title: "Zodex Docs", url: "https://zodex.docs.io" },
    { title: "Zodex Privacy Center", url: "https://zodex.privacy.io" },
    { title: "Build your own browser", url: "https://zodex.dev/blog/build-browser" }
  ];

  const results = database.filter(entry =>
    entry.title.toLowerCase().includes(query.toLowerCase()) ||
    entry.url.toLowerCase().includes(query.toLowerCase())
  );

  await new Promise(resolve => setTimeout(resolve, 500));
  return results;
}
