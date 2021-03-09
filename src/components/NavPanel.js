import React, {useEffect} from 'react';
import styled, { ThemeProvider } from "styled-components";
import Loader from 'react-loader-spinner';
import {toggleNavPanel, signOut} from '../redux/actions/index';
import { connect } from 'react-redux';
import { leftIconDarkMode, } from '../assets/index';
import { Link } from "react-router-dom";



const Wrapper = styled.div`
   width:120px;
   height:${props => props.theme.height};
   position: absolute;
   top:70px;
   right:23px;
   display:flex;
   align-items:center;
   align-content:center;
   justify-content:center;
   transition: height 0.2s ease-in-out;
   background-color:yellow;
   overflow:hidden;
   background: #1f2933;
   box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
   display:flex;
   flex-direction:column;
   @media (max-width: 900px) {
      display:none;
   }
   & .link {
      width:90%;
      align-self:center;
      margin-bottom:5px;
   }
   & .button{      
      width:70%;
      height:30px;
      align-self:center;
      color: #2b2b2b;
      text-transform: uppercase;
      text-decoration: none;
      background-color:${({ theme }) => theme.primary.offWhite};
      padding: 5px;
      border-radius:5px;
      display: inline-block;
      border: none;
      transition: all 0.4s ease 0s;
      cursor:pointer;
      margin-top:auto;
      margin-bottom:5px;
      &:hover {
         background-color:${({ theme }) => theme.primary.light};
      }
   }
   & .signOut{
      width:90%;
   }
   & .profile{
      width:100%;
   }
`

const shown = {
   height: "120px",
   padding: "10px",
}
const hidden = {
   height: "0%",
   padding: "10px",
}


const NavPanel = ({toggleNavPanel, navPanelState, signOut}) => {

   const handleSignOut = () => {
      toggleNavPanel(false);
      signOut();
   }
   return (
      <ThemeProvider theme={navPanelState ? shown : hidden}>
         <Wrapper>
            <button className="signOut button" onClick={()=>handleSignOut()}>Sign Out</button>
            <Link className="link" to="/profile"><button onClick={()=>toggleNavPanel(false)} className="profile button" >Profile</button></Link>
         </Wrapper>
      </ThemeProvider>
   )   
}


const mapStateToProps = (state) => ({ navPanelState:state.navPanel.show });
export default connect(mapStateToProps, {toggleNavPanel, signOut})(NavPanel);