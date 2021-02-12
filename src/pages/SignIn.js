import React, { useState } from 'react';
import styled from "styled-components";
import { connect } from "react-redux";
import { signIn } from "../redux/actions/index";
import { Link } from "react-router-dom";
import { LoadingIcon } from '../components/index';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Wrapper = styled.div`
   width:100%;
   height:100%;
   display:flex;
   justify-content:center;


   & .signInForm {
      padding:20px;
      background-color:${props => props.theme.backgroundLgtColor};
      color:${props => props.theme.fontColor};
      align-self:center;
      width:50%;
      justify-content:center;
      max-width:600px;
      border-radius:5px;
   }
   & .signInFieldset {
      display:flex;
      flex-direction:column;
      padding:10px;
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


const SignIn = ({ signIn, error, isFetching}) => {
   const [ userEmail, setUserEmail] = useState(false);
   const [ userPassword, setUserPassword] = useState(false);
   const toastId = 1
   const handlePassword = (event) => {
      setUserPassword(event.target.value)
   }
   const handleEmail = (event) => {
      setUserEmail(event.target.value) 
   }
   const handleSignIn = (event) => {
      event.preventDefault();
      signIn({userEmail, userPassword});
   }


   // If not confirmed email yet
   if (error === 'not confirmed') {
      // Set timeout needed to push to bottom of call stack, wont appear otherwise.
      setTimeout(function(){
         toast.error('Please confirm email before logging in.',{
            toastId: toastId
         });
      },100); 
   } 

   // If wrong email/password
   if (error === 'incorrect') {
      // Set timeout needed to push to bottom of call stack, wont appear otherwise.
      setTimeout(function(){
         toast.error('Incorrect email or password.',{
            toastId: toastId
         });
      },100); 
   } 
   if(!isFetching){
      return(
         <Wrapper>
            <ToastContainer/>
            <form onSubmit={handleSignIn} className="signInForm">
               <fieldset className="signInFieldset">
                  <legend>Sign In</legend>
                  <input
                     placeholder="Email"
                     className="signinInput"
                     onChange={handleEmail} 
                     type="email" name="email-address"  id="email-address" 
                  />
                  <input 
                     placeholder="Password"
                     minLength= "6"
                     className="signinInput"
                     onChange={handlePassword} 
                     type="password" name="password"  id="password" 
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


const mapStateToProps = (state) => ({ error: state.authenticate.error, isFetching: state.authenticate.isFetching });

export default connect(mapStateToProps, { signIn })(SignIn);