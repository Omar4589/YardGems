import React, { useState, useEffect } from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import MyListings from "./pages/MyListings/MyListings";
import SignUpLoginPage from "./pages/SignUpLogin/SignUpLogin";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import AboutUs from "./pages/AboutUs/AboutUs";
import EditListing from "./pages/EditListing/EditListing";
import BottomNavBar from "./components/Nav/nav";
import Home from "./pages/Home/Home";
import ContactUs from "./pages/ContactUs/ContactUs";
import SavedListings from "./pages/SavedListings/SavedListings";
import { ListingProvider } from "./utils/ListingContext";
import { MapCenterProvider } from "./utils/MapCenterContext";
import MyAccount from "./pages/MyAccount/MyAccount";
import FAQ from "./pages/FAQ/FAQ";
import IOSInstall from "./pages/IOSInstall/IOSInstall";
import LoadingScreen from "./components/LoadingScreen/LoadingScreen";
import { displayWelcomeLog } from "./utils/displayConsoleMessage";

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

//----------------START OF COMPONENT------------//
function App() {
  ///----------STATE------------------//
  //state used to show loading screen at first load
  const [loading, setLoading] = useState(true);
  //------------------HOOKS----------------//
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1300);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    displayWelcomeLog();
  }, []);

  return (
    <ApolloProvider client={client}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <MapCenterProvider>
          <ListingProvider>
            {loading && <LoadingScreen />}
            {/* Show the loading screen if loading is true */}
            <Router>
              <Header />
              <Routes>
                <Route path="/signup-login" element={<SignUpLoginPage />} />
                <Route path="/" element={<Home />} />
                <Route path="/MyListings" element={<MyListings />} />
                <Route path="/SavedListings" element={<SavedListings />} />
                <Route path="/listings/:listingId" element={<EditListing />} />
                <Route path="/AboutUs" element={<AboutUs />} />
                <Route path="/ContactUs" element={<ContactUs />} />
                <Route path="/MyAccount" element={<MyAccount />} />
                <Route path="/FAQ" element={<FAQ />} />
                <Route
                  path="/iOS-installation-instructions"
                  element={<IOSInstall />}
                />
              </Routes>
              <BottomNavBar />
              <Footer />
            </Router>
          </ListingProvider>
        </MapCenterProvider>
      </LocalizationProvider>
    </ApolloProvider>
  );
}

export default App;
