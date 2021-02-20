import { combineReducers } from "redux";
import entries from './entries';
import addEntry from './addentry';
import authenticate from './authenticate';
import register from './register';
import selectedDate from './selectedDate';
import deleteEntry from './deleteEntry';
import editEntry from './editEntry';
import secureEntry from './secureEntry';
import token from './token';
import searchEntries from './searchEntries';
import modal from './modal';

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
   searchEntries,
   modal,
});