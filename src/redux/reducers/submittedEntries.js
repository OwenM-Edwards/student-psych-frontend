import { REQUEST_SUBMITTED_ENTRIES, RECEIVE_SUBMITTED_ENTRIES } from "../actions/action-types";

const initialState = {
   submittedEntries: false,
};

function submittedEntries(state = initialState, action) {
   switch(action.type){
      case REQUEST_SUBMITTED_ENTRIES:
         return {
            ...state,
         }
      case RECEIVE_SUBMITTED_ENTRIES:
         return {
            submittedEntries:action.payload,
         }
      default: return state;
   }
};

export default submittedEntries;
