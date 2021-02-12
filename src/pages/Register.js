import React, { useState } from 'react';
import styled from "styled-components";
import { connect } from "react-redux";
import { registerUser } from "../redux/actions/index";
import { Link } from "react-router-dom";
import { LoadingIcon } from '../components/index';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Wrapper = styled.div`
   width:100%;
   height:100%;
   display:flex;
   justify-content:center;

   & .registerForm {
      padding:20px;
      background-color:${props => props.theme.backgroundLgtColor};
      color:${props => props.theme.fontColor};
      align-self:center;
      width:50%;
      justify-content:center;
      max-width:600px;
      border-radius:5px;
   }
   & .registerFieldset {
      display:flex;
      flex-direction:column;
      padding:10px;
   }
   & .buttonContainer {
      margin: 10px auto 0;
      width:100%;
   }
   & .registerInput {
      padding:10px;
      width:100%;
      margin: 0 auto;
   }
`

const Register = ({registerUser, error, isFetching}) => {
   const [ userEmail, setUserEmail] = useState('');
   const [ userPassword, setUserPassword] = useState('');
   const toastId = 1
   const handlePassword = (event) => {
      setUserPassword(event.target.value)
   }
   const handleEmail = (event) => {
      setUserEmail(event.target.value)
   }
   const handleRegister = (event) => {
      event.preventDefault();
      registerUser({userEmail, userPassword})
   }

   // If incorrect email type.
   if (error === 'incorrect email type') {
      // Set timeout needed to push to bottom of call stack, wont appear otherwise.
      setTimeout(function(){
         toast.error('Only ac.uk and nhs.uk emails are currently allowed.',{
            toastId: toastId
         });
      },100); 
   } 
   // If user name already taken. 
   if (error === 'duplicate') {
      // Set timeout needed to push to bottom of call stack, wont appear otherwise.
      setTimeout(function(){
         toast.error('Email already registered.',{
            toastId: toastId
         });
      },100); 
   } 
   if(!isFetching){
      return( 
         <Wrapper>
            <ToastContainer/>
            <form onSubmit={handleRegister} className="registerForm">
               <fieldset className="registerFieldset">
                  <legend>Register</legend>
                  <input
                     placeholder="Email"
                     className="registerInput"
                     onChange={handleEmail} 
                     type="email" name="email-address"  id="email-address" 
                  />
                  <input 
                     placeholder="Password"
                     minLength= "6"
                     className="registerInput"
                     onChange={handlePassword} 
                     type="password" name="password"  id="password" 
                  />
                  <div className="buttonContainer">
                     <input 
                        className="registerInput" 
                        type="submit" 
                        value="Register" 
                     />
                  </div>

                  <Link className="buttonContainer" to="/signIn"> 
                     <input
                        type="button" 
                        value="Sign In"
                        className="registerInput" 
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


const mapStateToProps = (state) => ({ error: state.registerUser.error, isFetching: state.registerUser.isFetching });

export default connect(mapStateToProps, { registerUser })(Register);