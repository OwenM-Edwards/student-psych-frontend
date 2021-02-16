import { RECEIVE_SECURE_ENTRY, REQUEST_SECURE_ENTRY } from "../actions/action-types";

const initialState = {
   isFetching: false,
   secureInfo:false,
};

function secureEntry(state = initialState, action) {
   switch(action.type){
      case REQUEST_SECURE_ENTRY:
         return {
            isFetching: true,
         }
      case RECEIVE_SECURE_ENTRY:
         return {
            isFetching: false,
            secureInfo: action.payload,
         }
      default:
         return state;
   }
};

export default secureEntry;
