import React from 'react';
import styled, { ThemeProvider } from "styled-components";
import Loader from 'react-loader-spinner';
import { connect } from 'react-redux';
import {toggleMobileMenu} from '../redux/actions/index';
import HamburgerMenu from 'react-hamburger-menu';

const Wrapper = styled.div`
   width:100%;
   height:100%;
   display:flex;
   align-content:center;
   justify-content:center;
   flex-direction:column;
   z-index:5;
   cursor: pointer;
   & span {
      background-color:${props => props.theme.background};
      border-radius: 3px;
      display: block;
      height: 4px;
      margin-bottom: 5px;
      position: relative;
      transform-origin: 4px 0px;
      width: 33px;
      z-index: 1;
      transition: 
         background-color 0.3s cubic-bezier(0.77,0.2,0.05,1.0),
         width 0.8s;
      &:nth-of-type(2){
         transition-delay: 0.2s;
      }
      &:nth-of-type(3){
         transition-delay: 0.4s;
      }
   }
`

const clicked = {
   background: "#0bcc8b",
}
const notClicked = {
   background: "#f3f3f3",
}


const MobileMenuIcon = ({toggleMobileMenu, mobileMenuState}) => {
   
   const handleMobileMenuToggle = () => {
      if(mobileMenuState){
         toggleMobileMenu(false)
      }
      else {
         toggleMobileMenu(true)
      }
   }

   return(
      <ThemeProvider theme={mobileMenuState ? clicked : notClicked}>
         <Wrapper onClick={()=>handleMobileMenuToggle()}>
            <span className="closed-span"></span>
            <span className="closed-span"></span>
            <span className="closed-span"></span>
         </Wrapper>
      </ThemeProvider>
   )
}


const mapStateToProps = (state) => ({ mobileMenuState:state.mobileMenuToggle.shown });
export default connect(mapStateToProps,{toggleMobileMenu})(MobileMenuIcon);