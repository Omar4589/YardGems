//--------------------------------IMPORTS----------------------------------//
import React, { useEffect, useState, useContext, createContext } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_LISTINGS, ME_QUERY } from "./queries";
import {
  ADD_LISTING,
  REMOVE_LISTING,
  ADD_FAVORITES,
  REMOVE_FAVORITES,
  EDIT_LISTING,
} from "./mutations";

//-------------------CONTEXT CREATION AND EXPORTATION--------------//
//Here we create the context
const ListingContext = createContext();
// Here we create a hook to provide usage of the listing context, we use 'export' to make it exportable
export const useListingContext = () => useContext(ListingContext);

//----------------------------START OF CONTEXT PROVIDER--------------------//
export const ListingProvider = ({ children }) => {
  //-----------------MUTATIONS-------------------//
  const [addListing] = useMutation(ADD_LISTING);
  const [removeListing] = useMutation(REMOVE_LISTING);
  const [editListing] = useMutation(EDIT_LISTING);
  const [addFavorites] = useMutation(ADD_FAVORITES);
  const [removeFavorites] = useMutation(REMOVE_FAVORITES);

  //-----------------STATE-------------------//
  //Here we create a state called 'listings' that we will use to keep track of ALL LISTINGS in database
  //We first set it to an empty array because we havent fetched the data yet
  const [listings, setListings] = useState([]);
  const [userListings, setUserListings] = useState([]);
  const [savedFavorites, setSavedFavorites] = useState([]);
  const [favoritedListingIds, setFavoritedListingIds] = useState(new Set());


  //-----------------QUERIES-----------------//
  const { data: allListingsData } = useQuery(QUERY_LISTINGS);

  const { data: loggedInUserData } = useQuery(ME_QUERY);

  //-----------------HOOKS-------------------//
  //The useEffect hook below runs when component mounts and sets the listings state to
  //an updated listings array we name 'updatedListings which will include a 'isFavorited' property
  useEffect(() => {
    if (allListingsData) {
      const allListings = allListingsData?.allListings || [];

      // If loggedInUserData is available, update isFavorited based on userFavorites
      if (loggedInUserData) {
        const userListings = loggedInUserData?.me?.userPosts || [];
        const userFavorites = loggedInUserData?.me?.savedFavorites || [];

        const listingsWithFavorites = allListings.map((listing) => ({
          ...listing,
          isFavorited: userFavorites.includes(listing._id),
        }));

        setListings(listingsWithFavorites);
        setUserListings(userListings);
        setSavedFavorites(userFavorites); // Set the initial state of savedFavorites
      } else {
        // If not logged in, set isFavorited to false for all listings
        const updatedListings = allListings.map((listing) => ({
          ...listing,
          isFavorited: false,
        }));

        setListings(updatedListings);
      }
    }
  }, [allListingsData, loggedInUserData]);

  useEffect(() => {
    // Load favorited listing IDs from the user's savedFavorites array
    // Make sure you're adding only the IDs to the Set
    setFavoritedListingIds(new Set(savedFavorites.map((listing) => listing._id)));
  }, [savedFavorites]);
  
console.log(favoritedListingIds);
  //-----------------HANDLERS-------------------//
  const addAListing = async (newListingData) => {
    try {
      // Perform the GraphQL mutation
      const { data } = await addListing({
        variables: {
          description: newListingData.description,
          address: newListingData.address,
          dateOfSale: newListingData.dateOfSale,
          image: newListingData.image,
          title: newListingData.title,
          lat: newListingData.lat,
          lng: newListingData.lng,
        },
      });

      // Update the savedListings state with the returned data
      setListings((prevListings) => [...prevListings, data.addListing]);
      setUserListings((prevUserListings) => [
        ...prevUserListings,
        data.addListing,
      ]);
    } catch (error) {
      // Handle any errors
      console.error("Error saving listing:", error);
    }
  };

  const removeAListing = async (listingId) => {
    try {
      // Perform the GraphQL mutation
      const { data } = await removeListing({
        variables: { listingId: listingId },
      });

      // Update the listings state by filtering out the removed listing
      setListings((prevListings) =>
        prevListings.filter((listing) => listing._id !== listingId)
      );
      setUserListings((prevUserListings) => [
        ...prevUserListings,
        data.removeListing,
      ]);
    } catch (error) {
      // Handle any errors
      console.error("Error removing listing:", error);
    }
  };

  const editAListing = async (editedListingData) => {
    try {
      // Perform the GraphQL mutation
      const { data } = await editListing({
        variables: {
          id: editedListingData.id,
          description: editedListingData.description,
          address: editedListingData.address,
          dateOfSale: editedListingData.dateOfSale,
          image: editedListingData.image,
          title: editedListingData.title,
          lat: editedListingData.lat,
          lng: editedListingData.lng,
        },
      });

      // Update the savedListings state with the returned data
      setListings((prevListings) => {
        // Replace the edited listing in the state
        const updatedListings = prevListings.map((listing) =>
          listing._id === editedListingData.id ? data.editListing : listing
        );
        return updatedListings;
      });
      // Update the userListings state with the returned data
      setUserListings((prevUserListings) => {
        // Replace the edited listing in the state
        const updatedUserListings = prevUserListings.map((listing) =>
          listing._id === editedListingData.id ? data.editListing : listing
        );
        return updatedUserListings;
      });
    } catch (error) {
      // Handle any errors
      console.error("Error editing listing:", error);
    }
  };

  const favoriteAListing = async (listingId) => {
    try {
      // Perform the GraphQL mutation
      const { data } = await addFavorites({
        variables: { listingId: listingId },
      });

      // Update the isFavorited property for the targeted listing
      setListings((prevListings) =>
        prevListings.map((listing) =>
          listing._id === listingId
            ? { ...listing, isFavorited: true }
            : listing
        )
      );
    } catch (error) {
      // Handle any errors
      console.error("Error favoriting listing:", error);
    }
  };

  const unfavoriteAListing = async (listingId) => {
    try {
      // Perform the GraphQL mutation
      const { data } = await removeFavorites({
        variables: { listingId: listingId },
      });

      // Update the isFavorited property for the targeted listing
      setListings((prevListings) =>
        prevListings.map((listing) =>
          listing._id === listingId
            ? { ...listing, isFavorited: false }
            : listing
        )
      );
    } catch (error) {
      // Handle any errors
      console.error("Error unfavoriting listing:", error);
    }
  };

  //---------------RETURN STATEMENT-------------------//
  // The value prop expects an initial state object, in this case
  //the initial state is the listings state, we also pass in the state setter and loggedInUser's info in case we need it
  return (
    <ListingContext.Provider
      value={{
        listings,
        setListings,
        userListings,
        setUserListings,
        savedFavorites,
        setSavedFavorites,
        addAListing,
        removeAListing,
        editAListing,
        favoriteAListing,
        unfavoriteAListing,
        favoritedListingIds
      }}
    >
      {children}
    </ListingContext.Provider>
  );
};
