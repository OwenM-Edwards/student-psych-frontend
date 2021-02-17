import { combineReducers } from "redux";
import entries from './entries';
import addEntry from './addEntry';
import authenticate from './authenticate';
import register from './register';
import selectedDate from './selectedDate';
import deleteEntry from './deleteEntry';
import editEntry from './editEntry';
import secureEntry from './secureEntry';
import token from './token';

export default combineReducers({
   entries,
   addEntry,
   authenticate,
   register,
   selectedDate,
   deleteEntry,
   editEntry,
   secureEntry,
   token,
});