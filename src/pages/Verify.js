import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { connect } from "react-redux";
import { verifyToken } from "../redux/actions/index";
import { Link } from "react-router-dom";
import { LoadingIcon } from '../components/index';

const Wrapper = styled.div`
   width:100%;
   height:100%;
   display:flex;
   justify-content:center;

`


const Verify = ({verifyToken, tokenState}) => {
   const location = window.location.href;
   console.log(location.href);
   const token = location.substring(location.lastIndexOf('/') + 1);
   console.log(token)

   useEffect(()=>{
      if(tokenState.success){
         window.location = '/signin';
      }
   }, [tokenState.success])


   const submitToken = () => {
      verifyToken(token);
   }

   if(!tokenState.isFetching){
      return(
         <Wrapper>
            <button onClick={submitToken}>Verify Email</button>
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


const mapStateToProps = (state) => ({tokenState : state.token});

export default connect(mapStateToProps, { verifyToken })(Verify);