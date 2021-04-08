import React from 'react';
import {
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import { Calendar, SignIn, Register, Verify, Search, Profile, ForgotPassword } from './pages/index';
import { Sidebar } from './components/index';
import "react-toastify/dist/ReactToastify.css";
import { connect } from 'react-redux';


const AppRouter = ({auth}) => {
   return (
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
               ?  <Profile/> 
               : <Redirect to="/calendar"/>
            }
         </Route>

         <Route path="/search/:searchterm">
            <Sidebar/>
            <Search/>
         </Route>

         <Route path="/calendar/:month/:year">
            <Sidebar/>
            <Calendar/>
         </Route>

         <Route path="/calendar">
            <Sidebar/>
            <Calendar/> 
         </Route>

         <Route exact path="/">
            <Redirect to="/calendar"/>
         </Route>
      </Switch>
   );
}

const mapStateToProps = (state) => ({auth:state.authenticate});
export default connect(mapStateToProps)(AppRouter);