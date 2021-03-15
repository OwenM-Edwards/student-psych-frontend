import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { connect } from "react-redux";
import { verifyToken } from "../redux/actions/index";
import { Link } from "react-router-dom";
import { LoadingIcon } from '../components/index';
import { toast } from "react-toastify";

const Wrapper = styled.div`
   width:100%;
   height:100%;
   display:flex;
   flex-direction:column;
   justify-content:center;
   
   
   & .buttonContainer {
      align-self:center;
      background-color: ${({ theme }) => theme.primary.main};
      width:400px;
      height:300px;
      display:flex;
      border-radius:10px;
      justify-content:center;
      align-items:center;
      padding:30px;
      flex-direction:column;
      text-align:center;
   }
   & .verifyButton{
      margin-top:30px;
      align-self:center;
      width:100px;
      height:40px;
      color: #2b2b2b;
      text-transform: uppercase;
      text-decoration: none;
      background: white;
      padding: 5px;
      border-radius:5px;
      border: none;
      transition: all 0.4s ease 0s;
      background-color: ${({ theme }) => theme.backgroundContrast};
      cursor:pointer;
      &:hover{
         scale:0.98;
      }
   }
   & a {
      color:${({ theme }) => theme.primary.light};
   }

`

const Verify = ({verifyToken, tokenState}) => {
   const location = window.location.href;
   const token = location.substring(location.lastIndexOf('/') + 1);

   useEffect(()=>{
      async function verify(){
         const tokenSuccess = await tokenState.success;
         if(!tokenSuccess && !tokenState.isFetching){
            await verifyToken(token);
         }
      }
      verify();
   }, [tokenState.sucess])



   if(tokenState.isFetching){
      return(
         <Wrapper>
            <LoadingIcon/>
         </Wrapper>
      )  
   }
   else {
      return(
         <Wrapper>
            <div className="buttonContainer">
               {(tokenState.success
                  ? 
                     <div className="buttonContainer">
                        <p>Account created, please sign in.</p>
                        <Link to="/signin"><button className="verifyButton">Sign in</button></Link>
                     </div>
                     
                  : 
                     <div className="buttonContainer">
                        <p>Email already registered, or there was a sever error. Please contact support at <a href="mailto:admin@studentpsychiatry.co.uk">admin@studentpsychiatry.co.uk</a></p>
                        <Link to="/register"><button className="verifyButton">Try again</button></Link>
                     </div>
                     
               )}
            </div>
         </Wrapper>
      )   
   }

}


const mapStateToProps = (state) => ({tokenState : state.token});

export default connect(mapStateToProps, { verifyToken })(Verify);