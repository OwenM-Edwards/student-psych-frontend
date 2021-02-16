import { REQUEST_CLEAR_ENTRIES, REQUEST_GET_ENTRIES, RECEIVE_GET_ENTRIES } from "../actions/action-types";

const initialState = {
   isFetching: false,
   entries:false,
};

function entries(state = initialState, action) {
   switch(action.type){
      case REQUEST_GET_ENTRIES:
         return {
            ...state,
            isFetching:true,
         }
      case RECEIVE_GET_ENTRIES:
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

      case REQUEST_CLEAR_ENTRIES:
         return {
            state,
         }
      default: return state;
   }
};

export default entries;
