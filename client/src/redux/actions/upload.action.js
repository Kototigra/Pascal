import { ADD_INCIDENT, GET_INCIDENTS, SET_INCIDENTS } from "../types/admin.types";

export const addNewIncident = (newIncident, file) => async (dispatch) => {
  try {
    console.log(newIncident);
    const formData = new FormData();
    for (let key in newIncident) {
      formData.append(key, newIncident[key]);
    }
    console.log(file);
    formData.append("file", file);
    console.log(formData);
    const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/upload`, {
      method: "POST",
      body: formData,
    });
    const newIncServer = await response.json();
    dispatch({
      type: ADD_INCIDENT,
      payload: {
        newIncServer,
      },
    });
  } catch (error) {
    console.log(error);
  }
};


export const getIncidents = (value) => {
  return {
    type: GET_INCIDENTS,
    payload: value,
  };
};
export const setIncidents = (value) => {
  return {
    type: SET_INCIDENTS,
    payload: value,
  };
};
