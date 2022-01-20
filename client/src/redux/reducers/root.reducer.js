import { combineReducers } from 'redux';
import { restaurantReducer } from './restaurant.reducer';
import restReducer from './rests.reducer';
import userinfoReducer from './userInfoReducer';
import adminReducer from "./admin.reducer";
import reservationReducer from "./reservation.reducer";
import {searchReducer} from "./search.reducer";
import { incidentsReducer } from './upload.reducer';

export const rootReducer = combineReducers({
    restaurant: restaurantReducer,
    rests: restReducer,
    userInfo: userinfoReducer,
    admin: adminReducer,
    reservation: reservationReducer,
    searchInput: searchReducer,
    incident: incidentsReducer
});
