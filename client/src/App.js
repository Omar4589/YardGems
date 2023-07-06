import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
<<<<<<< HEAD
import GoogleMaps from "../src/components/googleMaps/GoogleMaps";
import UserDashboard from "./pages/MyListings";
=======
import MyListings from "./pages/MyListings";
>>>>>>> main
import SignUpLoginPage from "./pages/SignUpLogin";
import Test from "./pages/HeaderTest";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import AboutUs from "./pages/AboutUs";
import SinglePost from "./pages/SinglePost";
import BottomNavBar from "./components/Nav/nav";
import Home from "./pages/Home/Home";

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
      <Router>
        <Header />
        <Routes>
<<<<<<< HEAD
          <Route path="/MyListings" element={<UserDashboard />} />
          <Route path="/" element={<GoogleMaps />} />
=======
          <Route path="/MyListings" element={<MyListings />} />
          <Route path="/" element={<Home />} />
>>>>>>> main
          <Route path="/test" element={<Test />} />
          <Route path="/signup-login" element={<SignUpLoginPage />} />
          <Route path="/AboutUs" element={<AboutUs />} />
          <Route path="/listings/:listingId" element={<SinglePost />} />
        </Routes>
        <BottomNavBar />
        <Footer />
      </Router>
    </ApolloProvider>
  );
}

export default App;
