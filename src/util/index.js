import axios from 'axios';
import { toast } from "react-toastify";

export const authenticate = async ( userEmail, userPassword ) => {
   const user = await axios({
      method: 'post',
      url: 'http://localhost:3000/auth/signin',
      headers: {},
      data: {
         "useremail": userEmail,
         "password": userPassword,
      }
   })
   if(!user.data){
      toast.dismiss();
      toast.error('error');
      return false;
   }
   else {
      return user.data;
   }
}


export const register = async ( userEmail, userPassword ) => {
   const register = await axios({
      method: 'post',
      url: 'http://localhost:3000/auth/register',
      headers: {},
      data: {
         "userpassword": userPassword,
         "useremail": userEmail,
      }
   })
   if(!register){
      toast.dismiss();
      toast.error('Error');
      return false;
   }
   else {
      return true;
   }
}


