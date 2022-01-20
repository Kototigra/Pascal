import { ADD_INCIDENT, SET_INCIDENTS } from "../types/admin.types"


export const incidentsReducer = (state = [], action) => {

  const { type, payload } = action
  switch (type) {

    case SET_INCIDENTS: {
      return payload
    }
    case ADD_INCIDENT: {
      const { newIncServer } = payload
      return [...state, newIncServer]
    }

    default: {
      return state
    }
  }

}
