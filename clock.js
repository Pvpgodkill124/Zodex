function updateClock() {
  const clock = document.getElementById("clock");
  const now = new Date();
  const time = now.toLocaleTimeString();
  clock.textContent = time;
}

setInterval(updateClock, 1000);
updateClock();
