import {DELETE_USER } from "../actions/action-types";

const initialState = {
   isFetching: false,
};

function deleteUser(state = initialState, action) {
   switch(action.type){
      case DELETE_USER:
         return {
            isFetching:action.payload,
         }
      default: 
      return state;
   }
};

export default deleteUser;
