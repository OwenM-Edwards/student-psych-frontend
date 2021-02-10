import { SIGN_IN, REGISTER_USER, ADD_ENTRY, GET_ENTRIES } from './action-types';

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


export const signIn = ({userEmail, userPassword}) => async (dispatch) => {
   dispatch({
      type: SIGN_IN,
      payload:{
         isFetching: true,
      },
   })
   const json = JSON.stringify({
      "email": userEmail,
      "password": userPassword
   })
   const authenticated = await axios.post('http://localhost:3000/signin', json, {
      headers: { 'Content-Type': 'application/json' }
   })
   .then(data => {
      dispatch({
         type: SIGN_IN,
         payload:{
            isFetching: false,
            authenticated: true,
            error:false,
            userEmail:userEmail,
            userID:data.data.id,
         },
      })
   })
   .catch(error => {
      dispatch({
         type: SIGN_IN,
         payload:{
            isFetching: false,
            error:true,
            authenticated: false,
         },
      })
   });
}

export const registerUser = ({userEmail, userPassword, userName}) => async (dispatch) => {
   dispatch({
      type: REGISTER_USER,
      payload:{
         isFetching: true,
      },
   })
   const json = JSON.stringify({
      "name" : userName,
      "password": userPassword,
      "email": userEmail,
   })
   const authenticated = await axios.post('http://localhost:3000/register', json, {
      headers: { 'Content-Type': 'application/json' }
   })
   .then(data => {
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
   })
   .catch(error => {
      dispatch({
         type: REGISTER_USER,
         payload:{
            isFetching: false,
            error:true,
         },
      })
   });
}