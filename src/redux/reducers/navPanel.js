import { TOGGLE_NAV_PANEL } from "../actions/action-types";

const initialState = {
   show: false,
};

function navPanel(state = initialState, action) {
   switch(action.type){
      case TOGGLE_NAV_PANEL:
         return {
            show:action.payload,
         }
      default:
         return state;
   }

};

export default navPanel;
