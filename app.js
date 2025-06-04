// Register the Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js')
    .then(() => console.log("Service Worker Registered"))
    .catch(error => console.error("Service Worker Error:", error));
}

// Handle saved name (optional feature)
document.addEventListener("DOMContentLoaded", () => {
  const name = localStorage.getItem("userName");
  const greeting = document.getElementById("greeting");
  const nameForm = document.getElementById("nameForm");

  if (name && greeting && nameForm) {
    greeting.textContent = `Welcome back, ${name}!`;
    nameForm.style.display = "none";
  }
});

// Save name to localStorage
function saveName() {
  const input = document.getElementById("nameInput");
  const name = input.value.trim();
  if (name) {
    localStorage.setItem("userName", name);
    const greeting = document.getElementById("greeting");
    const nameForm = document.getElementById("nameForm");
    if (greeting && nameForm) {
      greeting.textContent = `Welcome, ${name}!`;
      nameForm.style.display = "none";
    }
  }
}

// PWA Install Prompt
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;

  const installBtn = document.createElement('button');
  installBtn.textContent = "Install App";
  installBtn.style.position = "fixed";
  installBtn.style.bottom = "20px";
  installBtn.style.right = "20px";
  installBtn.style.padding = "10px 15px";
  installBtn.style.zIndex = "999";
  installBtn.style.backgroundColor = "#000";
  installBtn.style.color = "#fff";
  installBtn.style.border = "none";
  installBtn.style.borderRadius = "5px";
  installBtn.style.boxShadow = "0 2px 5px rgba(0,0,0,0.3)";
  document.body.appendChild(installBtn);

  installBtn.addEventListener('click', () => {
    installBtn.remove();
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then(choice => {
      if (choice.outcome === 'accepted') {
        console.log("User accepted the install prompt");
      } else {
        console.log("User dismissed the install prompt");
      }
      deferredPrompt = null;
    });
  });
});
