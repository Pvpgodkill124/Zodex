document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("search-form");
  const input = document.getElementById("search-input");
  const overlay = document.getElementById("search-overlay");
  const results = document.getElementById("results");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const query = input.value.trim();

    if (query === "") return;

    // Show loading overlay
    overlay.textContent = "Searching...";
    overlay.classList.remove("hidden");
    results.textContent = "";

    // Simulate search delay
    setTimeout(() => {
      // Show success message
      overlay.textContent = "✓ Found results!";
      overlay.style.color = "#0f0"; // green color for success

      // Show result message
      results.innerHTML = `<p>No results found for "<strong>${query}</strong>".</p>`;

      // Hide overlay after 1.5s
      setTimeout(() => {
        overlay.classList.add("hidden");
        overlay.style.color = "#1e90ff"; // reset color
      }, 1500);
    }, 1500); // simulate 1.5s delay
  });
});
