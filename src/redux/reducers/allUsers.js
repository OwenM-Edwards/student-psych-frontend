import { REQUEST_ALL_USERS, RECEIVE_ALL_USERS } from "../actions/action-types";

// const localSt =  false ;
const initialState = {
   isFetching:false,
   users:false,

}

function admin(state = initialState, action) {
   switch(action.type){
      case REQUEST_ALL_USERS:
         return{
            ...state,
            isFetching:true,
         }
      case RECEIVE_ALL_USERS:
         return{
            isFetching:false,
            users:action.payload,
         }
      default:
         return state;
   }
};

export default admin;
