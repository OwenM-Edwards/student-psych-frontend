import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import { useForm } from "react-hook-form";
import {changePassword, deleteOwnAccount} from "../redux/actions/index";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { LoadingIcon } from './index';

const Wrapper = styled.div`
   width:100%;
   height:auto;
   min-height:100%;
   display:flex;
   flex-direction:column;
   padding:30px;
   border-radius:0 0 5px 5px;
   box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23); 
   background: ${({ theme }) => theme.primary.main};
   align-items:center;
   & h2 {
      margin-bottom:30px;
   }
   & form {
      width:100%;
      max-width: 600px;
   }
   & fieldset {
      display:flex;
      justify-content:center;
      flex-direction:column;
      padding:10px;
      padding-top:20px;
      border-radius:10px;
      border:0px;
      text-align:center;
      font-size:1.2rem;
   }
   & input {
      padding:10px;
      width:100%;
      margin: 0 auto;
      background-color:${({ theme }) => theme.primary.offWhite};
      border-radius:5px;
      margin-bottom:10px;
      outline: none;
      border:0px;
   }
   & .submitButton {
      padding:10px;
      width:100%;
      background-color:#2f3e4d;
      border-radius:5px;
      color:${({ theme }) => theme.primary.light};
      border:0px;
      box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
      font-size:1.1rem;
      cursor: pointer;
      transition: all 0.2s ease 0s;
      &:hover {
         background-color:${({ theme }) => theme.primary.light};
         color:${({ theme }) => theme.primary.offBlack};
      }
   }
`

const DeleteModal = styled.div`
   width:300px;
   height:300px;
   background-color:red;
   position: absolute;
`

const InfoWrapper = styled.div`
   margin-top:50px;

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
            <fieldset>
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
               <input className="submitButton" value="Change password" type="submit" />
            </fieldset>
            
         </form>

         {/* <button onClick={()=>setDeleteModalToggle(true)}>Delete Account</button> */}


         <InfoWrapper>
            <p>Event organiser? You’ll need to be approved by our admins before you can add your own events. </p>
            <p> Get in touch with us via: <a href="mailto:admin@studentpsychiatry.co.uk">admin@studentpsychiatry.co.uk</a></p>
         </InfoWrapper>
      </Wrapper>
   )  
  
}


const mapStateToProps = (state) => ({changePasswordState:state.changePassword});
export default connect(mapStateToProps, {deleteOwnAccount, changePassword})(AccountSettings);
