if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js')
    .then(() => console.log("Service Worker Registered"))
    .catch(error => console.error("Service Worker Error:", error));
}

document.addEventListener("DOMContentLoaded", () => {
  const name = localStorage.getItem("userName");
  const greeting = document.getElementById("greeting");
  const nameForm = document.getElementById("nameForm");

  if (name) {
    greeting.textContent = `Welcome back, ${name}!`;
    nameForm.style.display = "none";
  }
});

function saveName() {
  const input = document.getElementById("nameInput");
  const name = input.value.trim();
  if (name) {
    localStorage.setItem("userName", name);
    document.getElementById("greeting").textContent = `Welcome, ${name}!`;
    document.getElementById("nameForm").style.display = "none";
  }
}