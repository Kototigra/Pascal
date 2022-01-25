import CapacityProgressBar from '../../UI/CapacityProgressBar/CapacityProgressBar';
import StarRating from '../../UI/StarRating/StarRating';

const getProgressBarColor = (percantage) => {
  let bgcolor = '';

  if (percantage <= 30) bgcolor = "green";
  else if (percantage <= 70) bgcolor = "orange";
  else bgcolor = "red";

  return bgcolor;
}


const OneRest = ({ rest}) => {
  const capactityPercantage = Math.round((rest?.bookedTables / rest?.capacity * 100));

  const ratingArr = rest?.rating;
  let restaurantRating = 0;

  // Если в массиве ratingArr есть элемент, то вычисляем среднее значение
  if (ratingArr.length > 0) {
    restaurantRating = (ratingArr?.reduce((sum, current) => sum + current, 0) / ratingArr?.length).toFixed(1);
  }

  return (
    <div>
      <h2>
        {rest?.title}
      </h2>

      <ul>
        <li>
          Booked tables:
          <CapacityProgressBar bgcolor={getProgressBarColor(capactityPercantage)} completed={capactityPercantage} />
        </li>
        <li><StarRating restaurantRating={Math.round(restaurantRating)} /></li>
        <li>Rating: {restaurantRating}</li>
        <li>Category: {rest?.category}</li>
        <li>Address: {rest?.address}</li>
        <li>Cuisine: {rest?.cuisine}</li>
        <li>Average price: {rest?.avarageCoast}&nbsp;$$</li>
        {/* TODO: исправить инлайновый стиль на className */}
        <img src={rest?.picture} style={{width: 200}} alt="rest" /> 
      </ul>
    </div>
  );
};

export default OneRest;
