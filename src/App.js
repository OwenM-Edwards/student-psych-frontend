import React, {useEffect, useState} from 'react';
import { checkSession} from './redux/actions/index';
import styled from "styled-components";
import { connect } from 'react-redux';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify';
import {ThemeProvider} from "styled-components";
import { GlobalStyles } from "./components/GlobalStyle";
import { darkTheme } from "./components/Theme";
import AppRouter from './AppRouter';
import { checkAdminAPI } from './util';
import { LoadingIcon } from './components/index';

const Wrapper = styled.div`
  min-width:100%;
  max-width: 100%;
  height:100vh;
  display:flex;
  flex-wrap:wrap;
  margin: 0;
  background: #7b8794;

  @media (max-height: 560px) {
    overflow-y:scroll;
  }

  & .header {
    height:auto;
    height:7%;
    min-height:70px;
    width:100%;
    z-index:3;
  }
  & .main {
    height:93%;
    min-height:560px;
    max-height:93%;
    width:100%;
    display:flex;

  }
`
const LoadingWrapper = styled.div`
  min-width:100%;
  max-width: 100%;
  height:100vh;
  background-color:${({ theme }) => theme.primary.main};
  color: ${({ theme }) => theme.primary.contrastText};
  display:flex;
  justify-content:center;
  align-items:center;

`

const App = ({auth, checkSession}) => {

  // Check if user session if valid.
  useEffect(()=>{
    if(!auth.authenticated){
      const fetchAuth = async () => {
        await checkSession();
      }
      fetchAuth();
    }
  },[]);
  
  if(!auth.isFetching){
    return(
      <ThemeProvider theme={darkTheme}>
        <GlobalStyles/>
        <Wrapper>
          <ToastContainer
            position="bottom-right"
          />
          <AppRouter/>
        </Wrapper>
      </ThemeProvider>
    )
  }
  else {
    return(
      <ThemeProvider theme={darkTheme}>
        <GlobalStyles/>
        <LoadingWrapper>
          <ToastContainer
            position="bottom-right"
          />
          <LoadingIcon/>
        </LoadingWrapper>
      </ThemeProvider>
    )
  }
}


const mapStateToProps = (state) => ({auth:state.authenticate });
export default connect(mapStateToProps, {checkSession})(App);