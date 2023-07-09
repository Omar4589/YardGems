import React, { useState, useEffect } from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MyListings from "./pages/MyListings";
import SignUpLoginPage from "./pages/SignUpLogin";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import AboutUs from "./pages/AboutUs/AboutUs";
import SinglePost from "./pages/SinglePost/SinglePost";
import BottomNavBar from "./components/Nav/nav";
import Home from "./pages/Home/Home";
import ContactUs from "./pages/ContactUs/ContactUs";
import SavedListings from "./pages/SavedListings/SavedListings";
import { ThemeProvider } from "@mui/material/styles";

import { lightTheme, darkTheme } from "./assets/theme"; // path to your theme.js file
import UserHomePage from "./pages/UserHomePage/UserHomePage";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("id_token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  // Initialize darkMode state with the value from local storage
  const initialDarkMode = localStorage.getItem("darkMode") === "true";

  const [darkMode, setDarkMode] = useState(initialDarkMode);

  const handleThemeChange = () => {
    console.log("Theme switch toggled");
    setDarkMode(!darkMode);
    // Store the user preference in local storage
    localStorage.setItem("darkMode", darkMode);
  };

  // Save darkMode value to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  return (
    <ApolloProvider client={client}>
      <Router>
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
          <Header />
          <Routes>
            <Route path="/MyListings" element={<MyListings />} />
            <Route path="/" element={<Home />} />
            <Route path="/UserHomePage" element={<UserHomePage />} />
            <Route path="/signup-login" element={<SignUpLoginPage />} />
            <Route path="/AboutUs" element={<AboutUs />} />
            <Route path="/ContactUs" element={<ContactUs />} />
            <Route path="/listings/:listingId" element={<SinglePost />} />
            <Route path="/SavedListings" element={<SavedListings />} />
          </Routes>
          <BottomNavBar
            lightTheme={lightTheme}
            darkTheme={darkTheme}
            handleThemeChange={handleThemeChange}
            darkMode={darkMode}
          />
          <Footer />
        </ThemeProvider>
      </Router>
    </ApolloProvider>
  );
}

export default App;
