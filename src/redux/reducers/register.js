import { RECEIVE_REGISTER_USER, REQUEST_REGISTER_USER } from "../actions/action-types";

const initialState = {
   isFetching: false,
};

function register(state = initialState, action) {
   switch(action.type){
      case REQUEST_REGISTER_USER:
         return {
            isFetching: true,
         }
      case RECEIVE_REGISTER_USER:
         return {
            isFetching: false,
            success: true,
         }
      default:
         return state;
   }
};

export default register;
