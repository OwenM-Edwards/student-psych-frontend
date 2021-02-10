import { GET_ENTRIES } from "../actions/action-types";

const initialState = {
   isFetching: false,
   error:false,
   entries:false,
};

function entriesReducer(state = initialState, action) {
   if (action.type === GET_ENTRIES) {
      return action.payload
   }
   return state;
};

export default entriesReducer;
