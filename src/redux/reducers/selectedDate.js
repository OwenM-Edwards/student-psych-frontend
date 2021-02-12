import { SELECT_DATE } from "../actions/action-types";

const initialState = {
   selectedDate: false,
};

function selectedDate(state = initialState, action) {
   if (action.type === SELECT_DATE ) {
      return action.payload
   }
   return state;
};

export default selectedDate;
