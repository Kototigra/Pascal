import axios from "axios";
import {GET_ALL_RESTAURANTS_APP, GET_RESTAURANTS_BY_COORD, GET_RESTS, SEARCH_OPTION, SELECT_OPTION, SET_RESTS} from "../types/rests.types";
import {CHANGE} from "../types/search.types";


export const getRests = (value) => {
    return {
        type: GET_RESTS,
        payload: value
    }
}


export const setRests = (value) => {
    return {
        type: SET_RESTS,
        payload: value
    }
}

export const optionAction = (city) => {
    return {
        type: SELECT_OPTION,
        payload: city
    }
}

export const searchAction = (input) => {
    return {
        type: SEARCH_OPTION,
        payload: input
    }
}

// ****** Получение всех ресторанов в области видимости ******
export const allRestByCoord = (coord) => async (dispatch) => {
  const response = await axios.post(`${process.env.REACT_APP_API_URL}/restaurants/all`, {
    coord
  })

  dispatch({
    type: GET_RESTAURANTS_BY_COORD,
    payload: response.data
  })
}


export const THUNK_getAllRestaurantsFromDB = () => async (dispatch) => {
  const response = await axios.get(`${process.env.REACT_APP_API_URL}/restaurants/allrests`);

  dispatch({
    type: GET_ALL_RESTAURANTS_APP,
    payload: response.data
  })
}
