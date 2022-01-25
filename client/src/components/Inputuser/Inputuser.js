import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { signUp } from "../../redux/actions/userinfo.action";
import classes from './Inputuser.module.css'

function Inputuser({ who }) {

  const all = useSelector(state => state)
  let navigate = useNavigate()

  const [userSignUp, setUserSignUp] = useState({
    name: '',
    email: '',
    password: '',
  })

  const changeHandler = (e) => {
    setUserSignUp(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }
  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    let payload = Object.entries(userSignUp).filter((el) => el[1] ? el[1].trim() : el[1])
    if (payload.length) {
      payload = Object.fromEntries(payload)
      dispatch(signUp(payload, navigate))

    }
  }

  return (

    <div className={classes.form}>
      {who === false && (
        <>

          <h1 className={classes.form__title}>Registration</h1>
          <div className={classes.form__box}> 
            <input onChange={changeHandler} name="name" value={userSignUp.name} placeholder='name' type="text" />
            <input onChange={changeHandler} name="email" value={userSignUp.email} placeholder='email' type="email" />
            <input onChange={changeHandler} name="password" value={userSignUp.password} placeholder='password' type='password' />
          </div>

          <div className={classes.form__btnWrapper}>
            <button className={classes.form__btn} onClick={submitHandler}>Sign up</button>
          </div>
        </>
      )}
    </div>
  )
}

export default Inputuser
