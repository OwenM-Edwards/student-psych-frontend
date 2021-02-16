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
} from './action-types';

import { authenticate, register } from '../../util/index';

import axios from 'axios';
import { toast } from "react-toastify";



export const getSecureEventInfo = ({eventInfo, userid}) => async (dispatch) => {
   const { day, month, year } = eventInfo;
   console.log(eventInfo)
   dispatch({
      type: REQUEST_SECURE_ENTRY,
   })
   const getSecureEntry = await axios.get('http://localhost:3000/entry/getsecureentry', { params: {
      day: day,
      month : month,
      year : year,
      userid: userid,
   }})
   .then(res => {
      dispatch({
         type: RECEIVE_SECURE_ENTRY,
         payload:  res.data,
      })
   })
   .catch(err => {
      dispatch({
         type: RECEIVE_SECURE_ENTRY,
      })
   })
}


// Get events for selected month/year
export const getEntries = (month, year) =>  async (dispatch) => {
   dispatch({
      type: REQUEST_GET_ENTRIES,
   })
   const getEntry = await axios.get('http://localhost:3000/entry/getentries', { params: {
      month : month,
      year : year
   }})
   .then(res => {
      if(res.data === 'no entries'){
         dispatch({
            type: RECEIVE_GET_ENTRIES,
         })
      }
      else {
         dispatch({
            type: RECEIVE_GET_ENTRIES,
            payload: res.data,
         })
      }

   })
   .catch(err=> {
      dispatch({
         type: RECEIVE_GET_ENTRIES,
      })
   })
}

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
   const addEntry = await axios({
      method: 'post',
      url: 'http://localhost:3000/entry/addentry',
      headers: {},
      data: eventInfo
   })
   .catch(err => {
      toast.dismiss();
      toast.error(err.response.data);
   })
   dispatch({
      type: RECEIVE_ADD_ENTRY
   })
}


// Delete event.
export const deleteEntry = (entryid) =>  async (dispatch) => {
   dispatch({
      type: REQUEST_DELETE_ENTRY,
   })
   const deleteEntry = await axios.delete('http://localhost:3000/entry/deleteentry', { params: {
      entryid : entryid
   }})
   .catch(err => {
      toast.dismiss();
      toast.error(err.response.data);
   })
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
   const editEntry = await axios({
      method: 'put',
      url: 'http://localhost:3000/entry/editentry',
      headers: {},
      data: info
   })
   if(!editEntry.data){
      toast.dismiss();
      toast.error('error');
   }
   dispatch({
      type: RECEIVE_EDIT_ENTRY,
   })
   window.location = "/calender"
}


export const signOut = () => async (dispatch) => {
   localStorage.removeItem("user");
   dispatch({
      type: SIGN_OUT
   })
   window.location = "/calender"
}

export const signIn = (info) => async (dispatch) => {
   dispatch({
      type: REQUEST_SIGN_IN
   })
   const userRequest = await authenticate(info.userEmail, info.userPassword);
   if(userRequest){
      localStorage.setItem("user", JSON.stringify(userRequest))
   }
   dispatch({
      type: RECEIVE_SIGN_IN,
      payload:userRequest
   })
}


export const registerUser = (info) => async (dispatch) => {
   dispatch({
      type: REQUEST_REGISTER_USER,
   })
   const registerRequest = await register(info.userEmail, info.userPassword)
   dispatch({
      type: RECEIVE_REGISTER_USER,
   })
}

export const getInitialDate = () => async (dispatch) => {
   let date = new Date();
   let day = date.getDate();
   let month = date.getMonth() + 1;
   let year = date.getFullYear();
   let totalDaysInMonth = new Date(year, month, 0).getDate();
   dispatch({
      type: SELECT_DATE,
      payload:{
         selectedDate: {
            day:day,
            month:month,
            year:year,
            totalDaysInMonth:totalDaysInMonth,
         },
      }
   })
}

export const selectDate = (info) => async (dispatch) => {
   dispatch({
      type: SELECT_DATE,
      payload:{
         selectedDate: info
      }
   })
}
