import React from "react";
import ReactDom from "react-dom";
import App from "./App";

// At the top of your index.js
// if ('serviceWorker' in navigator) {
//     navigator.serviceWorker.register('/serviceWorker.js')
//       .then((registration) => {
//         console.log('Service Worker registered with scope:', registration.scope);
//       })
//       .catch((error) => {
//         console.log('Service Worker registration failed:', error);
//       });
//   }
  


ReactDom.render(<App />, document.getElementById("root"));
