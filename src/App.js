import React, {useEffect} from 'react';
import { getInitialDate, getEntries } from './redux/actions/index';
import {
  BrowserRouter as Router, 
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import styled from "styled-components";
import { Calender, SignIn, Register, Verify, Search } from './pages/index';
import { Header,LoadingIcon,Sidebar } from './components/index';
import { connect } from 'react-redux';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify';
import {ThemeProvider} from "styled-components";
import { GlobalStyles } from "./components/GlobalStyle";
import { darkTheme } from "./components/Theme"

const Wrapper = styled.div`
  min-width:100%;
  max-width: 100%;
  height:100vh;
  display:flex;
  flex-wrap:wrap;
  margin: 0;

  & .header {
    height:7%;
    max-height:200px;
    width:100%;
  }
  & .main {
    height:95%;
    width:100%;
    display:flex;
  }
`


const App = ({editEntryState,deleteEntryState,addEntryState, getInitialDate, getEntries, auth, entries, selectedDate}) => {
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



  return (
    <ThemeProvider theme={darkTheme}>
      <GlobalStyles/>
      <Router>
        <Wrapper>
          <ToastContainer/>
          <div className="header">
            <Header/>
          </div>

          <Switch>
            <Route path="/maintenance">
              <div>main</div>
            </Route>

            <Route path="/signin">
              {(auth.user.id)
                ? <Redirect to="/calender"/>
                : <SignIn/>
              }
            </Route>

            <Route path="/register">
              {(auth.user.id)
                ? <Redirect to="/calender"/>
                : <Register/>
              }
            </Route>

            <Route path="/verify" component={Verify}/>

            <Route path="/search/:searchfield/:searchterm" component={Search}/>

            <Route path="/calender">
                <div className="main"> <Sidebar/><Calender/> </div> 
            </Route>
            <Route exact path="/">
              <Redirect to="/calender"/>
            </Route>
          </Switch>
        </Wrapper>
      </Router>
    </ThemeProvider>
  );
}


const mapStateToProps = (state) => ({ deleteEntryState:state.deleteEntry,editEntryState:state.editEntry,addEntryState:state.addEntry, selectedDate:state.selectedDate.selectedDate, entries:state.entries, auth:state.authenticate });
export default connect(mapStateToProps, {getInitialDate, getEntries})(App);