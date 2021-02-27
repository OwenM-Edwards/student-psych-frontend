import { RECEIVE_POPULAR_ENTRIES, REQUEST_POPULAR_ENTRIES } from "../actions/action-types";

const initialState = {
   isFetching: false,
   popularEntries:false,
};

function popularEvents(state = initialState, action) {
   switch(action.type){
      case REQUEST_POPULAR_ENTRIES:
         return {
            isFetching:true,
            popularEntries:false,
         }
      case RECEIVE_POPULAR_ENTRIES:
         return {
            isFetching:false,
            popularEntries:action.payload.popularEntries,
         }
      default:
         return state;
   }
};

export default popularEvents;
