import { SIGN_OUT, REQUEST_SIGN_IN, RECEIVE_SIGN_IN } from "../actions/action-types";

// const localSt =  false ;
const initialState = {
   isFetching:false,
   authenticated:false,
   moderator:false,
   admin:false,

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
            authenticated:action.payload.auth,
            isFetching:false,
            moderator:action.payload.moderator,
            admin:action.payload.admin,
         }
      case SIGN_OUT:
         return {
            authenticated:false,
            isFetching:false,
            moderator:false,
            admin:false,
         }
      default:
         return state;
   }
};

export default authenticate;
