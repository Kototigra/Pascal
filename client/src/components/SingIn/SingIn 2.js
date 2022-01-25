import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router"
import { signIn } from "../../redux/actions/userinfo.action"
import MyModel from "../MyModel/MyModel"
import classes from './Singin.module.css'

function SingIn() {
const allState = useSelector(state => state)
// console.log(allState);
  const [inputValue, setInputValue] = useState({
    email: '',
    password: '',
  }
  )

  const changeHandler = (e) => {
    setInputValue(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }
  const dispatch = useDispatch()
  let navigate = useNavigate()

  const submitHandler = (e) => {
    e.preventDefault()
    let payload = Object.entries(inputValue).filter((el) => el[1] ? el[1].trim() : el[1])
    if (payload.length) {
      payload = Object.fromEntries(payload)
      dispatch(signIn(payload, navigate))
    }
  }
  const [modal, setModal] = useState(true)
  return (

   <div>
   <MyModel visible={modal} setVisible={setModal}>
      <div className={classes.form}>
        <h1 className={classes.form__title}>Регистрация</h1>
        <div className={classes.form__box}>
          <input onChange={changeHandler} name="email" value={inputValue.email} placeholder='email' type="email" />
          <input onChange={changeHandler} name="password" value={inputValue.password} placeholder='password' type='password' />
        </div>
        <button className={classes.form__btn} onClick={submitHandler}>войти</button>
      </div>

    </MyModel>


   </div>
  )
}

export default SingIn
