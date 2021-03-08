import {MOBILE_MENU_TOGGLE } from "../actions/action-types";

const initialState = {
   shown: false,
};

function mobileMenuToggle(state = initialState, action) {
   switch(action.type){
      case MOBILE_MENU_TOGGLE:
         return {
            shown:action.payload,
         }
      default: 
      return state;
   }
};

export default mobileMenuToggle;
