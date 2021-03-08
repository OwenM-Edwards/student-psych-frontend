import React, {useEffect, useState} from 'react';
import { checkSession, serverCheck} from './redux/actions/index';
import styled from "styled-components";
import { connect } from 'react-redux';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify';
import {ThemeProvider} from "styled-components";
import { GlobalStyles } from "./components/GlobalStyle";
import { darkTheme } from "./components/Theme";
import AppRouter from './AppRouter';
import { LoadingIcon } from './components/index';

const Wrapper = styled.div`
  min-width:100%;
  max-width: 100%;
  height:100vh;
  display:flex;
  flex-wrap:wrap;
  margin: 0;
  background: #7b8794;
  overflow-x:hidden;
  @media (max-height: 560px) {
    overflow-y:scroll;
  }
  position:relative
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

const App = ({serverCheck, auth, checkSession, serverStatus}) => {
  // Check if server is up
  useEffect(()=> {
    const checkServer = async () => {
      await serverCheck();
    }
    if(serverStatus !== true){
      checkServer();
    }
  }, []);

  // Check if user session if valid.
  useEffect(()=>{
    if(serverStatus.status === true && !auth.authenticated){
      const fetchAuth = async () => {
        await checkSession();
      }
      fetchAuth();
    }
  },[]);

  // Server is down, show maintenance page.
  if(!serverStatus.status){
    return(
      <ThemeProvider theme={darkTheme}>
        <GlobalStyles/>
        <Wrapper>
          <ToastContainer
            position="bottom-right"
          />
          <p>Server Down</p>
        </Wrapper>
      </ThemeProvider>
    )
  }

  // Loading server check and auth info.
  else if(serverStatus.isFetching || auth.isFetching){
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

  // Main app.
  else {
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
}


const mapStateToProps = (state) => ({serverStatus:state.serverStatus, auth:state.authenticate });
export default connect(mapStateToProps, {serverCheck, checkSession})(App);