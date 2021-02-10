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

const ErrorBox = styled.div`
   width:100px;
   height:100px;
   background-color:red;   
`

const Register = ({registerUser, error, isFetching}) => {
   const [ userEmail, setUserEmail] = useState(false);
   const [ userPassword, setUserPassword] = useState(false);
   const [ userName, setUserName] = useState(false);

   const handlePassword = (event) => {
      setUserPassword(event.target.value)
   }
   const handleEmail = (event) => {
      setUserEmail(event.target.value)
   }
   const handleUserName = (event) => {
      setUserName(event.target.value)
   }
   if(isFetching === false){
      return(
         <Wrapper>
            <form className="registerForm">
               <fieldset className="registerFieldset">
                  <legend>Register</legend>
                  <input
                     placeholder="User Name"
                     className="registerInput"
                     onChange={handleUserName} 
                     type="text" name="user-name"  id="user-name" 
                  />
                  <input
                     placeholder="Email"
                     className="registerInput"
                     onChange={handleEmail} 
                     type="email" name="email-address"  id="email-address" 
                  />
                  <input 
                     placeholder="Password"
                     className="registerInput"
                     onChange={handlePassword} 
                     type="password" name="password"  id="password" 
                  />
                  <div className="buttonContainer">
                     <input 
                        className="registerInput" 
                        type="submit" 
                        value="Register" 
                        onClick={()=> registerUser({userEmail, userPassword, userName})}
                     />
                  </div>

                  <Link className="buttonContainer" to="/signIn"> 
                     <input
                        type="submit" 
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


const mapStateToProps = (state) => ({ error: state.register.error, authenticated: state.authenticate.authenticated, isFetching: state.register.isFetching });

export default connect(mapStateToProps, { registerUser })(Register);