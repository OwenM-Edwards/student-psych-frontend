import { EDIT_ENTRY, EDIT_ENTRY_ERROR } from "../actions/action-types";

const initialState = {
   isFetching: false,
   error:false,
};

function editEntryReducer(state = initialState, action) {
   if ( action.type === EDIT_ENTRY ) {
      return {
         ...state,
         isFetching: action.payload.isFetching,
      }
   }
   if ( action.type === EDIT_ENTRY_ERROR ) {
      return {
         ...state,
         isFetching: action.payload.isFetching,
         error: action.payload.error,
      }
   }
   return state;
};

export default editEntryReducer;
