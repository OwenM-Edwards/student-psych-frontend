import { 
   SIGN_OUT,
   DELETE_ENTRY,
   DELETE_ENTRY_ERROR,
   ADD_ENTRY_ERROR, 
   REGISTER_USER_ERROR, 
   SIGN_IN_ERROR, SIGN_IN, 
   REGISTER_USER, 
   ADD_ENTRY, 
   GET_ENTRIES,
   SELECT_DATE,
   EDIT_ENTRY,
   EDIT_ENTRY_ERROR,
} from './action-types';

import axios from 'axios';

// Get events for selected month/year
export const getEntries = (month, year) =>  async (dispatch) => {
   dispatch({
      type: GET_ENTRIES,
      payload: {
         isFetching: true,
      },
   })
   const getEntry = await axios.get('http://localhost:3000/getentries', { params: {
      month : month,
      year : year
   }})
   .then(data=> {
      dispatch({
         type: GET_ENTRIES,
         payload: {
            isFetching: false,
            entries: data.data,
         },
      })
   })
   .catch(err => {
      dispatch({
         type: GET_ENTRIES,
         payload:{
            isFetching: false,
            error:true,
         },
      })
   })
}

// Add new event to calender.
export const addEntry = ({
      title,
      description,
      day,
      month,
      year,
      image,
      type,
      userid,
      startTime,
      endTime,
   }) =>  async (dispatch) => {
   dispatch({
      type: ADD_ENTRY,
      payload: {
         isFetching: true,
      },
   })
   const addEntry = await axios({
      method: 'post',
      url: 'http://localhost:3000/addentry',
      headers: {},
      data: {
         "title": title,
         "description": description,
         "day": day,
         "month": month,
         "year": year,
         "image": image,
         "type": type,
         "userid": userid,
         "starttime": startTime,
         "endtime": endTime,
      }
   })
   .then(res=> {
      if(res.status === 201){
         dispatch({
            type: ADD_ENTRY,
            payload: {
               isFetching: false,
               success: true,
            },
         })
      }

   })
   .catch(err => {
      dispatch({
         type: ADD_ENTRY_ERROR,
         payload:{
            isFetching: false,
            error:true,
         },
      })
   })
}


// Delete event.
export const deleteEntry = (entryid) =>  async (dispatch) => {
   dispatch({
      type: DELETE_ENTRY,
      payload: {
         isFetching: true,
      },
   })
   const deleteEntry = await axios.delete('http://localhost:3000/deleteentry', { params: {
      entryid : entryid
   }})
   .then(res=> {
      if(res.status === 200){
         dispatch({
            type: DELETE_ENTRY,
            payload: {
               isFetching: false,
               success: true,
            },
         })
      }

   })
   .catch(err => {
      dispatch({
         type: DELETE_ENTRY_ERROR,
         payload:{
            isFetching: false,
            error:true,
         },
      })
   })
}

// Edit event.
export const editEntry = ({
      title,
      description,
      day,
      month,
      year,
      image,
      type,
      userid,
      startTime,
      endTime,
      entryid,
   }) =>  async (dispatch) => {
      console.log(entryid)
   dispatch({
      type: EDIT_ENTRY,
      payload: {
         isFetching: true,
      },
   })
   const editEntry = await axios({
      method: 'put',
      url: 'http://localhost:3000/editentry',
      headers: {},
      data: {
         "entryid": entryid,
         "title": title,
         "description": description,
         "day": day,
         "month": month,
         "year": year,
         "image": image,
         "type": type,
         "userid": userid,
         "starttime": startTime,
         "endtime": endTime,

      }
   })
   .then(res=> {
      if(res.status === 200){
         dispatch({
            type: EDIT_ENTRY,
            payload: {
               isFetching: false,
               success: true,
            },
         })
      }

   })
   .catch(err => {
      dispatch({
         type: EDIT_ENTRY_ERROR,
         payload:{
            isFetching: false,
            error:true,
         },
      })
   })
}


export const signOut = () => async (dispatch) => {
   localStorage.removeItem("user");
   dispatch({
      type: SIGN_OUT
   })
}

export const signIn = ({ userEmail, userPassword }) => async (dispatch) => {
   dispatch({
      type: SIGN_IN,
      payload:{
         isFetching: true,
      },
   })
   const signIn = await axios({
      method: 'post',
      url: 'http://localhost:3000/signin',
      headers: {},
      data: {
         "useremail": userEmail,
         "password": userPassword,
      }
   })
   .then(res => {
      if(res.status === 200){
         localStorage.setItem("user", JSON.stringify(res.data[0]))
         dispatch({
            type: SIGN_IN,
            payload:{
               email:JSON.parse(localStorage.getItem("user")).email,
               id:JSON.parse(localStorage.getItem("user")).id,
            }
         })
      }
   })
   .catch(error => {
      dispatch({
         type: SIGN_IN_ERROR,
         payload:{
            error:'incorrect',
         },
      })
   });
}


export const registerUser = ({userEmail, userPassword}) => async (dispatch) => {
   dispatch({
      type: REGISTER_USER,
      payload:{
         isFetching: true,
      },
   })
   const authenticated = await axios({
      method: 'post',
      url: 'http://localhost:3000/register',
      headers: {},
      data: {
         "password": userPassword,
         "useremail": userEmail,
      }
   })
   .then(res => {
      if(res.status === 200){
         dispatch({
            type: REGISTER_USER,
            payload:{
               isFetching: false,
               error:false,
            },
         })
         dispatch({
            type: SIGN_IN,
            payload:{
               authenticated: true,
            },
         })
      }
      else {
         console.log('this one master')
         dispatch({
            type: REGISTER_USER,
            payload:{
               isFetching: false,
               error:true,
            },
         })
      }
   })
   .catch(error => {
      dispatch({
         type: REGISTER_USER_ERROR,
         payload:{
            error:'duplicate',
            isFetching: false,
         },
      })
   });
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

export const selectDate = ({day, month, year, totalDaysInMonth}) => async (dispatch) => {
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
