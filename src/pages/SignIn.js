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
      background-color:${props => props.theme.backgroundLgtColor};
      color:${props => props.theme.fontColor};
      align-self:center;
      width:90%;
      justify-content:center;
      max-width:600px;
      align-self:center;
      border-radius:5px;
      @media (max-width: 900px) {
         width:100%;
      }
   }
   & .signInFieldset {
      display:flex;
      flex-direction:column;
      padding:10px;
      border-radius:10px;
   }
   & .buttonContainer {
      margin: 10px auto 0;
      width:100%;
   }
   & .signinInput {
      padding:10px;
      width:100%;
      margin: 0 auto;
   }
`
const InfoContainer = styled.div`
   background-color:${({ theme }) => theme.primary.main};
   color:${({ theme }) => theme.primary.offWhite};
   width:90%;
   height:auto;
   position: relative;
   top:5px;
   align-self:center;
   justify-content:center;
   border-radius:5px;
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
                        className="signinInput" 
                     />
                  </div>
                  
                  <Link className="buttonContainer" to="/register">
                     <input                           
                        type="button" 
                        value="Register"
                        className="signinInput" 
                     />
                  </Link>
               </fieldset>
            </form>
            <InfoContainer>
               <h2>Information</h2>
               <p>We currently only accept .ac.uk and .nhs email domains for sign up. If you are part of a psychiatry or mental helath society and would like your email domains added to the approved list, please contact us at <a href="mailto:admin@studentpsychiatry.co.uk">admin@studentpsychiatry.co.uk</a></p>
               <p>Additionally, if you would like to register yourself as an event organiser and add your own events, please get in touch at <a href="mailto:admin@studentpsychiatry.co.uk">admin@studentpsychiatry.co.uk</a></p>
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