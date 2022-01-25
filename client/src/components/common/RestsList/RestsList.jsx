import {useDispatch, useSelector} from "react-redux";
import OneRest from "../OneRest/OneRest";
import { v4 as uuidv4 } from 'uuid';
import {useEffect} from "react";
import {getAllRests, getRests, THUNK_getAllRestaurantsFromDB} from "../../../redux/actions/rests.action";
import { Link } from "react-router-dom";
import classes from './RestsList.module.css'

const RestsList = () => {

    const rests = useSelector(state => state.rests);

    const search = useSelector(state => state.searchInput)

    const dispatch = useDispatch()

    useEffect(()=> {
        if (search.length === 0)
        dispatch(THUNK_getAllRestaurantsFromDB())
    }, [search])

    return (
        <div className={classes.box}>
          {rests &&
            rests.map(rest => (
              <Link
                to={`/restaurants/${rest.id}`}
                key={uuidv4()}
              >
                <OneRest rest={rest} />
              </Link>
            ))
          }
        </div>
    );
};

export default RestsList;
