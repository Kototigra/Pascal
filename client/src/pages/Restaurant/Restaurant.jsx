import classes from './Restaurant.module.css';
import { ToastContainer, toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import BookingModal from '../../components/UI/BookingModal/BookingModal';
import RestaurantCard from '../../components/RestaurantCard/RestaurantCard';
import RestaurantForm from '../../components/RestaurantForm/RestaurantForm';
import ButtonCreate from '../../components/UI/ButtonCreate/ButtonCreate';
import { useDispatch, useSelector } from 'react-redux';
import { THUNK_getRestaurantFromDB } from '../../redux/actions/restaurant.action';
import PicturesGallery from '../../components/UI/PicturesGallery/PicturesGallery';
import { useParams } from 'react-router-dom';

export default function Restaurant() {
  const dispatch = useDispatch();

  const user = useSelector(state => state.userInfo)

  // Получаем ID ресторана из параметров URL
  const params = useParams();
  const restaurantId = params.id;

  // Получить данные одного ресторана с бэка при монтировании компонента
  useEffect(() => {
    dispatch(THUNK_getRestaurantFromDB(restaurantId));
  }, [])

  // Получить данные одного ресторана из стейта
  const restaurantDataFromState = useSelector(state => state.restaurant);

  // Стейт для отображения модалки
  const [modal, setModal] = useState(false);

  //Функция для вывода уведомления
  const notify = () => toast.success("Booking confirmed!");                                                                            

  const bookTableHandler = () => {
    const randomDelay = Math.ceil(Math.random() * 3) * 1000    
    setTimeout(() => notify(), randomDelay)
    setModal(false);
  };

  return (
    <div className={classes.restaurant__container}>
        <RestaurantCard restaurantDataFromState={restaurantDataFromState}/>





      {user && (
      <div className={classes.restaurant__button}>

          <ButtonCreate
            type="button"
            onClick={()=> setModal(true)}
            btnColor={'#b44511'}
          >
            Book a table
          </ButtonCreate>

      </div>
          )}

        <BookingModal visible={modal} setVisible={setModal}>
          <RestaurantForm bookTableHandler={bookTableHandler} restaurantId={restaurantId}/>
        </BookingModal>
        <ToastContainer position="top-right"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover/>

        {/* <hr style={{ margin: '15px 0' }} /> */}
        <h2 className={classes.gallery__title}>
          {restaurantDataFromState?.pictures?.length} Photos
        </h2>
      
        <PicturesGallery restaurantDataFromState={restaurantDataFromState} />

    </div>
  );
}
