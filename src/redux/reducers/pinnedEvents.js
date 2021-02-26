import { REQUEST_PINNED_EVENTS, RECEIVE_PINNED_EVENTS } from "../actions/action-types";

const initialState = {
   isFetching: false,
   entries:false,
};

function entries(state = initialState, action) {
   switch(action.type){
      case REQUEST_PINNED_EVENTS:
         return {
            ...state,
            isFetching:true,
         }
      case RECEIVE_PINNED_EVENTS:
         if(action.payload){
            return {
               isFetching:false,
               entries:action.payload,
            }
         }
         else {
            return {
               isFetching:false,
            }
         }
      default: return state;
   }
};

export default entries;
