import React, { useState } from 'react';
import styled from "styled-components";
import { connect } from "react-redux";
import { registerUser } from "../redux/actions/index";
import { Link } from "react-router-dom";
import { LoadingIcon } from '../components/index';

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
const RegisterAcceptedModal = styled.div`
   width:200px;
   height:400px;
   position:absolute;
   background-color:red;
`

const Register = ({registerUser, registerState}) => {
   const [ userEmail, setUserEmail] = useState('');
   const [ userPassword, setUserPassword] = useState('');
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


const mapStateToProps = (state) => ({ registerState: state.register });

export default connect(mapStateToProps, { registerUser })(Register);