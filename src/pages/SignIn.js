import React, { useState } from 'react';
import styled from "styled-components";
import { connect } from "react-redux";
import { signIn } from "../redux/actions/index";
import { Link } from "react-router-dom";
import { LoadingIcon } from '../components/index';
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

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


const SignIn = ({ signIn, auth}) => {
   const { register, handleSubmit, watch, errors } = useForm();

   const onSubmit = (data) => {
      signIn(data.userEmail, data.userPassword);
   }

   // If user sent to route because access token expired, send toast.
   if(localStorage.getItem("expired")){
      localStorage.removeItem("expired");
      toast.dismiss();
      toast.error('Session expired, please log back in.');
   }
   if(!auth.isFetching){
      return(
         <Wrapper>
            <form onSubmit={handleSubmit(onSubmit)} className="signInForm">
               <fieldset className="signInFieldset">
                  <legend>Sign In</legend>
                  <input
                     placeholder="Email"
                     className="signinInput"
                     type="email" 
                     name="userEmail"  
                     id="email-address" 
                     ref={register({ required:true })}
                  />
                  <input 
                     placeholder="Password"
                     minLength= "6"
                     className="signinInput"
                     type="password" 
                     name="userPassword"  
                     id="password" 
                     ref={register({ required:true })}
                  />
                  <div className="buttonContainer">
                     <input 
                        type="submit" 
                        value="Sign in" 
                        className="signinButton" 
                     />
                  </div>
                  
                  <Link className="registerContainer" to="/register">
                     <p>Dont have an account? <span>Sign up</span></p>
                  </Link>
               </fieldset>
            </form>
            <InfoContainer>
               <p> We currently only accept .ac.uk and .nhs email domains. If you are part of a psychiatry or mental health society and would like your domain to be added to the list, please contact us.</p>
               <p>Event organiser? You’ll need to be approved by our admins before you can add your events. </p>
               <p> Get in touch with us via: <a href="mailto:admin@studentpsychiatry.co.uk">admin@studentpsychiatry.co.uk</a></p>
            </InfoContainer>
         </Wrapper>
      )   
   }
   else {
      return(
         <Wrapper>
            <LoadingIcon/>
         </Wrapper>
      )
   }
}


const mapStateToProps = (state) => ({ auth:state.authenticate });

export default connect(mapStateToProps, { signIn })(SignIn);