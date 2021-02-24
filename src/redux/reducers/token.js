import { RECEIVE_VERIFY_TOKEN, REQUEST_VERIFY_TOKEN } from "../actions/action-types";

const initialState = {
   isFetching: false,
   success: false,
};

function register(state = initialState, action) {
   switch(action.type){
      case REQUEST_VERIFY_TOKEN:
         return {
            isFetching: true,
            success:false,
         }
      case RECEIVE_VERIFY_TOKEN:
         return {
            isFetching: false,
            success: action.payload,
         }
      default:
         return state;
   }
};

export default register;
