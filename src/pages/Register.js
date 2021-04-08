import React, { useState } from 'react';
import styled from "styled-components";
import { connect } from "react-redux";
import { registerUser } from "../redux/actions/index";
import { Link } from "react-router-dom";
import { LoadingIcon } from '../components/index';
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const Wrapper = styled.div`
   width:100%;
   height:auto;
   min-height:100%;
   overflow:auto;
   display:flex;
   flex-direction:column;
   justify-content:center;
   @media (max-width: 900px) {
      margin-top:30px;
      justify-content:flex-start;
   }
   & .verifyDirectBox {
      width:600px;
      background-color:${({ theme }) => theme.primary.main};
      padding:40px;
      justify-self:center;
      align-self:center;
      border-radius:10px;
   }
   & .registerForm {
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
   & .registerFieldset {
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
      & .signInContainer {
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
   & .registerInput {
      padding:10px;
      width:100%;
      margin: 0 auto;
      background-color:${({ theme }) => theme.primary.offWhite};
      border-radius:5px;
      margin-bottom:10px;
      border:0px;
      outline: none;
   }
   & .registerButton {
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

const InfoContainer = styled.div`
   background-color:${({ theme }) => theme.primary.main};
   color:${({ theme }) => theme.primary.offWhite};
   width:90%;
   height:auto;
   align-self:center;
   justify-content:center;
   border-radius:0 0 5px 5px;
   padding:20px;
   max-width:560px;
   & h2 {
      margin-bottom:20px;
   }
   & p {
      margin-bottom:10px;
   }
   & a {
      color:${({ theme }) => theme.primary.light};
   }
`


const Register = ({registerUser, registerState}) => {
   const { register, handleSubmit, watch, errors } = useForm();

   const handleRegister = (data) => {
      if(data.userPassword !== data.userPasswordConfirm){
         toast.dismiss();
         toast.error('Passwords must match.');
      }
      else {
         registerUser(data.userEmail, data.userPassword, data.userType)
      }
   }

   if(!registerState.isFetching){
      if(!registerState.success){
         return( 
            <Wrapper>
               <form onSubmit={handleSubmit(handleRegister)} className="registerForm">
                  <fieldset className="registerFieldset">
                     <legend>Register</legend>
                     <input
                        placeholder="Email"
                        className="registerInput"
                        ref={register({ required:true })}
                        type="email" name="userEmail"  id="email-address" 
                     />
                     <input 
                        placeholder="Password"
                        minLength= "6"
                        className="registerInput"
                        ref={register({ required:true })}
                        type="password" name="userPassword"  id="password" 
                     />
                     <input 
                        placeholder="Confirm Password"
                        minLength= "6"
                        className="registerInput"
                        ref={register({ required:true })}
                        type="password" name="userPasswordConfirm"  id="password" 
                     />
                     <select 
                        className="registerInput"
                        name="userType"
                        ref={register({ required:true })}
                        defaultValue={'DEFAULT'}
                     >
                        <option value='DEFAULT' disabled>I am a...</option>
                        <option value="Medical Student">Medical Student</option>
                        <option value="Doctor">Doctor</option>
                        <option value="Non-medical Student">Non-medical Student</option>
                        <option value="Other">Other</option>
                     </select>
   
   
                     <div className="buttonContainer">
                        <input 
                           className="registerButton" 
                           type="submit" 
                           value="Register" 
                        />
                     </div>
   
                     <Link className="signInContainer" to="/signIn">
                        <p>Already have an account? <span>Sign in</span></p>
                     </Link>
                  </fieldset>
               </form>
               <InfoContainer>
                  <p> We currently only accept .ac.uk and .nhs email domains. If you are part of a psychiatry or mental health society and would like your domain to be added to the list, please contact us.</p>
                  <p>Event organiser? You’ll need to be approved by our admins before you can add your own events. </p>
                  <p> Get in touch with us via: <a href="mailto:admin@studentpsychiatry.co.uk">admin@studentpsychiatry.co.uk</a></p>
               </InfoContainer>
            </Wrapper>
         ) 
      }
      else {
         return (
            <Wrapper>
               <div className="verifyDirectBox">
                  <h1 className="header">Please confirm email to sign in. The email may take several minutes to arrive. Make sure to check your spam folder.</h1>
               </div>

            </Wrapper>
         )
      }
   }
   else {
      return(
         <Wrapper>
            <LoadingIcon/>
         </Wrapper>
      )
   } 
}


const mapStateToProps = (state) => ({ registerState: state.register });

export default connect(mapStateToProps, { registerUser })(Register);