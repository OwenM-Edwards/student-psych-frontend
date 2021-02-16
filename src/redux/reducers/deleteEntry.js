import { REQUEST_DELETE_ENTRY,RECEIVE_DELETE_ENTRY } from "../actions/action-types";

const initialState = {
   isFetching: false,
};

function deleteEntry(state = initialState, action) {
   switch(action.type){
      case REQUEST_DELETE_ENTRY:
         return {
            isFetching:true,
         }
      case RECEIVE_DELETE_ENTRY:
         return {
            isFetching:false,
         }
      default: 
      return state;
   }
};

export default deleteEntry;
