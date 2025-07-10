// === ZODEX V4 Script ===

// Search bar logic
const form = document.getElementById("search-form");
const input = document.getElementById("search-input");
const overlay = document.getElementById("search-overlay");
const results = document.getElementById("results");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const query = input.value.trim();
  if (!query) return;

  overlay.classList.remove("hidden");
  results.innerHTML = "";

  // Fake search with Google (replace with Zodex AI later)
  setTimeout(() => {
    overlay.classList.add("hidden");
    window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, "_blank");
  }, 1000);
});

// === Theme Toggle ===
const themeToggle = document.getElementById("toggle-theme");

themeToggle?.addEventListener("change", () => {
  document.body.classList.toggle("dark", themeToggle.checked);
  localStorage.setItem("zodex-theme", themeToggle.checked ? "dark" : "light");
});

window.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("zodex-theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark");
    themeToggle.checked = true;
  }
});

// === Background Upload ===
const bgUpload = document.getElementById("bg-upload");

bgUpload?.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    const imgUrl = reader.result;
    document.body.style.backgroundImage = `url(${imgUrl})`;
    localStorage.setItem("zodex-bg", imgUrl);
  };
  reader.readAsDataURL(file);
});

const savedBg = localStorage.getItem("zodex-bg");
if (savedBg) {
  document.body.style.backgroundImage = `url(${savedBg})`;
}

// === Weather API ===
async function fetchWeather() {
  const weatherEl = document.getElementById("weather");
  weatherEl.textContent = "Getting weather...";

  try {
    const res = await fetch("https://wttr.in/?format=🌤️+%t+%w");
    const text = await res.text();
    weatherEl.textContent = `Weather: ${text}`;
  } catch (err) {
    weatherEl.textContent = "Weather failed.";
    console.error(err);
  }
}

// Call it on load
fetchWeather();

// === Settings Panel Logic ===
const settingsBtn = document.getElementById("settings-btn");
const settingsPanel = document.getElementById("settings-panel");
const saveBtn = document.getElementById("save-settings");
const resetBtn = document.getElementById("reset-settings");

settingsBtn?.addEventListener("click", () => {
  settingsPanel.classList.toggle("hidden");
});

saveBtn?.addEventListener("click", () => {
  localStorage.setItem("zodex-theme", themeToggle.checked ? "dark" : "light");
  alert("Settings saved!");
  settingsPanel.classList.add("hidden");
});

resetBtn?.addEventListener("click", () => {
  localStorage.clear();
  location.reload();
});
