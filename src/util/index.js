import axios from 'axios';
import { toast } from "react-toastify";
import {signOut} from '../redux/actions/index';

const token = JSON.parse(localStorage.getItem("user")) ? JSON.parse(localStorage.getItem("user")) : false ;
const api = axios.create({
   // baseURL: 'http://localhost:3000/',
   baseURL: 'https://student-psych-api.herokuapp.com/',
   // headers: {
   //   token: `${token.id}`, 
   // },
   withCredentials: true,
}); 


const errorHandler = (err) => {
   console.log(err)
   if(!err){
      toast.dismiss();
      toast.error('Server issues, please try again later.');
   }
   else if(!err.response){
      toast.dismiss();
      toast.error('Server issues, please try again later.');
   }
   else if(!err.response.data){
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
   else {
      toast.dismiss();
      toast.error(err.response.data);
   } 
}

// Admin delete user.
export const deleteUserAPI = async (info) => {
   try {
      const deleteUser = await api.delete('admin/deleteuser', { data: {
         userid:info,
      }})
      return true;
   } catch (err){
      errorHandler(err);
      return false;
   } 
}


// Admin delete and ban user.
export const banAndDeleteAPI = async (info) => {
   try {
      const banUser = await api.delete('admin/banuser', { data: {
         userid:info,
      }})
      return true;
   } catch (err){
      errorHandler(err);
      return false;
   } 
}

// Admin, change user type.
export const changeUserTypeAPI = async (info) => {
   // console.log(info)
   try {
      const changeUser = await api.put('admin/changeusertype', { data: {
         newUserType:info.newType,
         userid:info.userid,
      }})
      if(changeUser.data){
         return changeUser.data;
      }
      else {
         return false;
      }
   } catch (err){
      errorHandler(err);
      return false;
   } 
}

// Get all users for admin pane.
export const getAllUsersAPI = async () => {
   try {
      const allUsers = await api.get('admin/getallusers');
      if(allUsers.data){
         return allUsers.data;
      }
      else {
         return false;
      }
   } catch (err){
      errorHandler(err);
      return false;
   } 
}

// Get submitted events.
export const submittedEntriesAPI = async () => {
   try {
      const submittedEvents = await api.get('moderator/submittedevents');
      if(submittedEvents.data){
         return submittedEvents.data;
      }
      else {
         return false;
      }
   } catch (err){
      errorHandler(err);
      return false;
   } 
}

// Get popular entries.
export const popularEntriesAPI = async () => {
   try {
      const popularEntries = await api.get('user/popularentries');
      if(popularEntries.data){
         
         return popularEntries.data;
      }
      else {
         return false;
      }
   } catch (err){
      errorHandler(err);
      return false;
   } 
}


// Register event click.
export const registerEventClickAPI = async (eventInfo) => {
   api.post('user/registerclick', { data: {
      eventInfo : eventInfo,
   }});
}



// Recent Entries.
export const recentEntriesAPI = async () => {
   try {
      const recentEntries = await api.get('user/recent')
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
      const searchEntries = await api.get('user/search', { params: {
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
      const getEntry = await api.get('user/getentries', { params: {
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
      const addEntry = await api.post('moderator/addentry', { data: {
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
      const deleteEntry = await api.delete('moderator/deleteentry', { params: {
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
      const editEntry = await api.put('moderator/editentry', { data: {
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
      const getSecureEntry = await api.get('user/getsecureentry', { params: {
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
      const check = await api.post('user/checkSession');
      console.log('CHECKING')
      console.log(check)
      if(check){
         return check.data;
      }
      else {
        return false; 
      }
   } catch (err) {
      errorHandler(err);
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
      if(user){
         return user.data;
      }
      else {
        return false; 
      }
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


// Change user password.
export const changePasswordAPI = async (newPassword) => {
   try {
      const newPasswordApi = await api.put('user/changepassword', { data: {
            "newPassword": newPassword,
         }
      })
      toast.dismiss();
      toast.success('Password succesfully changed.');
      return true;
   } catch (err) {
      errorHandler(err);
      return false;
   }
}

// Delete own account.
export const deleteSelfAPI = async () => {
   try {
      const deleteSelf = await api.delete('user/deleteaccount')
      return true;
   } catch (err) {
      errorHandler(err);
      return false;
   }
}