import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Admin from "../Admin/Admin";
import Inputuser from "../Inputuser/Inputuser"
import MyModel from "../MyModel/MyModel";
import PageAdmin from "../PageAdmin/PageAdmin";
import classes from './Reg.module.css'




function Reg() {
  const user = useSelector(state => state.userInfo)
  const [who, setWho] = useState(false)

  function clickChange() {

    setWho(!who)
  }
  const [modal, setModal] = useState(true)
  // useEffect(()=>{

  // }, [])

  return (

    <MyModel visible={modal} setVisible={setModal}>
      <div>
        <div className={classes.form__wrapper}>
          <input className={classes.form__check} type="checkbox" onClick={clickChange} />
          <label className={classes.form__subheader} >Как юр. лицо*</label>
        </div>
        <Inputuser who={who} />
        {who === true && (
          <Admin />
        )
        }
      </div >
    </MyModel>

  )
}

export default Reg
