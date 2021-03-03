import React from 'react';
import {
  BrowserRouter as Router, 
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import styled from "styled-components";
import { Calendar, SignIn, Register, Verify, Search, Profile } from './pages/index';
import { Header,Sidebar, NavPanel } from './components/index';
import "react-toastify/dist/ReactToastify.css";
import { connect } from 'react-redux';


const AppRouter = ({auth}) => {

   return (
      <Router>
         {/* <NavPanel/> */}
         <div className="header">
            <Header/>
         </div>
         
         

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

            <Route path="/profile">
               {(auth.authenticated)
                  ? <Profile/>
                  : <Redirect to="/calendar"/>
               }
            </Route>

            <Route path="/search/:searchterm">
               <div className="main"> <Sidebar/><Search/> </div> 
            </Route>

            <Route path="/calendar/:month/:year">
               <div className="main"> <Sidebar/><Calendar/> </div> 
            </Route>

            <Route path="/calendar">
               <div className="main"> <Sidebar/><Calendar/> </div> 
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