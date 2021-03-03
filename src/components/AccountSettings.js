import React, { useEffect } from 'react';
import styled from "styled-components";
import { useForm } from "react-hook-form";
import {changePassword} from "../redux/actions/index";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { LoadingIcon } from './index';

const Wrapper = styled.div`
   width:100%;
   height:100%;
   display:flex;
   flex-direction:column;
   padding:30px;
   border-radius:5px;
   box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23); 
   
`

const AccountSettings = ({changePassword, changePasswordState}) => {
   const { register, handleSubmit, watch, errors } = useForm();

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
         <h2>Account Settings.</h2>
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
               <input value="Change password" type="submit" />
            </fieldset>
         </form>
      </Wrapper>
   )  
  
}


const mapStateToProps = (state) => ({changePasswordState:state.changePassword});
export default connect(mapStateToProps, {changePassword})(AccountSettings);
