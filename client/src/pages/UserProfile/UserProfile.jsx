import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import RestaurantCard from "../../components/RestaurantCard/RestaurantCard";
import UserCard from "../../components/UserCard/UserCard";
import classes from './UserProfile.module.css'
import ButtonCreate from "../../components/UI/ButtonCreate/ButtonCreate";
import {
    deleteReservation,
    editReservation,
    THUNK_getReservationInfoFromDB
} from "../../redux/actions/reservation.action";


const UserProfile = ({id}) => {

    const userDataFromState = useSelector(state => state.userInfo);
    const dispatch = useDispatch()

    // Получить данные одного юзера с бэка при монтировании компонента
    useEffect(() => {
        // dispatch(THUNK_getUserInfoFromDB());
        dispatch(THUNK_getReservationInfoFromDB(userDataFromState?.id));

    }, [])

    return (
        <div className={classes["container"]}>
          <UserCard userDataFromState={userDataFromState}/>
        </div>
    );
};

export default UserProfile;
