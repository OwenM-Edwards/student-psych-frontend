import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { connect } from "react-redux";
import { forgotPasswordChange,forgotPasswordSend } from "../redux/actions/index";
import { Link } from "react-router-dom";
import { LoadingIcon } from '../components/index';
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

const Wrapper = styled.div`
   width:100%;
   max-height:100%;
   display:flex;
   flex-direction:column;
   justify-content:flex-start;

   & .signInForm {
      padding:20px;
      height:auto;
      background-color:${({ theme }) => theme.primary.main};
      color:${props => props.theme.fontColor};
      align-self:center;
      width:90%;
      justify-content:center;
      max-width:560px;
      align-self:center;
      border-radius:5px 5px 0 0;
      box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
   }
   & .signInFieldset {
      display:flex;
      justify-content:center;
      flex-direction:column;
      padding:10px;
      padding-top:20px;
      border-radius:10px;
      border:0px;
      text-align:center;
      font-size:1.2rem;
      
      & p {
         margin-top:30px;
      }
      & span {
         font-weight:bold;
         color:${({ theme }) => theme.primary.light};
         cursor: pointer;
      }
      & .registerContainer {
         align-self:center;
         width:100%;
         color:${({ theme }) => theme.primary.offWhite};
         text-decoration:none;
         font-size:1.1rem;
      }
   }

   & .buttonContainer {
      margin: 10px auto 0;
      width:100%;
      display:flex;
      justify-content:center;
   }
   & .signinInput {
      padding:10px;
      width:100%;
      margin: 0 auto;
      background-color:${({ theme }) => theme.primary.offWhite};
      border-radius:5px;
      margin-bottom:10px;
      outline: none;
      border:0px;
   }
   & .signinButton {
      padding:10px;
      width:100%;
      justify-self:center;
      margin: 0 auto;
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
const ResetContainer = styled.div`
   width:500px;
   height:auto;
   background-color:${({ theme }) => theme.primary.main};
   align-self:center;
   padding:30px;
   border-radius:10px;
   text-align:center;
   display:flex;
   flex-direction:column;
   & p {
      margin-bottom:30px;
   }
   & .signinButton {
      margin-bottom:20px;
   }
`

const ForgotPassword = ({ forgotPasswordSend, forgotPasswordChange, forgotPasswordChangeState, forgotPasswordSendState}) => {
   const { register, handleSubmit, watch, errors } = useForm();
   const {token} = useParams();
   const [requestedNewPassword, setRequestedNewPassword] = useState(false);

   const onSubmitSend = (data) => {
      forgotPasswordSend(data.userEmail);
   }

   const onSubmitChange = (data) => {
      if(data.userPassword !== data.userPasswordConfirm){
         toast.dismiss();
         toast.error('Passwords must match.');
      }
      else {
         forgotPasswordChange(data.userPassword, token);
      } 
   }

   useEffect(()=>{
      if(forgotPasswordSendState.success === false){
         toast.dismiss();
         toast.error('Error sending email, please try again later.');
      }
      if(forgotPasswordChangeState.success === false){
         toast.dismiss();
         toast.error('Error changing password, please try again later.');
      }
   },[]);

   console.log(forgotPasswordSendState)
   if(forgotPasswordSendState.success === true){
      return (
         <Wrapper>
            <ResetContainer><p>Email sent, please dont forget to check your spam folder.</p></ResetContainer>
         </Wrapper>
      )
   }

   else if(forgotPasswordChangeState.success === true){
      return (
         <Wrapper>
            <ResetContainer>
               <p>Password successfully changed.</p>
               <Link to="/signIn"><button className="signinButton" >Sign in</button></Link>
            </ResetContainer>
         </Wrapper>
      )
   }

   else if(forgotPasswordSendState.isFetching || forgotPasswordChangeState.isFetching) {
      return(
         <Wrapper>
            <LoadingIcon/>
         </Wrapper>
      )
   }

   else if(!token){
      return(
         <Wrapper>
            <ResetContainer>
               <p>
                 Would you like to reset your password? An email will be sent with a link to change your password.
               </p>
               <form onSubmit={handleSubmit(onSubmitSend)} className="signInForm">
               <fieldset className="signInFieldset">
                  <legend>Enter account email address.</legend>
                  <input
                     placeholder="Email address"
                     className="signinInput"
                     type="email" 
                     name="userEmail"  
                     id="email-address" 
                     ref={register({ required:true })}
                  />
                  <div className="buttonContainer">
                     <input 
                        type="submit" 
                        value="Submit" 
                        className="signinButton" 
                     />
                  </div>
                  <Link className="registerContainer" to="/signIn">
                     <button className="signinButton">
                        Return to sign in
                     </button>
                  </Link>
               </fieldset>
            </form>

            </ResetContainer>
         </Wrapper>
      )
   }

   else if (token) {
      return(
         <Wrapper>
            <form onSubmit={handleSubmit(onSubmitChange)} className="signInForm">
               <fieldset className="signInFieldset">
                  <legend>Change Password</legend>
                  <input
                     placeholder="New password"
                     className="signinInput"
                     type="password" 
                     name="userPassword"  
                     id="password" 
                     ref={register({ required:true })}
                  />
                  <input 
                     placeholder="Confirm new password"
                     minLength= "6"
                     className="signinInput"
                     type="password" 
                     name="userPasswordConfirm"  
                     id="passwordConfirm" 
                     ref={register({ required:true })}
                  />
                  <div className="buttonContainer">
                     <input 
                        type="submit" 
                        value="Change password" 
                        className="signinButton" 
                     />
                  </div>   
               </fieldset>
            </form>
         </Wrapper>
      )   
   }
   else {
      return(
         <Wrapper>
            Error
         </Wrapper>
      )
   }
   
}


const mapStateToProps = (state) => ({ forgotPasswordChangeState:state.forgotPassword.change, forgotPasswordSendState:state.forgotPassword.send });

export default connect(mapStateToProps, { forgotPasswordSend, forgotPasswordChange })(ForgotPassword);