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
import recentEvents from './recentEvents';
import navPanel from './navPanel';
import popularEvents from './popularEvents';
import submittedEntries from './submittedEntries';
import allUsers from './allUsers';
import deleteUser from './deleteUser';
import changePassword from './changePassword';
import mobileMenuToggle from './mobileMenuToggle';
import serverStatus from './serverStatus';
import forgotPassword from './forgotPassword';

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
   recentEvents,
   navPanel,
   popularEvents,
   submittedEntries,
   allUsers,
   deleteUser,
   changePassword,
   mobileMenuToggle,
   serverStatus,
   forgotPassword,
});