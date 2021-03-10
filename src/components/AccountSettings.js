import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import { useForm } from "react-hook-form";
import {changePassword, deleteOwnAccount} from "../redux/actions/index";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { LoadingIcon } from './index';

const Wrapper = styled.div`
   width:100%;
   height:100%;
   display:flex;
   flex-direction:column;
   padding:30px;
   border-radius:0 0 5px 5px;
   box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23); 
   background: ${({ theme }) => theme.primary.main};
   & h2 {
      margin-bottom:30px;
   }
   & form {
      width:100%;
      max-width: 600px;
      display:flex;
      flex-direction:columm;
   }
   & input {
      width:100%;
   }
`

const DeleteModal = styled.div`
   width:300px;
   height:300px;
   background-color:red;
   position: absolute;
`

const AccountSettings = ({changePassword, changePasswordState, deleteOwnAccount}) => {
   const { register, handleSubmit, watch, errors } = useForm();
   const [deleteModalToggle, setDeleteModalToggle] = useState(false);

   const onSubmit = (data) => {
      if(data.password !== data.confirmedPassword){
         toast.dismiss();
         toast.error('Passwords must match.');
      }
      else {
         changePassword(data.password);
      }
   }



   if(changePasswordState.isFetching){
      return(
         <Wrapper>
            <LoadingIcon/>
         </Wrapper>
      )
   }
   return(
      <Wrapper>
         {(deleteModalToggle)
            ? 
               <DeleteModal>
                  Are you sure?
                  <input
                     type="text"
                     placeholder="New password."
                     name="password"
                     minLength="4"
                     maxLength="50"
                  />
                  <button>Yes</button>
                  <button onClick={()=>setDeleteModalToggle(false)}>No</button>
               </DeleteModal>
            : <React.Fragment/>
         }
         
         <h2>Account Settings</h2>
         <form onSubmit={handleSubmit(onSubmit)}>
               <input
               type="text"
               placeholder="New password."
               name="password"
                  minLength="4"
                  maxLength="50"
                  ref={register({ required:true })}
               />

               <input
               placeholder="Confirm new password."
               name="confirmedPassword"
               type="text"
                  minLength="4"
                  maxLength="50"
                  ref={register({ required:true })}
               />
               <input value="Change password" type="submit" />
         </form>

         {/* <button onClick={()=>setDeleteModalToggle(true)}>Delete Account</button> */}
      </Wrapper>
   )  
  
}


const mapStateToProps = (state) => ({changePasswordState:state.changePassword});
export default connect(mapStateToProps, {deleteOwnAccount, changePassword})(AccountSettings);
