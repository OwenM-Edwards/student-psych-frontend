import axios from 'axios';
import { toast } from "react-toastify";
const token = JSON.parse(localStorage.getItem("user")) ? JSON.parse(localStorage.getItem("user")) : false ;
const api = axios.create({
   // baseURL: 'http://localhost:3000',
   baseURL: 'https://student-psych-api.herokuapp.com/',
   headers: {
     token: `${token.id}`, 
   },
}); 


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
      toast.dismiss();
      toast.error(err);
      
      return false;
   }
}

// Search events.
export const searchEntriesAPI = async (searchfield, searchterm) => {
   try {
      const searchEntries = await api.get('entry/search', { params: {
         searchfield : searchfield,
         searchterm : searchterm
      }})
      if(searchEntries.data){
         return searchEntries.data;
      }
      else {
         return false;
      }

   } catch (err) {
      toast.dismiss();
      toast.error(err);
      
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
      toast.dismiss();
      toast.error(err);
      
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
      console.log(err.response.data)
      toast.dismiss();
      toast.error('test');
      return false;
   }
}

// Delete event.
export const deleteEntryAPI = async (entryid, userid) => {
   try {
      const deleteEntry = await api.delete('entry/deleteentry', { params: {
         entryid : entryid,
         userid: userid,
      }})
      return true;
   }
   catch (err) {
      toast.dismiss();
      toast.error(err);
      
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
      toast.dismiss();
      toast.error(err);
      
      return false;
   }
}

// Get secured event info if logged in.
export const secureEventInfoAPI = async ( day, month, year, id, userid ) => {
   try {
      const getSecureEntry = await api.get('entry/getsecureentry', { params: {
         day: day,
         month : month,
         year : year,
         id: id,
         userid: userid,
      }})
      return getSecureEntry.data;
   }
   catch (err) {
      toast.dismiss();
      toast.error(err);
      
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
      toast.dismiss();
      toast.error(err);
      
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
      localStorage.setItem("user", JSON.stringify(user.data))
      return user.data;
   } catch (err) {
      toast.dismiss();
      toast.error(err);
      
      return false;
   }
}

// Register new user.
export const registerAPI = async ( userEmail, userPassword, userType ) => {
   console.log(userEmail, userPassword, userType)
   try {
      const register = await api.post('auth/register', { data: {
            "userpassword": userPassword,
            "useremail": userEmail,
            "usertype" : userType,
         }
      })
      return register;
   } catch (err) {
      toast.dismiss();
      toast.error(err);
      
      return false;
   }
}


