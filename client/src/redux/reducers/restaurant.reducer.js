import initialState from "../initState";

import { EDIT_RESTAURANT, GET_RESTAURANT, SET_RATING, SET_RESERVATION, GET_ALL_RESTAURANTS } from "../types/restaurant.types";
export const restaurantReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_RESTAURANT:
      return action.payload;

    case SET_RATING:
      return { ...state, rating: action.payload };

    case SET_RESERVATION:
      return { ...state, bookedTables: action.payload };

    case EDIT_RESTAURANT:
      return { ...state, title: action.payload.title, categoryId: action.payload.categoryId, cuisineId: action.payload.cuisineId, avarageCoast: action.payload.avarageCoast, capacity: action.payload.capacity };

    // katya was here
    case GET_ALL_RESTAURANTS:
      return action.payload

    default:
      return state;
  }
}
