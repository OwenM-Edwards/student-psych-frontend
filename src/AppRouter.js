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


const AppRouter = ({authenticated}) => {
   return (
      <Router>
         <div className="header">
            <Header/>
         </div>
         
         <NavPanel/>

         <Switch>
            <Route path="/maintenance">
               <div>main</div>
            </Route>

            <Route path="/signin">
               {(authenticated)
               ? <Redirect to="/calendar"/>
               : <SignIn/>
               }
            </Route>

            <Route path="/register">
               {(authenticated)
               ? <Redirect to="/calendar"/>
               : <Register/>
               }
            </Route>

            <Route path="/verify">
               {(authenticated)
               ? <Redirect to="/calendar"/>
               : <Verify/>
               }
            </Route>

            <Route path="/profile">
               {(authenticated)
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


export default AppRouter;