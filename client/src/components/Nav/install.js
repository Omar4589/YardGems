let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  // Your custom condition, for example, a user clicks a specific button, reaches a certain page, etc.
});

// Somewhere in your code where your condition gets met:
if (window.matchMedia('(display-mode: standalone)').matches) {
    console.log("This is running as standalone.");
  } else {
    console.log("This is running in a browser tab.");
  }
  

function showInstallButton() {
  const installButton = document.getElementById('install-button');
  installButton.hidden = false;

  installButton.addEventListener('click', () => {
    deferredPrompt.prompt();
  });
}
