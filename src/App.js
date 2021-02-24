import React, {useEffect} from 'react';
import { getInitialDate, getEntries,checkSession } from './redux/actions/index';
import {
  BrowserRouter as Router, 
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import styled from "styled-components";
import { Calendar, SignIn, Register, Verify, Search } from './pages/index';
import { Header,LoadingIcon,Sidebar, NavPanel } from './components/index';
import { connect } from 'react-redux';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from 'react-toastify';
import {ThemeProvider} from "styled-components";
import { GlobalStyles } from "./components/GlobalStyle";
import { darkTheme } from "./components/Theme";
import { checkToken } from "./util/index";

const Wrapper = styled.div`
  min-width:100%;
  max-width: 100%;
  height:100vh;
  display:flex;
  flex-wrap:wrap;
  margin: 0;

  & .header {
    height:auto;
    max-height:200px;
    width:100%;
  }
  & .main {
    height:95%;
    width:100%;
    display:flex;
  }
`

const App = ({editEntryState,deleteEntryState,addEntryState, getInitialDate, getEntries, auth, entries, selectedDate,checkSession}) => {

  useEffect(() => {
    async function start(){
      if(!selectedDate){
          const initialDate = await getInitialDate();
      }
      if(selectedDate){
          getEntries(selectedDate.month, selectedDate.year);
      }
    }
    start();
  }, [selectedDate,addEntryState.isFetching,deleteEntryState.isFetching,editEntryState.isFetching]);

  // Check if user session if valid.
  useEffect(()=>{
    checkSession();
    console.log(auth)
  }, [])


  return (
    <ThemeProvider theme={darkTheme}>
      <GlobalStyles/>
      <Router>
        <Wrapper>

          <ToastContainer
            position="bottom-right"
          />
          <div className="header">
            <Header/>
          </div>
          
          <NavPanel/>

          <Switch>
            <Route path="/maintenance">
              <div>main</div>
            </Route>

            <Route path="/signin">
              {(auth.authenticated)
                ? <Redirect to="/calendar"/>
                : <SignIn/>
              }
            </Route>

            <Route path="/register">
              {(auth.authenticated)
                ? <Redirect to="/calendar"/>
                : <Register/>
              }
            </Route>

            <Route path="/verify">
              {(auth.authenticated)
                ? <Redirect to="/calendar"/>
                : <Verify/>
              }
            </Route>

            <Route path="/search/:searchterm">
                <div className="main"> <Sidebar/><Search/> </div> 
            </Route>

            <Route path="/calendar">
                <div className="main"> <Sidebar/><Calendar/> </div> 
            </Route>
            <Route exact path="/">
              <Redirect to="/calendar"/>
            </Route>
          </Switch>
        </Wrapper>
      </Router>
    </ThemeProvider>
  );
}


const mapStateToProps = (state) => ({ deleteEntryState:state.deleteEntry,editEntryState:state.editEntry,addEntryState:state.addEntry, selectedDate:state.selectedDate.selectedDate, entries:state.entries, auth:state.authenticate });
export default connect(mapStateToProps, {getInitialDate, getEntries,checkSession})(App);