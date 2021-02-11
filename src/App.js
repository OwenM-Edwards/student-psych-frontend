import React from 'react';
import {
  BrowserRouter as Router, 
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import styled from "styled-components";
import { Calender, SignIn, Register } from './pages/index';
import { Header } from './components/index';
import { connect } from 'react-redux';

const Wrapper = styled.div`
  padding:5px;
  background-color:grey;
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
    /* padding-right:5%; */
  }
`


function App({authenticated}) {
  return (
    <Router>
      <Wrapper>
        <div className="header">
          <Header/>
        </div>

        <Route path="/signin">
          {(authenticated)
          ? <Redirect to="/"/>
          : <SignIn/>
          }
        </Route>

        <Route path="/register">
          {(authenticated)
          ? <Redirect to="/"/>
          : <Register/>
          }
        </Route>

        <Route path="/">
          {(authenticated)
          ? <div className="main"> <Calender/> </div>
          : <Redirect to="/signin"/>
          }
        </Route>

      </Wrapper>
    </Router>
  );
}


const mapStateToProps = (state) => ({ authenticated:state.authenticate.authenticated });
export default connect(mapStateToProps)(App);