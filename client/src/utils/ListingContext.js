import React, { useEffect, useState, useContext, createContext } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_POSTS, USER_QUERY } from "./queries";

const ListingContext = createContext();

// Custom hook to provide usage of the student context
export const useListingContext = () => useContext(ListingContext);

export const ListingProvider = ({ children }) => {
  const [listings, setListings] = useState([]);

  //------QUERIES-----//

  const { data: allListingsData } = useQuery(QUERY_POSTS);
  const { loading, data: loggedInUserData } = useQuery(USER_QUERY);

  const loggedInUser = loggedInUserData?.me || [];
  //console.log(loggedInUser)

  //-----------MUTATIONS----------//

  // This useEffect hook updates the listings state to render any
  // new listings that are added
  useEffect(() => {
    // Variable that holds all listings, an array of objects containing listings props
    const allListings = allListingsData?.allPost || [];
    // console.log(allListings);
    setListings(allListings);
  }, [allListingsData]);

  // The value prop expects an initial state object
  return (
    <ListingContext.Provider value={{ listings, loggedInUser }}>
      {children}
    </ListingContext.Provider>
  );
};
