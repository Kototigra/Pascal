import React, {useState} from 'react';
import CapacityProgressBar from "../UI/CapacityProgressBar/CapacityProgressBar";
import StarRating from "../UI/StarRating/StarRating";
import {useDispatch, useSelector} from "react-redux";
import ButtonCreate from "../UI/ButtonCreate/ButtonCreate";
import {
    deleteReservation,
    editReservation,
    THUNK_deleteReservationInfoFromDB
} from "../../redux/actions/reservation.action";
import {v4 as uuidv4} from "uuid";
import classes from "../../pages/UserProfile/UserProfile.module.css";
import { ToastContainer, toast } from 'react-toastify';

const UserCard = ({userDataFromState}) => {
    const reservation = useSelector(state => state.reservation)

    const dispatch = useDispatch()

    const notify = () => toast.info("Reservation canceled!");  

    const deleteReservationHandler = (e ,id) => {
        e.preventDefault()
        dispatch(THUNK_deleteReservationInfoFromDB(id))
        setTimeout(() => notify(), 1500)
    }

    return (
      <div className={classes['user-card']}>
            <h1>
                We are happy to welcome you here, {userDataFromState?.name}!
            </h1>

            <h2>
                Your bookings:
            </h2>
            <ul className={classes["text"]}>
                {reservation?.reserv?.map(el =>
                  <li className={classes.info__item} key={uuidv4()}>
                      <div className={classes.info__wrapper}>
                        <ul>
                          <li>Restaurant name: {el.title}</li>
                          <li>Date of your booking: {el?.createdAt?.slice(0, 10)}</li>
                          <li>Time of your booking: {el?.createdAt?.slice(11, 16)}</li>
                        </ul>
                      </div>
                        <button className={classes.btnCancelReserv} type="button" onClick={ (e) => deleteReservationHandler(e, el.id)}>Cancel reservation</button>
                    </li> )}
            </ul>
            <ToastContainer position="top-right"
              theme="dark"
              autoClose={5000}
              hideProgressBar={true}
              newestOnTop={false}
              closeOnClick
              pauseOnFocusLoss
              draggable
              pauseOnHover/>
        </div>
    );
};

export default UserCard;
