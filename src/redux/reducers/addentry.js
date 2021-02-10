import { ADD_ENTRY } from "../actions/action-types";

const initialState = {
   isFetching: false,
   error:false,
};

function addEntryReducer(state = initialState, action) {
   if ( action.type === ADD_ENTRY ) {
      return action.payload
   }
   return state;
};

export default addEntryReducer;
