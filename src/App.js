import React, {useEffect} from 'react';
import { checkSession, serverCheck} from './redux/actions/index';
import styled from "styled-components";
import { connect } from 'react-redux';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify';
import {ThemeProvider} from "styled-components";
import { theme } from "./components/Theme";
import { Maintenance } from './pages/index';
import AppRouter from './AppRouter';
import { LoadingIcon, Header } from './components/index';


const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  display:flex;
  flex-direction:column;
  margin: 0;
  background: #7b8794;
  flex-wrap:nowrap;
  overflow:hidden;

  & .headerContainer {
    height:7%;
    min-height:70px;
    width:100%;
    z-index:3;
  }
  & .mainContainer {
    height:93%;
    width:100%;
    display:flex;
    flex-wrap:nowrap;
    overflow:hidden;
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

const App = ({serverCheck, auth, checkSession, serverStatus}) => {
  
  // Check if server is ok, then
  // Check if user session if valid.
  useEffect(()=>{
    const initialLoad = async () => {
      const checkServer = await serverCheck();
      if(checkServer){
        checkSession();
      }
    }
    initialLoad();
  },[]);


  // Server is down, show maintenance page.
  if(!serverStatus.status){
    return(
      <ThemeProvider theme={theme}>
        <Wrapper>
          <ToastContainer
            position="bottom-right"
          />
          <Maintenance/>
        </Wrapper>
      </ThemeProvider>
    )
  }

  // Loading server check and auth info.
  else if(serverStatus.isFetching || auth.isFetching){
    return(
      <ThemeProvider theme={theme}>
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
      <ThemeProvider theme={theme}>
        
        <Wrapper>
          <ToastContainer
            position="bottom-right"
          />

          <div className="headerContainer">
            <Header/>

          </div>


          <div className="mainContainer">
            <AppRouter/>
          </div>

        </Wrapper>
      </ThemeProvider>
    )
  }
}


const mapStateToProps = (state) => ({serverStatus:state.serverStatus, auth:state.authenticate });
export default connect(mapStateToProps, {serverCheck, checkSession})(App);