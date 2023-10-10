const fs = require('fs');
const path = require('path');

// Path to your service worker file
const serviceWorkerPath = path.join(__dirname, '../../client/public/serviceWorker.js');

// Read the service worker file
fs.readFile(serviceWorkerPath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the service worker file:', err);
    return;
  }

  // Generate a new timestamp
  const newTimestamp = new Date().toISOString();

  // Replace the placeholder with the new timestamp
  // Use a regular expression to find the existing timestamp and replace it
const newData = data.replace(/(Last Updated: )(.+?)(\n|$)/, `$1${newTimestamp}$3`);


  // Write the updated content back to the service worker file
  fs.writeFile(serviceWorkerPath, newData, 'utf8', (err) => {
    if (err) {
      console.error('Error updating the service worker file:', err);
      return;
    }

    console.log(`Service worker updated with new timestamp: ${newTimestamp}`);
  });
});
