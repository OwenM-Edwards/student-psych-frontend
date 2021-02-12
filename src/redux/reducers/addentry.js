import { ADD_ENTRY, ADD_ENTRY_ERROR } from "../actions/action-types";

const initialState = {
   isFetching: false,
   error:false,
   success:false,
};

function addEntryReducer(state = initialState, action) {
   if ( action.type === ADD_ENTRY ) {
      return {
         ...state,
         isFetching: action.payload.isFetching,
         success: action.payload.succes,
      }
   }
   if ( action.type === ADD_ENTRY_ERROR ) {
      return {
         ...state,
         isFetching: action.payload.isFetching,
         error: action.payload.error,
      }
   }
   return state;
};

export default addEntryReducer;
