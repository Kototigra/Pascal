import './App.css';
import Map from './components/Map/Map';
import Restaurant from './pages/Restaurant/Restaurant';
import NavBar from "./components/UI/NavBar/NavBar";
import RestsList from "./components/common/RestsList/RestsList";

import Reg from './components/Reg/Reg';
import SingIn from './components/SingIn/SingIn';
import SignOut from './components/SignOut/SingOut';
import { checkAuth, THUNK_getUserInfoFromDB } from './redux/actions/userinfo.action';

import { Route, Routes, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkAuthUser } from "./redux/actions/userinfo.action";
import { checkAuthAdmin } from "./redux/actions/admin.action";
import UserProfile from "./pages/UserProfile/UserProfile";
import Main from './pages/Main/Main';
import PageAdmin from './components/PageAdmin/PageAdmin';
import { THUNK_getAllRestaurantsFromDB } from './redux/actions/rests.action';
import MyModel from './components/MyModel/MyModel';


function App() {

  function RequireAuthUser({ children, redirectTo }) {
    return user ? children : <Navigate to={redirectTo} />;
  }

  const user = useSelector(state => state.userInfo)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(checkAuth())
  }, [])

  useEffect(() => {
    // ****** Получение всех ресторанов ******
    dispatch(THUNK_getAllRestaurantsFromDB())
  }, [])



  return (



    
    <div>
      <NavBar />

      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/restaurants/:id' element={<Restaurant />} />
        <Route path='/users/:id' element={<UserProfile />} />
        <Route path='/signin' element={<SingIn />} />
        <Route path='/signup' element={<Reg />} />
        <Route path='/signout' element={<SignOut />} />
        <Route path='/admin/:id' element={<PageAdmin/>} />
        
      </Routes>
    </div>
  );
}

export default App;
