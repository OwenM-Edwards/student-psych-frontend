import React, {useEffect} from 'react';
import styled, { ThemeProvider } from "styled-components";
import Loader from 'react-loader-spinner';
import {toggleNavPanel, signOut} from '../redux/actions/index';
import { connect } from 'react-redux';
import { closeArrow } from '../assets/index';




const Wrapper = styled.div`
   width:${props => props.theme.width};
   height:100%;
   position: absolute;
   height:100%;
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
   }
   & .closeArrowButton{
      width:40px;
      opacity:0.8;
      cursor:pointer;
   }
`

const shown = {
   width: "300px",
   transform: "translate(-200px)",
}
const hidden = {
   width: "0",
   transform: "translate(200px)",
}


const NavPanel = ({toggleNavPanel, navPanelState, signOut}) => {

   useEffect(() => {
   }, [navPanelState]);
   const handleSignOut = () => {
      toggleNavPanel(false);
      signOut();
   }
   return (
      <ThemeProvider theme={navPanelState ? shown : hidden}>
         <Wrapper>
            <img className="closeArrowButton" onClick={()=>toggleNavPanel(false)} src={closeArrow}></img>
            <button className="button" onClick={()=>handleSignOut()}>Sign Out</button>
            <button className="button" onClick={()=>handleSignOut()}>Manage Profile</button>
         </Wrapper>
      </ThemeProvider>


   )
   
}


const mapStateToProps = (state) => ({ navPanelState:state.navPanel.show });
export default connect(mapStateToProps, {toggleNavPanel, signOut})(NavPanel);