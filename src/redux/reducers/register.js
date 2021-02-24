import { RECEIVE_REGISTER_USER, REQUEST_REGISTER_USER } from "../actions/action-types";

const initialState = {
   isFetching: false,
   success:false,
};

function register(state = initialState, action) {
   switch(action.type){
      case REQUEST_REGISTER_USER:
         return {
            isFetching: true,
            success:false,
         }
      case RECEIVE_REGISTER_USER:
         return {
            isFetching: false,
            success: action.payload,
         }
      default:
         return state;
   }
};

export default register;
