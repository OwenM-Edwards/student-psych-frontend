import React from 'react';
import {
  BrowserRouter as Router, 
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import styled from "styled-components";
import { Calendar, SignIn, Register, Verify, Search, Profile, ForgotPassword } from './pages/index';
import { Header,Sidebar, NavPanel, MobileMenu } from './components/index';
import "react-toastify/dist/ReactToastify.css";
import { connect } from 'react-redux';



const HeaderContainer = styled.div`
   height:7%;
   min-height:70px;
   width:100%;
   z-index:3;
`
const MainContainer = styled.div`
   height:93%;
   min-height:560px;
   max-height:93%;
   width:100%;
   display:flex;
   overflow:hidden;

`

const AppRouter = ({auth}) => {

   return (
      <Router>
         {/* <NavPanel/> */}
         <HeaderContainer>
            <Header/>
         </HeaderContainer>

         <MobileMenu/>
         
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
               <Verify/>
               
            </Route>

            <Route path="/forgotPassword/:token">
               <ForgotPassword/> 
            </Route>
            <Route path="/forgotPassword">
               <ForgotPassword/> 
            </Route>

            <Route path="/profile">
               {(auth.authenticated)
                  ? <Profile/>
                  : <Redirect to="/calendar"/>
               }
            </Route>

            <Route path="/search/:searchterm">
               <MainContainer> <Sidebar/><Search/> </MainContainer> 
            </Route>

            <Route path="/calendar/:month/:year">
               <MainContainer> <Sidebar/><Calendar/> </MainContainer> 
            </Route>

            <Route path="/calendar">
               <MainContainer> <Sidebar/><Calendar/> </MainContainer> 
            </Route>

            <Route exact path="/">
               <Redirect to="/calendar"/>
            </Route>
         </Switch>
         
      </Router>
   );
}

const mapStateToProps = (state) => ({auth:state.authenticate});
export default connect(mapStateToProps)(AppRouter);