import { SERVER_CHECK } from "../actions/action-types";

const initialState = {
   isFetching: false,
   status: 'pending',
};

function serverStatus(state = initialState, action) {
   switch(action.type){
      case SERVER_CHECK:
         return {
            isFetching: action.payload.fetching,
            status:action.payload.status,
         }
      default:
         return state;
   }
};

export default serverStatus;
