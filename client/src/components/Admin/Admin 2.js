import { useState } from "react"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { signUpAdmin } from "../../redux/actions/userinfo.action";
import classes from './Admin.module.css'

function Admin() {

  const [userAdminSignUp, setUserAdminSignUp] = useState({
    name: '',
    email: '',
    password: '',
    title: '',
    categoryId: '',
    cuisineId: '',
    avarageCoast: '',
    capacity: '',
    city: '',
    street: '',
    building: '',
    image: '',
  })
// console.log(userAdminSignUp);
  const changeHandler = (e) => {
    setUserAdminSignUp(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const dispatch = useDispatch()
  let navigate = useNavigate()

  const submitHandler = (e) => {
    e.preventDefault()
    let payload = Object.entries(userAdminSignUp).filter((el) => el[1] ? el[1].trim() : el[1])
    if (payload.length) {
      payload = Object.fromEntries(payload)
      dispatch(signUpAdmin(payload, navigate))
    }
  }

  return (
    <div className={classes.form}>
      <h1 className={classes.form__title}>Данные пользователя</h1>
      <div className={classes.form__box}>
        <input onChange={changeHandler} name="name" value={userAdminSignUp.name} placeholder='name' type="text" />
        <input onChange={changeHandler} name="email" value={userAdminSignUp.email} placeholder='email' type="email" />
        <input onChange={changeHandler} name="password" value={userAdminSignUp.password} placeholder='password' type='password' />
      </div>
      <h1 className={classes.form__title}>Информация о вашем ресторане</h1>
      <div className={classes.form__row}>
        <div className={classes.form__col}>
          <input onChange={changeHandler} placeholder='title' name="title" value={userAdminSignUp.title} type="text" />
          <input onChange={changeHandler} placeholder='categoryId' name="categoryId" value={userAdminSignUp.categoryId} type='number' />

          <input onChange={changeHandler} placeholder='cuisineId' name="cuisineId" value={userAdminSignUp.cuisineId} type='number' />
          <input onChange={changeHandler} placeholder='avarageCoast' name="avarageCoast" value={userAdminSignUp.avarageCoast} type='number' />
        </div>
        <div className={classes.form__col}>
          <input onChange={changeHandler} placeholder='capacity' name="capacity" value={userAdminSignUp.capaciti} type='text' />
          <input onChange={changeHandler} placeholder='city' name="city" value={userAdminSignUp.city} type='text' />
          <input onChange={changeHandler} placeholder='street' name="street" value={userAdminSignUp.street} type='text' />
          <input onChange={changeHandler} placeholder='building' name="building" value={userAdminSignUp.building} type='text' />
        </div>
        <div className={classes.form__col}>
          <form>
            <div className={classes.form__group}>
              <label htmlFor="uploadInput">Загрузка файлов</label>
              <input type="file" onChange={changeHandler} className="form-control-file" name="image" value={userAdminSignUp.image} id="uploadInput" />
            </div>
          </form>
        </div>
      </div>

      <div className={classes.form__btn_wrapper}>
        <button onClick={submitHandler} >Зарегистрироваться</button>
      </div>
    </div>
  )
}

export default Admin
