import { combineReducers } from "redux";
import entries from './entries';
import addEntry from './addentry';
import authenticate from './authenticate';
import registerUser from './registerUser';
import selectedDate from './selectedDate';
import deleteEntry from './deleteEntry';

export default combineReducers({
   entries,
   addEntry,
   authenticate,
   registerUser,
   selectedDate,
   deleteEntry,
});