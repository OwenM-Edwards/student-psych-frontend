import { FORGOT_PASSWORD_CHANGE, FORGOT_PASSWORD_SEND } from "../actions/action-types";

const initialState = {
   send: {
      isFetching: false,
      success:'pending',
   },
   change: {
      isFetching: false,
      success:'pending',
   }
};

function forgotPassword(state = initialState, action) {
   switch(action.type){
      case FORGOT_PASSWORD_SEND:
         return {
            ...state,
            send:{
               isFetching:action.payload.fetching,
               success:action.payload.success,
            },
         }
      case FORGOT_PASSWORD_CHANGE:
         return {
            ...state,
            change:{
               isFetching:action.payload.fetching,
               success:action.payload.success,
            
            },
         }
      default: 
      return state;
   }
};

export default forgotPassword;
