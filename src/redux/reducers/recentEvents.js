import { RECEIVE_RECENT_ENTRIES, REQUEST_RECENT_ENTRIES } from "../actions/action-types";

const initialState = {
   isFetching: false,
   recentEntries:false,
};

function recentEvents(state = initialState, action) {
   switch(action.type){
      case RECEIVE_RECENT_ENTRIES:
         return {
            isFetching:true,
         }
      case REQUEST_RECENT_ENTRIES:
         return {
            isFetching:false,
         }
      default:
         return state;
   }
};

export default recentEvents;
