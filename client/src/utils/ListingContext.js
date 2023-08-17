//--------------------------------IMPORTS----------------------------------//
import React, { useEffect, useState, useContext, createContext } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_LISTINGS, ME_QUERY } from "./queries";

//Here we create the context
const ListingContext = createContext();

// Here we create a  hook to provide usage of the listing context, we use 'export' to make it exportable
export const useListingContext = () => useContext(ListingContext);

//----------------------------START OF CONTEXT PROVIDER--------------------//
export const ListingProvider = ({ children }) => {
  //-----------------STATE-------------------//
  //Here we create a state called 'listings' that we will use to keep track of ALL LISTINGS in database
  //We first set it to an empty array because we havent fetched the data yet
  const [listings, setListings] = useState([]);

  //-----------------QUERIES-----------------//
  const { data: allListingsData } = useQuery(QUERY_LISTINGS);

  const { data: loggedInUserData } = useQuery(ME_QUERY);

  //-----------------HOOKS-------------------//
  //The useEffect hook below runs when component mounts and sets the listings state to the allListingsData
  // This useEffect hook updates the listings state to render any
  // new listings that are added, we set allListingsData as a dependency so that this hook runs when there is a change to allListingsData

  useEffect(() => {
    if (allListingsData && loggedInUserData) {
      const allListings = allListingsData?.allListings || [];

      const userFavorites = loggedInUserData.me.savedFavorites || [];

        // Compare and create listingsWithFavorites
        const updatedListings = allListings.map((listing) => ({
          ...listing,
          isFavorited: userFavorites.includes(listing._id),
        }));

        setListings(updatedListings)
    }
    // Variable that holds all listings, an array of objects containing listings props
    //if there are no listings available, we set this variable to an empty array
    // const allListings = allListingsData?.allListings || [];

    // setListings(allListings);
  }, [allListingsData, loggedInUserData]);

  //---------------RETURN STATEMENT-------------------//

  // The value prop expects an initial state object, in this case
  //the initial state is the listings state, we also pass in the state setter and loggedInUser's info in case we need it
  return (
    <ListingContext.Provider value={{ listings, setListings, loggedInUserData }}>
      {children}
    </ListingContext.Provider>
  );
};
