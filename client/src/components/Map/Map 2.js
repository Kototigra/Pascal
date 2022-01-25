import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { allRestaurants } from "../../redux/actions/restaurant.action";
import { allRestByCoord } from "../../redux/actions/rests.action";
import 'react-toastify/dist/ReactToastify.css';

const Map = () => {
  let ymaps = window.ymaps;
  const dispatch = useDispatch()

  const coordinates = useSelector(state => state.restaurant)

  const [myLocation, setmyLocation] = useState(getMyAdress())


  async function getMyAdress() {
    navigator.geolocation.getCurrentPosition(async (geoData) => {
      const { longitude, latitude } = geoData.coords;
      setmyLocation([latitude, longitude])
    });
  };

  useEffect(() => {
    dispatch(allRestaurants())
    if (coordinates.length)
      ymaps.ready(init);
  }, [coordinates.length])

  //подключаем карты
  function init() {
    let myMap = new ymaps.Map("map", {
      center: [55.7066426, 37.5973765],
      zoom: 10,
      controls: ['zoomControl'],
      behaviors: ['drag', 'scrollZoom']
    })
    // Создадим объекты на основе JSON-описания геометрий.
    let objects = ymaps?.geoQuery(coordinates).addToMap(myMap)

    objects.searchInside(myMap)
      // И затем добавим найденные объекты на карту.
      .addToMap(myMap);

      objects._objects.forEach(el => el.events.add('click', (e) => {
        dispatch(allRestByCoord([el.geometry._coordinates])) // показывает ресторан по клику
      }))
    myMap.events.add('boundschange', function () {
      // После каждого сдвига карты будем смотреть, какие объекты попадают в видимую область.
      let visibleObjects = objects.searchInside(myMap).addToMap(myMap);
      const coord = visibleObjects._objects.map(el => el.geometry._coordinates)
      // Оставшиеся объекты будем удалять с карты.
      objects.remove(visibleObjects).removeFromMap(myMap);
      dispatch(allRestByCoord(coord))
    });
  }

  return (
    <div>
      <div style={{ width: '500px', height: '500px' }} id="map" />
    </div>
  )
}

export default Map
