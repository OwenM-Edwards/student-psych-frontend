import { RECEIVE_RECENT_ENTRIES, REQUEST_RECENT_ENTRIES } from "../actions/action-types";

const initialState = {
   isFetching: false,
   recentEntries:false,
};

function recentEvents(state = initialState, action) {
   switch(action.type){
      case REQUEST_RECENT_ENTRIES:
         return {
            isFetching:true,
         }
      case RECEIVE_RECENT_ENTRIES:
         return {
            isFetching:false,
            recentEntries:action.payload.recentEntries,
         }
      default:
         return state;
   }
};

export default recentEvents;
