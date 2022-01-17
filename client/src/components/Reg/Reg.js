import { useState } from "react";
import Admin from "../Admin/Admin";
import Inputuser from "../Inputuser/Inputuser"
import PageAdmin from "../PageAdmin/PageAdmin";





function Reg() {

  const [who, setWho] = useState(false)

  function clickChange() {

    setWho(!who)
  }

  return (
    <div>
      <input type="checkbox" onClick={clickChange} />
      <label >Check me out</label>
      <br />
      <Inputuser who={who} />
      {who === true && (
        <Admin />
      )
      }
      <PageAdmin />
    </div >

  )
}

export default Reg
