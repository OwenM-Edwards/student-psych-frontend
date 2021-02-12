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


const App = ({user}) => {
  const loggedIn = user.token;
  console.log(user)
  return (
    <Router>
      <Wrapper>
        <div className="header">
          <Header/>
        </div>

        <Route path="/signin">
          {(user.id)
          ? <Redirect to="/"/>
          : <SignIn/>
          }
        </Route>

        <Route path="/register">
          {(user.id)
          ? <Redirect to="/"/>
          : <Register/>
          }
        </Route>

        <Route path="/">
          {(user.id)
          ? <div className="main"> <Calender/> </div>
          : <Redirect to="/signin"/>
          }
        </Route>

      </Wrapper>
    </Router>
  );
}


const mapStateToProps = (state) => ({ user:state.authenticate });
export default connect(mapStateToProps)(App);