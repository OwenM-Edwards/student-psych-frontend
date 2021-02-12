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
    /* padding-right:5%; */
  }
`


const App = ({user}) => {
  const loggedIn = user.token;

  const regTest = () => {
    let testString = "something@gmail.ac.uk";
    let slicedTestString = testString.split('@');
    let emailEnd = slicedTestString[1].toLowerCase();
    console.log(`Test ${emailEnd}`);
    let re = /ac\.uk/;
    let reb = /^nhs\.uk$/;
    console.log(re.test(emailEnd));
  }
  regTest();


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
          <div className="main"> <Calender/> </div>
        </Route>

      </Wrapper>
    </Router>
  );
}


const mapStateToProps = (state) => ({ user:state.authenticate });
export default connect(mapStateToProps)(App);