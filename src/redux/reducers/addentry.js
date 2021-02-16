import { REQUEST_ADD_ENTRY, RECEIVE_ADD_ENTRY } from "../actions/action-types";

const initialState = {
   isFetching: false,
};

function addEntry(state = initialState, action) {
   switch(action.type){
      case REQUEST_ADD_ENTRY:
         return {
            isFetching:true,
         }
      case RECEIVE_ADD_ENTRY:
         return {
            isFetching:false,
         }
      default:
         return state;
   }

};

export default addEntry;
