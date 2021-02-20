import axios from 'axios';
import { toast } from "react-toastify";
const token = JSON.parse(localStorage.getItem("user")) ? JSON.parse(localStorage.getItem("user")) : false ;
const api = axios.create({
   baseURL: 'https://student-psych-api.herokuapp.com/',
   headers: {
     token: `${token.id}`,
   },
}); 


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
      toast.error(err.response.data);
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

      return getEntry.data;
   }
   catch (err) {
      toast.dismiss();
      toast.error(err.response.data);
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
      toast.dismiss();
      toast.error(err.response.data);
      return false;
   }
}

// Delete event.
export const deleteEntryAPI = async (entryid) => {
   try {
      const deleteEntry = await api.delete('entry/deleteentry', { params: {
         entryid : entryid
      }})
      return true;
   }
   catch (err) {
      toast.dismiss();
      toast.error(err.response.data);
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
      toast.error('test');
      return false;
   }
}

// Get secured event info if logged in.
export const secureEventInfoAPI = async ( day, month, year, userid ) => {
   try {
      const getSecureEntry = await api.get('entry/getsecureentry', { params: {
         day: day,
         month : month,
         year : year,
         userid: userid,
      }})
      return getSecureEntry.data;
   }
   catch (err) {
      toast.dismiss();
      toast.error(err.response.data);
      return false;
   }
}

// Verify register email.
export const verifyAPI = async ( token ) => {
   try {
      const validate = await axios({
         method: 'post',
         url: 'http://localhost:3000/auth/validate',
         headers: {},
         data: {
            "token": token,
         }
      })
      return true;
   } catch (err) {
      toast.dismiss();
      toast.error(err.response.data);
      return false;
   }
}

// Sign user in.
export const authenticateAPI = async ( userEmail, userPassword ) => {
   try {
      const user = await axios({
         method: 'post',
         url: 'http://localhost:3000/auth/signin',
         headers: {},
         data: {
            "useremail": userEmail,
            "password": userPassword,
         }
      })
      localStorage.setItem("user", JSON.stringify(user.data))
      return user.data;
   } catch (err) {
      toast.dismiss();
      toast.error(err.response.data);
      return false;
   }
}

// Register new user.
export const registerAPI = async ( userEmail, userPassword ) => {
   try {
      const register = await axios({
         method: 'post',
         url: 'http://localhost:3000/auth/register',
         headers: {},
         data: {
            "userpassword": userPassword,
            "useremail": userEmail,
         }
      })
      return register;
   } catch (err) {
      toast.dismiss();
      toast.error(err.response.data);
      return false;
   }
}


