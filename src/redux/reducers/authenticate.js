import { SIGN_IN, SIGN_IN_ERROR } from "../actions/action-types";

const initialState = {
   isFetching: false,
   authenticated: false,
   error:false,
   userEmail:false,
   userID:false,
};

function authenticateReducer(state = initialState, action) {
   if (action.type === SIGN_IN) {
      return action.payload
   }
   if(action.type === SIGN_IN_ERROR) {
      return {
         ...state,
         error: action.payload.error,
         isFetching: action.payload.isFetching,
      }
   }
   return state;
};

export default authenticateReducer;
