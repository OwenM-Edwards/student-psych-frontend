import { RECEIVE_EDIT_ENTRY, REQUEST_EDIT_ENTRY } from "../actions/action-types";

const initialState = {
   isFetching: false,
};

function editEntry(state = initialState, action) {
   switch(action.type){
      case REQUEST_EDIT_ENTRY:
         return {
            isFetching:true,
         }
      case RECEIVE_EDIT_ENTRY:
         return {
            isFetching:false,
         }
      default:
         return state;
   }
};

export default editEntry;
