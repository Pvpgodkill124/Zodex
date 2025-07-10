// === ZODEX V4/V5 Script ===

const form = document.getElementById("search-form");
const input = document.getElementById("search-input");
const overlay = document.getElementById("search-overlay");
const results = document.getElementById("results");

form?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const query = input.value.trim();
  if (!query) return;

  overlay.classList.remove("hidden");
  results.innerHTML = "";

  // Use Google search (temporary until Zodex API ready)
  setTimeout(() => {
    overlay.classList.add("hidden");
    window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, "_blank");
  }, 500);
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
    if (themeToggle) themeToggle.checked = true;
  }

  // Apply saved background
  const savedBg = localStorage.getItem("zodex-bg");
  if (savedBg) {
    document.body.style.backgroundImage = `url(${savedBg})`;
  }

  // Clock toggle
  const clockVisible = localStorage.getItem("zodex-show-clock") === "true";
  document.getElementById("clock").style.display = clockVisible ? "block" : "none";
  const toggleClock = document.getElementById("toggle-clock");
  if (toggleClock) toggleClock.checked = clockVisible;

  // Weather toggle
  const weatherVisible = localStorage.getItem("zodex-show-weather") === "true";
  document.getElementById("weather").style.display = weatherVisible ? "block" : "none";
  const toggleWeather = document.getElementById("toggle-weather");
  if (toggleWeather) toggleWeather.checked = weatherVisible;
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

// === Clock ===
function updateClock() {
  const clockEl = document.getElementById("clock");
  if (!clockEl) return;
  const now = new Date();
  const timeStr = now.toLocaleTimeString();
  clockEl.textContent = `🕒 ${timeStr}`;
}
setInterval(updateClock, 1000);
updateClock();

// === Weather ===
async function fetchWeather() {
  const weatherEl = document.getElementById("weather");
  if (!weatherEl) return;
  try {
    const res = await fetch("https://wttr.in/?format=🌤️+%t+%w");
    const text = await res.text();
    weatherEl.textContent = `Weather: ${text}`;
  } catch (err) {
    weatherEl.textContent = "Weather failed.";
    console.error(err);
  }
}
fetchWeather();

// === Settings Panel ===
const settingsBtn = document.getElementById("settings-btn");
const settingsPanel = document.getElementById("settings-panel");
const saveBtn = document.getElementById("save-settings");
const resetBtn = document.getElementById("reset-settings");

settingsBtn?.addEventListener("click", () => {
  settingsPanel.classList.toggle("hidden");
});

saveBtn?.addEventListener("click", () => {
  // Save theme
  localStorage.setItem("zodex-theme", themeToggle.checked ? "dark" : "light");

  // Save clock
  const showClock = document.getElementById("toggle-clock").checked;
  document.getElementById("clock").style.display = showClock ? "block" : "none";
  localStorage.setItem("zodex-show-clock", showClock);

  // Save weather
  const showWeather = document.getElementById("toggle-weather").checked;
  document.getElementById("weather").style.display = showWeather ? "block" : "none";
  localStorage.setItem("zodex-show-weather", showWeather);

  alert("Settings saved!");
  settingsPanel.classList.add("hidden");
});

resetBtn?.addEventListener("click", () => {
  localStorage.clear();
  location.reload();
});
