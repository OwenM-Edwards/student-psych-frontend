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
      margin: 2px auto;
   }
`
const RegisterAcceptedModal = styled.div`
   width:200px;
   height:400px;
   position:absolute;
   background-color:red;
`

const Register = ({registerUser, registerState}) => {
   const { register, handleSubmit, watch, errors } = useForm();

   const handleRegister = (data) => {
      console.log(data)
      if(data.userPassword !== data.userPasswordConfirm){
         toast.dismiss();
         toast.error('Passwords must match.');
      }
      else {
         registerUser(data.userEmail, data.userPassword, data.userType)
      }
   }

   if(!registerState.isFetching){
      return( 
         <Wrapper>
            {(registerState.success)
               ? 
               <RegisterAcceptedModal>
                  Please confirm email before signing in.
                  <Link to="/signIn"> <button>Sign In.</button> </Link>
                  <button>Resend Email.</button>
               </RegisterAcceptedModal>
               : <div></div>
            }
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
                     <option value="Non-medical Student">Doctor</option>
                     <option value="Other">Other</option>
                  </select>


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


const mapStateToProps = (state) => ({ registerState: state.register });

export default connect(mapStateToProps, { registerUser })(Register);