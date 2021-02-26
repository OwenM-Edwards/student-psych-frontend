import React, {useEffect} from 'react';
import styled, { ThemeProvider } from "styled-components";
import Loader from 'react-loader-spinner';
import {toggleNavPanel, signOut} from '../redux/actions/index';
import { connect } from 'react-redux';
import { closeArrow } from '../assets/index';
import { Link } from "react-router-dom";



const Wrapper = styled.div`
   width:${props => props.theme.width};
   height:160px;
   position: absolute;
   top:0;
   right:0;
   display:flex;
   align-content:center;
   justify-content:center;
   transition: all 0.2s ease-in-out;
   background-color:yellow;
   overflow:hidden;
   background: ${({ theme }) => theme.background};
   box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
   display:flex;
   flex-direction:column;
   z-index:5;
   padding:${props => props.theme.padding};;

   & .button{      
      width:100%;
      height:40px;
      color: #2b2b2b;
      text-transform: uppercase;
      text-decoration: none;
      background-color:${({ theme }) => theme.offwhite};
      padding: 5px;
      border-radius:5px;
      display: inline-block;
      border: none;
      transition: all 0.4s ease 0s;
      cursor:pointer;
      margin-right:2px;
      margin-top:auto;
      margin-bottom:5px;
   }
   & .closeArrowButton{
      width:50px;
      opacity:0.8;
      cursor:pointer;
      justify-self:flex-start;
      position: relative;
      right:15px;
   }
`

const shown = {
   width: "140px",
   padding:'5px',
}
const hidden = {
   width: "0",
   padding:'0px',
}


const NavPanel = ({toggleNavPanel, navPanelState, signOut}) => {

   useEffect(() => {
   }, [navPanelState]);
   const handleSignOut = () => {
      toggleNavPanel(false);
      signOut();
   }
   const handleProfile = () => {
      window.location = `/profile`;
   }
   return (
      <ThemeProvider theme={navPanelState ? shown : hidden}>
         <Wrapper>
            <img className="closeArrowButton" onClick={()=>toggleNavPanel(false)} src={closeArrow}></img>
            <button className="button" onClick={()=>handleSignOut()}>Sign Out</button>
            <Link to="/profile"><button className="button" onClick={()=>handleProfile()}>Profile</button></Link>
         </Wrapper>
      </ThemeProvider>


   )
   
}


const mapStateToProps = (state) => ({ navPanelState:state.navPanel.show });
export default connect(mapStateToProps, {toggleNavPanel, signOut})(NavPanel);