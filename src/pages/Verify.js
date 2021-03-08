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
   background-color: ${({ theme }) => theme.background};
   
   & .buttonContainer {
      align-self:center;
      background-color: ${({ theme }) => theme.backgroundContrast};
      width:300px;
      height:200px;
      display:flex;
      border-radius:10px;
      justify-content:center;
   }
   & .verifyButton{
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
      cursor:pointer;
      &:hover{
         scale:0.98;
      }
   }

`


const Verify = ({verifyToken, tokenState}) => {
   const location = window.location.href;
   const token = location.substring(location.lastIndexOf('/') + 1);



   useEffect(()=>{
      if(tokenState.success){
         toast.dismiss();
         toast.success('Account created, please login.');
      }
      else {
         async function verify(){
            await verifyToken(token);
         }
         if(!tokenState.isFetching || tokenState.success){
            verify();
         }
      }
   }, [])



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
            {(tokenState.success
               ? <Link to="/signin"><button>Success</button></Link>
               : <Link to="/register"><button>Try again</button></Link>
            )}
         </Wrapper>
      )   
   }

}


const mapStateToProps = (state) => ({tokenState : state.token});

export default connect(mapStateToProps, { verifyToken })(Verify);