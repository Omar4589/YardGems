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
import GoogleMaps from '../src/components/googleMaps/googleMap'
//import SignUpForm from "./components/SignUpForm/SignUpForm";
=======
import GoogleMaps from '../src/components/googleMaps/GoogleMaps';
import UserDashboard from './pages/UserDashboard';
import SignUpForm from "./components/SignUpForm/SignUpForm";
>>>>>>> main
import SignUpLoginPage from "./pages/SignUpLogin";
import Test from "./pages/HeaderTest";
import Header from "./components/Header/Header";


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
      <Header />
      <Router>
        <Routes>
          <Route path="/userdash" element={ <UserDashboard />}/> 
          <Route path="/" element={<GoogleMaps />}/>
          <Route path="/test" element={<Test />}/>
          <Route path="/signup-login" element={<SignUpLoginPage/>}/>
        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;
