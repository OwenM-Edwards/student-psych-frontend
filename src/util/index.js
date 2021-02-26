import axios from 'axios';
import { toast } from "react-toastify";
import {signOut} from '../redux/actions/index';

const token = JSON.parse(localStorage.getItem("user")) ? JSON.parse(localStorage.getItem("user")) : false ;
const api = axios.create({
   baseURL: 'http://localhost:3000/',
   // baseURL: 'https://student-psych-api.herokuapp.com/',
   // headers: {
   //   token: `${token.id}`, 
   // },
   withCredentials: true,
}); 


const errorHandler = (err) => {
   if(!err.response.data){
      if(!err){
         toast.dismiss();
         toast.error('Server issues, please try again later.');
      }
      else if(err.response.status === 401){
         localStorage.removeItem("user");
         window.localStorage.removeItem("user");
         localStorage.setItem("expired", true);
         window.location = '/signin';
      }
      else if(err.response.status === 404){
         toast.dismiss();
         toast.error('Not found');
      }
   }
   else {
      toast.dismiss();
      toast.error(err.response.data);
   } 
}

// Refresh Access Token.
export const refreshAccessToken = async () => {
   const lcST = JSON.parse(localStorage.getItem("user"));
   const refreshToken = lcST.refreshToken;
   try {
      const refreshTokenAPI = await api.post('auth/refresh', { data: {
         refreshToken : refreshToken,
      }})
      if(refreshTokenAPI.data){
         return refreshToken;
      }
      else {
         return false;
      }
   } catch (err){
      errorHandler(err);
      return false;
   }
}


// Recent Entries.
export const recentEntriesAPI = async () => {
   try {
      const recentEntries = await api.get('entry/recent')
      if(recentEntries.data){
         return recentEntries.data;
      }
      else {
         return false;
      }
   } catch (err) {
      errorHandler(err);
      return false;
   }
}

// Search events.
export const searchEntriesAPI = async (searchterm) => {
   try {
      const searchEntries = await api.get('entry/search', { params: {
         searchterm : searchterm
      }})
      if(searchEntries.data){
         return searchEntries.data;
      }
      else {
         return false;
      }

   } catch (err) {
      errorHandler(err);
      return false;
   }
}

// Get events for given month & year.
export const getEntriesAPI = async (month, year) => {
   try {
      const getEntry = await api.get('entry/getentries', { params: {
         month : month,
         year : year
      }})
      if(getEntry.data){
         return getEntry.data;
      }
      else {
         return false;
      }

   }
   catch (err) {
      errorHandler(err);
      return false;
   }
}

// Add event.
export const addEntryAPI = async (eventInfo) => {
   try {
      const addEntry = await api.post('entry/addentry', { data: {
         eventInfo
      }})
      return true;
      
   }
   catch (err) {
      errorHandler(err);
      return false;
   }
}

// Delete event.
export const deleteEntryAPI = async (entryid) => {
   try {
      const deleteEntry = await api.delete('entry/deleteentry', { params: {
         entryid : entryid,
      }})
      return true;
   }
   catch (err) {
      errorHandler(err);
      return false;
   }
}

// Edit event.
export const editEntryAPI = async (eventInfo) => {
   try {
      const editEntry = await api.put('entry/editentry', { data: {
         eventInfo
      }})
      return true;
   }
   catch (err) {
      errorHandler(err);
      return false;
   }
}

// Get secured event info if logged in.
export const secureEventInfoAPI = async ( day, month, year, id ) => {
   try {
      const getSecureEntry = await api.get('entry/getsecureentry', { params: {
         day: day,
         month : month,
         year : year,
         id: id,
      }})
      return getSecureEntry.data;
   }
   catch (err) {
      errorHandler(err);
      return false;
   }
}

// Verify register email.
export const verifyAPI = async ( token ) => {
   try {
      const validate = await api.post('auth/verify',{ data: {
            "token": token,
         }
      })
      return true;
   } catch (err) {
      errorHandler(err);
      return false;
   }
}

// Log user out.
export const logoutAPI = async () => {
   try {
      const logout = await api.post('auth/logout');
      return true;
   } catch (err){
      errorHandler(err);
      return false;
   }
}

// Check session.
export const checkSessionAPI = async () => {
   try {
      const check = await api.post('auth/checkSession');
      return true;
   } catch (error) {
      return false;
   }
}

// Sign user in.
export const authenticateAPI = async ( userEmail, userPassword ) => {
   try {
      const user = await api.post('auth/signin', { data: {
            "useremail": userEmail,
            "password": userPassword,
         }
      })
      return true;
   } catch (err) {
      errorHandler(err);
      return false;
   }
}

// Register new user.
export const registerAPI = async ( userEmail, userPassword, userType ) => {
   try {
      const register = await api.post('auth/register', { data: {
            "userpassword": userPassword,
            "useremail": userEmail,
            "usertype" : userType,
         }
      })
      return true;
   } catch (err) {
      errorHandler(err);
      return false;
   }
}


