import {GET_ADMIN_INFO} from "../types/admin.types";


const adminReducer = (state = null, action) => {

    switch (action.type) {


        case GET_ADMIN_INFO: {
            return action.payload
        }

        default: {
            return state
        }
    }


}

export default adminReducer