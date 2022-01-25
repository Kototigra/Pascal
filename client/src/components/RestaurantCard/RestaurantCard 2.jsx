import CapacityProgressBar from "../UI/CapacityProgressBar/CapacityProgressBar";
import StarRating from "../UI/StarRating/StarRating";
// import classes from "./RestaurantCard.module.css";

const getProgressBarColor = (percantage) => {
  let bgcolor = '';
  
  if (percantage <= 30) bgcolor = "green";
  else if (percantage <= 70) bgcolor = "orange";
  else bgcolor = "red" ;

  return bgcolor;
}

export default function RestaurantCard({ restaurantDataFromState }) {

  let capactityPercantage = 0;
  if (restaurantDataFromState?.bookedTables > 0) {
    capactityPercantage = Math.round((restaurantDataFromState?.bookedTables / restaurantDataFromState?.capacity * 100));
  }

  const ratingArr = restaurantDataFromState?.rating;
  let restaurantRating = 0;

  // Если в массиве ratingArr есть элемент, то вычисляем среднее значение
  if (ratingArr?.length > 0) {
    restaurantRating = (ratingArr?.reduce((sum, current) => sum + current, 0) / ratingArr?.length).toFixed(1)
  }

  return (
    <div>
      <h1>
        {restaurantDataFromState?.title}
      </h1>
      
      <ul>
        <li>
         Booked tables:
          <CapacityProgressBar bgcolor={getProgressBarColor(capactityPercantage)} completed={capactityPercantage} />
        </li>
        <li><StarRating restaurantRating={Math.round(restaurantRating)} /></li> 
        <li>Rating: {restaurantRating}</li> 
        <li>Category: {restaurantDataFromState?.category}</li>
        <li>Address: {restaurantDataFromState?.address}</li>
        <li>Cuisine: {restaurantDataFromState?.cuisine}</li>
      </ul>
    </div>
  );
}
