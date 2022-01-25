import axios from 'axios';
import { EDIT_RESTAURANT, GET_RESTAURANT, SET_RATING, SET_RESERVATION, GET_ALL_RESTAURANTS } from "../types/restaurant.types"

export const getRestaurantFromDB = (restaurantData) => {
  return {
    type: GET_RESTAURANT,
    payload: restaurantData,
  }
}

export const THUNK_getRestaurantFromDB = (restaurantId) => async (dispatch) => {
  const response = await axios.get(`${process.env.REACT_APP_API_URL}/restaurants/${restaurantId}`);
  const restaurantData = response.data;
  dispatch(getRestaurantFromDB(restaurantData));
}

export const addRating = (rating) => {
  return {
    type: SET_RATING,
    payload: rating,
  }
}

export const THUNK_addRatingToDB = (payload) => async (dispatch) => {
  const { restaurantId, rating } = payload;
  const response = await axios.post(`${process.env.REACT_APP_API_URL}/restaurants/${Number(restaurantId)}/rating`,
    {
      score: rating,
    },
    {
      withCredentials: true
    }
  )

  const updatedRatingFromDB = response.data;
  dispatch(addRating(updatedRatingFromDB));
}

export const addReservation = (updatedBookedTables) => {
  return {
    type: SET_RESERVATION,
    payload: updatedBookedTables,
  }
}

export const THUNK_minusReservationToDB = (payload) => async (dispatch) => {
  const { restaurantId } = payload;
  console.log(payload);
  console.log(restaurantId);
  const response = await axios.put(`${process.env.REACT_APP_API_URL}/restaurants/${Number(restaurantId)}/minus`)
  const updatedBookedTablesFromDB = response.data;
  dispatch(addReservation(updatedBookedTablesFromDB));
}



export const THUNK_addReservationToDBAdmin = (payload) => async (dispatch) => {
  const { restaurantId } = payload;
  console.log('PPPPP',payload);
  console.log('PPPPP2',restaurantId);
  const response = await axios.put(`${process.env.REACT_APP_API_URL}/restaurants/${Number(restaurantId)}/reservation`)
  // const response = await axios.put(`${process.env.REACT_APP_API_URL}/restaurants/${Number(restaurantId)}/newReservation`,
  //     {},
  //     {
  //       withCredentials: true
  //     })
  const updatedBookedTablesFromDB = response.data;
  dispatch(addReservation(updatedBookedTablesFromDB));
}

export const THUNK_addReservationToDB = (payload) => async (dispatch) => {
  const { restaurantId } = payload;
  console.log('PPPPP',payload);
  console.log('PPPPP2',restaurantId);
  // const response = await axios.put(`${process.env.REACT_APP_API_URL}/restaurants/${Number(restaurantId)}/reservation`)
  const response = await axios.put(`${process.env.REACT_APP_API_URL}/restaurants/${Number(restaurantId)}/newReservation`,
      {},
      {
        withCredentials: true
      })
  const updatedBookedTablesFromDB = response.data;
  dispatch(addReservation(updatedBookedTablesFromDB));
}



export const editRestaurant = (restaurantData) => {
  return {
    type: EDIT_RESTAURANT,
    payload: restaurantData,
  }
}

export const THUNK_editRestaurant = (payload, restId) => async (dispatch) => {
  const response = await fetch('http://localhost:3001/api/', {
    method: "PUT",
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify(payload)
  })
  const restaurant = await response.json()
  dispatch(editRestaurant(restaurant))
}

// ****** Получение адресов всех ресторанов ******
//добавила Катя
export const allRestaurants = () => async (dispatch) => {
  // console.log('***')
  const response = await axios.get(`${process.env.REACT_APP_API_URL}/restaurants/map`)
  const allRest = await response.data
  // console.log('allRest', allRest.aresses.map(el => ({type:'Point', coordinates: [el.latitude, el.longitude]})))
  dispatch({
    type: GET_ALL_RESTAURANTS,
    payload: allRest.aresses.map(el => ({ type: 'Point', coordinates: [el.latitude, el.longitude] }))
  })
}
