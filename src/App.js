import React, {useEffect, useState} from 'react';
import { checkSession } from './redux/actions/index';
import styled from "styled-components";
import { connect } from 'react-redux';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify';
import {ThemeProvider} from "styled-components";
import { GlobalStyles } from "./components/GlobalStyle";
import { darkTheme } from "./components/Theme";
import AppRouter from './AppRouter';

const Wrapper = styled.div`
  min-width:100%;
  max-width: 100%;
  height:100vh;
  display:flex;
  flex-wrap:wrap;
  margin: 0;

  & .header {
    height:auto;
    max-height:6%;
    width:100%;
  }
  & .main {
    min-height:94%;
    max-height:94%;
    width:100%;
    display:flex;
  }
`

const App = ({checkSession}) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);


  // Check if user session if valid.
  useEffect(()=>{
    const fetchAuth = async () => {
      const result = await checkSession();
      setIsAuthenticated(result);
      setLoading(false);
    }
    fetchAuth();
  }, []);
  


  if(loading){
    return(
      <ThemeProvider theme={darkTheme}>
        <GlobalStyles/>
        <Wrapper>
          <ToastContainer
            position="bottom-right"
          />
          Loading
        </Wrapper>

      </ThemeProvider>
    )
  }
  else {
    return(
      <ThemeProvider theme={darkTheme}>
        <GlobalStyles/>
        <Wrapper>
          <ToastContainer
            position="bottom-right"
          />
          <AppRouter authenticated={isAuthenticated}/>
        </Wrapper>

      </ThemeProvider>
    )
  }
}


const mapStateToProps = (state) => ({auth:state.authenticate });
export default connect(mapStateToProps, {checkSession})(App);