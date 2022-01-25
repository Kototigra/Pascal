import { useState } from "react";
import { useDispatch } from "react-redux";
import { THUNK_addRatingToDB } from "../../../redux/actions/restaurant.action";
import classes from './StarRating.module.css';
import { useParams } from 'react-router-dom';

export default function StarRating({ restaurantRating }) {
  const dispatch = useDispatch();
  const [hover, setHover] = useState();

  // Получаем ID ресторана из параметров URL
  const params = useParams();
  const restaurantId = params.id;

  const setRatingHandler = (settedRating) => {
    const settedRatingData = {
      rating: settedRating,
      restaurantId: restaurantId,
    }
    dispatch(THUNK_addRatingToDB(settedRatingData));
  }

  return (
    <div className={classes.stars}>
      

      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <button
            type="button"
            key={index}
            style={{ backgroundColor: 'transparent', border: 'none', outline: 'none', cursor: 'pointer' }}
            className={index <= (hover || restaurantRating) ? classes.on : classes.off }
            onClick={() => setRatingHandler(index)}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(restaurantRating)}
          >
            <span className={classes.star}>&#9733;</span>
          </button>
        );
      })}
    </div>
  );
}
