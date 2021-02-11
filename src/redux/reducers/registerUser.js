import { REGISTER_USER_ERROR, REGISTER_USER } from "../actions/action-types";

const initialState = {
   isFetching: false,
   error:false,
};

function registerReducer(state = initialState, action) {
   if (action.type === REGISTER_USER) {
      return action.payload
   }
   if (action.type === REGISTER_USER_ERROR) {
      return {
         error: action.payload.error,
         isFetching: action.payload.isFetching,
      }
   }
   return state;
};

export default registerReducer;
