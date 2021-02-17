import React, {useEffect} from 'react';
import { getInitialDate, getEntries } from './redux/actions/index';
import {
  BrowserRouter as Router, 
  Route,
  Redirect,
} from "react-router-dom";
import styled from "styled-components";
import { Calender, SignIn, Register, Verify } from './pages/index';
import { Header,LoadingIcon } from './components/index';
import { connect } from 'react-redux';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify';

const Wrapper = styled.div`
  padding:5px;
  background-color:#2b2b2b;
  min-width:100%;
  max-width: 100%;
  height:100vh;
  display:flex;
  flex-wrap:wrap;
  margin: 0;

  & .header {
    height:10%;
    max-height:200px;
    width:100%;
  }
  & .main {
    height:90%;
    width:100%;
  }
`


const App = ({addEntryState, getInitialDate, getEntries, auth, entries, selectedDate}) => {
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
  }, [selectedDate, addEntryState.isFetching,]);


  return (
    <Router>
      <Wrapper>
        <ToastContainer/>
        <div className="header">
          <Header/>
        </div>

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

        <Route path="/verify">
          <Verify/>
        </Route>

        <Route path="/calender">
          {(entries.isFetching)
            ? <LoadingIcon/>
            : (entries.entries)
              ? <div className="main"> <Calender/> </div> 
              : <div>maintenance</div>
          }
        </Route>

        <Route path="/">
          <Redirect to="/calender"/>
        </Route>
      </Wrapper>
    </Router>
  );
}


const mapStateToProps = (state) => ({ addEntryState:state.addEntry, selectedDate:state.selectedDate.selectedDate, entries:state.entries, auth:state.authenticate });
export default connect(mapStateToProps, {getInitialDate, getEntries})(App);