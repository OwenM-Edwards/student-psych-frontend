import { SIGN_IN } from "../actions/action-types";

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
   return state;
};

export default authenticateReducer;
