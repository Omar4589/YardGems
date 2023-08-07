//--------------------------------IMPORTS----------------------------------//
import React, { useEffect, useState, useContext, createContext } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_POSTS, USER_QUERY } from "./queries";

//Here we create the context
const ListingContext = createContext();

// Custom hook to provide usage of the listing context
export const useListingContext = () => useContext(ListingContext);

//----------------------------START OF CONTEXT PROVIDER--------------------//
export const ListingProvider = ({ children }) => {
  //-----------------STATE-------------------//
  const [listings, setListings] = useState([]);

  //-----------------QUERIES-----------------//

  const { data: allListingsData } = useQuery(QUERY_POSTS);

  const { loading, data: loggedInUserData } = useQuery(USER_QUERY);
  //Here we set the user data to a variable
  const loggedInUser = loggedInUserData?.me || [];

  //-----------------HOOKS-------------------//

  //This useEffect hook runs when component mounts and
  //sets listings state to initial listings query
  useEffect(() => {
    // Variable that holds all listings, an array of objects containing listings props
    const allListings = allListingsData?.allPost || [];

    setListings(allListings);
  }, []);

  // This useEffect hook updates the listings state to render any
  // new listings that are added, we set allListingsData as a dependency so that
  //this hook runs when there is a change to allListingsData
  useEffect(() => {
    // Variable that holds all listings, an array of objects containing listings props
    const allListings = allListingsData?.allPost || [];

    setListings(allListings);
  }, [allListingsData]);

  // The value prop expects an initial state object, in this case
  //the initial state is the listings state, we also pass in the loggedInUser's info
  return (
    <ListingContext.Provider value={{ listings, loggedInUser }}>
      {children}
    </ListingContext.Provider>
  );
};
