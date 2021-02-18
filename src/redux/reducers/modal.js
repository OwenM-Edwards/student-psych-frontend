import { MODAL_HANDLE } from "../actions/action-types";

const initialState = {
   modalDisplay: false,
   modalInfo: false,
};

function modal(state = initialState, action) {
   switch(action.type){
      case MODAL_HANDLE:
         return {
            modalDisplay: action.payload.modalDisplay,
            modalInfo: action.payload.modalInfo,
         }
      default:
         return state;
   }
};

export default modal;
