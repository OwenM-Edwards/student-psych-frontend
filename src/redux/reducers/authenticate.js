import { SIGN_OUT, REQUEST_SIGN_IN, RECEIVE_SIGN_IN } from "../actions/action-types";

// const localSt =  false ;
const localSt = JSON.parse(localStorage.getItem("user")) ? JSON.parse(localStorage.getItem("user")) : false ;
const initialState = {
   user:localSt,
   isFetching:false,
}

function authenticate(state = initialState, action) {
   switch(action.type){
      case REQUEST_SIGN_IN:
         return{
            ...state,
            isFetching:true,
         }
      case RECEIVE_SIGN_IN:
         return{
            user:action.payload,
            isFetching:false,
         }
      case SIGN_OUT:
         return {
            user:false,
            isFetching:false,
         }
      default:
         return state;
   }
};

export default authenticate;
