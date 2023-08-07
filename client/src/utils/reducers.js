// Import our actions from our actions file
import { ADD_LISTING, REMOVE_LISTING } from "./actions";

// Create a function that will handle combining two objects. Accepts state and an action as an argument.
export default function reducer(state, action) {
  // Depending on the action we create a new version of state after the desired action is preformed
  switch (action.type) {
    case ADD_LISTING: {
    
      // Take a copy of the new student's data and add an id to it
      const newListing = { ...action.payload };

      // Take a copy of state and assign the students array to our updated array with the new student
      return {
        ...state,
        listings: [...state.listings, newListing],
      };
    }
    // Take a copy of state and return it with a modified version of the students array excluding the `student.id` in `action.payload`
    case REMOVE_LISTING: {
      return {
        ...state,
        listings: [...state.listings].filter(
          (listing) => listing._id !== action.payload
        ),
      };
    }

    // Default to returning the state as is in our switch statement
    default:
      return state;
  }
}
