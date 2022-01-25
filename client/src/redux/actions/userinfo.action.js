import { DELETE_USER, GET_ADMIN, GET_RESERVATION, GET_USERINFO } from "../types/users.types"
import { GET_RESTAURANT } from "../types/restaurant.types";
import axios from "axios";
import { getRestaurantFromDB } from "./restaurant.action";

export const getUserInfo = (user) => ({
  type: GET_USERINFO,
  payload: user

})


export const getAdmin = (user) => ({
  type: GET_ADMIN,
  payload: user
})

export const deleteUser = () => ({
  type: DELETE_USER
})

export const signUp = (payload, navigate) => async (dispatch) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/signup`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify(payload)
  })
  if (response.status === 200) {
    const user = await response.json()
    dispatch(getUserInfo(user))
    navigate(`/users/${user.id}`)
  } else {
    // navigate('/auth/signup')
  }
}


export const signIn = (payload, navigate, from) => async (dispatch) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/signin`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify(payload)
  })
  if (response.status === 200) {
    const user = await response.json()
    if (user.isAdmin) {
      dispatch(getUserInfo(user))
      navigate(`/admin/${user.id}`)
    } else {

      dispatch(getUserInfo(user))
      navigate(`/users/${user.id}`)
    }
  } else {
    navigate('/signup')
  }
}

export const signUpAdmin = (payload, navigate) => async (dispatch) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/admin`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify(payload)

  })
  if (response.status === 200) {
    const user = await response.json()
    dispatch(getUserInfo(user))
    navigate(`/admin/${user.id}`)
  } else {
  }
}

export const signOut = () => async (dispatch) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/signout`, {
    credentials: 'include'
  })
  if (response.status === 200) {
    dispatch(deleteUser())
  }
}

export const checkAuth = () => async (dispatch) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/check`, {
    credentials: 'include'
  })
  if (response.status === 200) {
    const user = await response.json()
    dispatch(getUserInfo(user))
  }
}
