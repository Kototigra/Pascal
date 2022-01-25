import { useState } from "react"
import RestsList from "../../components/common/RestsList/RestsList"
import Map from "../../components/Map/Map"
import MyModel from "../../components/MyModel/MyModel"
import Reg from "../../components/Reg/Reg"

const Main = () => {

  const [modal, setModal] = useState(true)




  return (
    <div className="main-page__container">
      <RestsList />
      <Map />
      {/* <MyModel visible={modal} setVisible={setModal} >
        <Reg/>
      </MyModel> */}
    </div>
  )
}

export default Main
