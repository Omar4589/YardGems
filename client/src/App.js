import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MyListings from "./pages/MyListings/MyListings";
import SignUpLoginPage from "./pages/SignUpLogin";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import AboutUs from "./pages/AboutUs/AboutUs";
import SinglePost from "./pages/SinglePost/SinglePost";
import BottomNavBar from "./components/Nav/nav";
import Home from "./pages/Home/Home";
import ContactUs from "./pages/ContactUs/ContactUs";
import SavedListings from "./pages/SavedListings/SavedListings";
import { ListingProvider } from "./utils/ListingContext";

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
  return (
    <ApolloProvider client={client}>
      <ListingProvider>
        <Router>
          <Header />
          <Routes>
            <Route path="/signup-login" element={<SignUpLoginPage />} />
            <Route path="/" element={<Home />} />
            <Route path="/MyListings" element={<MyListings />} />
            <Route path="/SavedListings" element={<SavedListings />} />
            <Route path="/listings/:listingId" element={<SinglePost />} />
            <Route path="/AboutUs" element={<AboutUs />} />
            <Route path="/ContactUs" element={<ContactUs />} />
          </Routes>
          <BottomNavBar />
          <Footer />
        </Router>
      </ListingProvider>
    </ApolloProvider>
  );
}

export default App;
