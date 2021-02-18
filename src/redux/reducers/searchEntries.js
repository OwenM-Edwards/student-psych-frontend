import { RECEIVE_SEARCH_TERM, REQUEST_SEARCH_TERM } from "../actions/action-types";

const initialState = {
   isFetching: false,
   entries:false,
};

function searchEntries(state = initialState, action) {
   switch(action.type){
      case REQUEST_SEARCH_TERM:
         return {
            isFetching:true,
         }
      case RECEIVE_SEARCH_TERM:
         return {
            isFetching:false,
            entries:action.payload,
         }
      default:
         return state;
   }
};

export default searchEntries;
