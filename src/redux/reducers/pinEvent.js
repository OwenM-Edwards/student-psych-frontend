import { REQUEST_PIN_EVENT, RECEIVE_PIN_EVENT } from "../actions/action-types";

const initialState = {
   isFetching: false,
};

function entries(state = initialState, action) {
   switch(action.type){
      case REQUEST_PIN_EVENT:
         return {
            isFetching:true,
         }
      case RECEIVE_PIN_EVENT:
         return {
            isFetching:false,
         }
      default: return state;
   }
};

export default entries;
