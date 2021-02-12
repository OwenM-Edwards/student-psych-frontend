import { SIGN_OUT, SIGN_IN, SIGN_IN_ERROR } from "../actions/action-types";

const localSt = JSON.parse(localStorage.getItem("user"));
const initialState = localSt ? localSt : {
   email:false,
   id:false,
};

function authenticateReducer(state = initialState, action) {
   if (action.type === SIGN_IN) {
      return {
         email:action.payload.email,
         id:action.payload.id,
      }
   }
   else if (action.type === SIGN_OUT) {
      return {}
   }
   else if(action.type === SIGN_IN_ERROR) {
      return {
         ...state,
         error: action.payload.error,
         isFetching: action.payload.isFetching,
      }
   }
   return state;
};

export default authenticateReducer;
