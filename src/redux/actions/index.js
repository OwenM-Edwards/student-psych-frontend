import { REGISTER_USER_ERROR, SIGN_IN_ERROR, SIGN_IN, REGISTER_USER, ADD_ENTRY, GET_ENTRIES } from './action-types';

import axios from 'axios';

// Get events for selected month/year
export const getEntries = (month, year) =>  async (dispatch) => {
   dispatch({
      type: GET_ENTRIES,
      payload: {
         isFetching: true,
      },
   })
   const entries = await axios.get('http://localhost:3000/getentries', { params: {
      month : month,
      year : year
   }})
   .then(data=> {
      dispatch({
         type: GET_ENTRIES,
         payload: {
            isFetching: false,
            entries: data,
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
export const addEntry = () =>  async (dispatch) => {
   dispatch({
      type: ADD_ENTRY,
      payload: {
         isFetching: true,
      },
   })
   const entries = await axios.post('http://localhost:3000/addentry')
   .then(data=> {
      dispatch({
         type: ADD_ENTRY,
         payload: {
            isFetching: false,
            entries: data,
         },
      })
   })
   .catch(err => {
      dispatch({
         type: ADD_ENTRY,
         payload:{
            isFetching: false,
            error:true,
         },
      })
   })
}


export const signIn = ({ userEmail, userPassword }) => async (dispatch) => {
   dispatch({
      type: SIGN_IN,
      payload:{
         isFetching: true,
      },
   })
   const authenticated = await axios({
      method: 'post',
      url: 'http://localhost:3000/signin',
      headers: {},
      data: {
         "useremail": userEmail,
         "password": userPassword,
      }
   })
   .then(res => {
      console.log(res);
      // email already used.
      if(res.status === 200){
         dispatch({
            type: SIGN_IN,
            payload:{
               isFetching: false,
               authenticated: true,
               error:false,
               userEmail:res.data.userEmail,
               userID:res.data.id,
            },
         })
      }
   })
   .catch(error => {
      dispatch({
         type: SIGN_IN_ERROR,
         payload:{
            error:'incorrect',
            isFetching: false,
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
