import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router"
import { signOut } from "../../redux/actions/userinfo.action"

function SignOut() {

  const dispatch = useDispatch()
  const navigate = useNavigate()
const all = useSelector(state => state)
  function deleteUser() {
    dispatch(signOut())
console.log(all);
  }

  return (

    <button onClick={deleteUser}>удалить</button>
  )
}


export default SignOut
