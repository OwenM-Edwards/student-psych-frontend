import { 
   REQUEST_GET_ENTRIES,
   RECEIVE_GET_ENTRIES,
   SIGN_OUT,
   REQUEST_DELETE_ENTRY,
   RECEIVE_DELETE_ENTRY,
   RECEIVE_ADD_ENTRY, 
   REQUEST_ADD_ENTRY,
   REQUEST_REGISTER_USER,
   RECEIVE_REGISTER_USER,
   REQUEST_SIGN_IN,
   RECEIVE_SIGN_IN,
   SELECT_DATE,
   RECEIVE_EDIT_ENTRY,
   REQUEST_EDIT_ENTRY,
   REQUEST_CLEAR_ENTRIES,
   REQUEST_SECURE_ENTRY,
   RECEIVE_SECURE_ENTRY,
   REQUEST_VERIFY_TOKEN,
   RECEIVE_VERIFY_TOKEN,
} from './action-types';

import { 
   authenticateAPI, 
   registerAPI,
   verifyAPI, 
   secureEventInfoAPI,
   getEntriesAPI,
   addEntryAPI,
   deleteEntryAPI,
   editEntryAPI,
} from '../../util/index';

import axios from 'axios';
import { toast } from "react-toastify";

// Verify register email.
export const verifyToken = (token) => async (dispatch) => {
   dispatch({
      type: REQUEST_VERIFY_TOKEN,
   })
   const APIData = await verifyAPI(token)
   dispatch({
      type: RECEIVE_VERIFY_TOKEN,
      payload:{
         success:APIData,
      }
   })
}

// Get full event info if user is logged in.
export const getSecureEventInfo = ({eventInfo, userid}) => async (dispatch) => {
   const { day, month, year } = eventInfo;
   dispatch({
      type: REQUEST_SECURE_ENTRY,
   })
   const APIData = await secureEventInfoAPI(day, month, year, userid);
   dispatch({
      type: RECEIVE_SECURE_ENTRY,
      payload:  APIData,
   })
}


// Get events for selected month/year
export const getEntries = (month, year) =>  async (dispatch) => {
   dispatch({
      type: REQUEST_GET_ENTRIES,
   })
   const APIData = await getEntriesAPI(month, year);
   dispatch({
      type: RECEIVE_GET_ENTRIES,
      payload: APIData,
   })
}

// Clear current events from state.
export const clearEntries = () => (dispatch) => {
   dispatch({
      type: REQUEST_CLEAR_ENTRIES,
   })
}

// Add new event to calender.
export const addEntry = (eventInfo) =>  async (dispatch) => {
   dispatch({
      type: REQUEST_ADD_ENTRY
   })
   const APIData = await addEntryAPI(eventInfo);
   dispatch({
      type: RECEIVE_ADD_ENTRY
   })
}


// Delete event.
export const deleteEntry = (entryid) =>  async (dispatch) => {
   dispatch({
      type: REQUEST_DELETE_ENTRY,
   })
   const APIData = await deleteEntryAPI(entryid);
   dispatch({
      type: RECEIVE_DELETE_ENTRY,
   })
   window.location = "/calender"
}

// Edit event.
export const editEntry = (info) =>  async (dispatch) => {
   dispatch({
      type: REQUEST_EDIT_ENTRY,
   })
   const APIData = await editEntryAPI(info);
   dispatch({
      type: RECEIVE_EDIT_ENTRY,
   })
   window.location = "/calender"
}

// Sign user out.
export const signOut = () => async (dispatch) => {
   localStorage.removeItem("user");
   dispatch({
      type: SIGN_OUT
   })
   window.location = "/calender"
}

// Sign user in.
export const signIn = (info) => async (dispatch) => {
   dispatch({
      type: REQUEST_SIGN_IN
   })
   const APIData = await authenticateAPI(info.userEmail, info.userPassword);
   dispatch({
      type: RECEIVE_SIGN_IN,
      payload:APIData,
   })
}

// Register new user.
export const registerUser = (info) => async (dispatch) => {
   dispatch({
      type: REQUEST_REGISTER_USER,
   })
   const APIData = await registerAPI(info.userEmail, info.userPassword)
   dispatch({
      type: RECEIVE_REGISTER_USER,
   })
}

// Get current date on page load.
export const getInitialDate = () => async (dispatch) => {
   let date = new Date();
   let totalDaysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
   dispatch({
      type: SELECT_DATE,
      payload:{
         selectedDate: {
            day:date.getDate(),
            month:date.getMonth() + 1,
            year:date.getFullYear(),
            totalDaysInMonth:totalDaysInMonth,
         },
      }
   })
}

// Change date to user selected date.
export const selectDate = (info) => async (dispatch) => {
   dispatch({
      type: SELECT_DATE,
      payload:{
         selectedDate: info
      }
   })
}
