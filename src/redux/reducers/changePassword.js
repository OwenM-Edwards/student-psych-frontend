import { CHANGE_PASSWORD } from "../actions/action-types";

const initialState = {
   isFetching: false,
};

function changePassword(state = initialState, action) {
   switch(action.type){
      case CHANGE_PASSWORD:
         return {
            isFetching:action.payload,
         }
      default: 
      return state;
   }
};

export default changePassword;
