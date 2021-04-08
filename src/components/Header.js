import React, {useEffect} from 'react';
import styled, { ThemeProvider } from "styled-components";
import { selectDate,clearEntries,searchEntries,getInitialDate,toggleNavPanel } from '../redux/actions/index';
import { connect } from 'react-redux';
import { search, profile, leftIconDarkMode, logo } from "../assets/index.js";
import { NavPanel, MobileMenu } from './index';
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useHistory } from 'react-router-dom';
import { MobileMenuIcon} from './index';
import { useLocation } from 'react-router-dom'
import { CalNavigation } from './index';

const Wrapper = styled.div`
   width:100%;
   height:100%;
   display:flex;
   flex-direction:row;
   flex-wrap:nowrap;
   background-color:${({ theme }) => theme.primary.main};
   color: ${({ theme }) => theme.primary.contrastText};
   box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
   padding:10px 0 10px 0;
   z-index: 10;
   justify-content:space-between;
`

const LogoContainer = styled.div`
   max-width: 180px;
   display:flex;
   flex-direction:row;
   padding:0 0 0 5px;
   height:auto;
   max-height:130%;
   align-self:center;
   align-content:center;
   z-index:3;
   position: relative;
   top:0px;
   right:5px;
   
   @media (max-width: 900px) {
      margin-right:auto;
   }
   & .logo {
      width:90%;
      height:100%;
      cursor:pointer;
   }
`


const SearchContainer = styled.div`
   height:100%;
   width:40%;
   max-width:330px ;
   margin-left:auto;
   display:flex;
   overflow:hidden;
   @media (max-width: 900px) {
      display:none;
   }
   
   & .icon {
      display:inline;
      width:100%;
      max-width: 100%;
      max-height:100%;
      object-fit: contain;
   }
   & .searchForm {
      width:100%;
      align-self:center;
      display:flex;
      flex-direction:row;
      flex-wrap:nowrap;
      justify-content:center;
   }
   & .searchButton{
      width:14%;
      max-width:50px ;
      height:42px;
      color: ${({ theme }) => theme.primary.offBlack};
      text-transform: uppercase;
      text-decoration: none;
      background-color:${({ theme }) => theme.primary.offWhite};
      padding-top:2px;
      border-radius: 0 5px 5px 0;
      display: inline-block;
      border: none;
      border-left:1px solid black;
      transition: all 0.4s ease 0s;
      cursor:pointer;
      margin-right:5px;
      align-self:center;
   }
   & .searchTerm {
      width:70%;
      max-width:300px ;
      height:42px;
      padding-left:15px;
      border-radius:5px 0 0 5px;
      outline: 0;
      border: 0;
      background-color:${({ theme }) => theme.primary.offWhite};
      
   }
`

const UserContainer = styled.div`
   height:100%;
   width:80px;
   display:flex;
   flex-direction:column;
   align-items:center;
   padding:0 10px 0 10px;
   margin-right:45px;
   
   @media (max-width: 900px) {
      padding:5px 0px 0px 0px;
      margin-right:0;
      width:0;
      display:none;
   }
   & .loginButtonContainer {
      align-self:center;
      justify-self:center;
      height:100%;
      width:100%;
      display:flex;
      align-items:center;
      text-decoration: none;
      /* box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23); */
      color:${({ theme }) => theme.primary.offBlack};
   }
   & .loginButton{
      width:100%;
      height:80%;
      color: ${({ theme }) => theme.primary.offBlack};
      text-transform: uppercase;
      text-decoration: none;
      background-color:${({ theme }) => theme.primary.offWhite};
      padding: 5px;
      border-radius:10px;
      border: none;
      transition: all 0.4s ease 0s;
      cursor: pointer;
      &:hover {
         background-color:${({ theme }) => theme.primary.light};
      }
   }
   & .profileButton {
      width:45px;
      opacity:0.8;
      cursor: pointer;
      @media (max-width: 900px) {
         width:30px;
      }
   }
   & .closeArrowButton {
      position: relative;
      bottom:15px;
      width:40px;
      transition: all 0.2s ease-in-out;
      cursor: pointer;
      transform: ${props => props.theme.transform};
   }
`

const MobileMenuIconContainer = styled.div`
   width:auto;
   display:none;
   margin:0 5px 0 5px;
   @media (max-width: 900px) {
      display:block;
      margin:0 5px 0 10px;
   }
`


const shown = {
   transform: "rotate(90deg)",
}
const hidden = {
   transform: "rotate(-90deg)",
}



const Header = ({
      clearEntries,
      auth, 
      selectDate, 
      toggleNavPanel,
      navPanelState,
   }) => {
   const location = useLocation();

   const { register, handleSubmit } = useForm();
   // Increments or deincrements month by 1, creates new date in state.
   const history = useHistory();
   
   const onSubmit = (data) => {
      history.push(`/search/${data.searchTerm}`);
   }
   
   useEffect(()=>{ 
   },[auth.authenticated]);
   useEffect(()=>{
   },[location]);

   const returnToCurrentMonth = () => {
      clearEntries();
      let currentDate = new Date();
      selectDate({
         day: currentDate.getDate(),
         month: currentDate.getMonth() + 1, 
         year: currentDate.getFullYear(),
         totalDaysInMonth: new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate(),
      })
      history.push(`/calendar/${currentDate.getMonth()+1}/${currentDate.getFullYear()}`);
   }

   const handleNavPanel = () => {
      if(auth.authenticated){
         if(navPanelState){
            toggleNavPanel(false)
         }
         else {
            toggleNavPanel(true)
         }
      }
   }

   return(
      <ThemeProvider theme={navPanelState ? shown : hidden}>
         <Wrapper>
            <MobileMenu/>
            <NavPanel/>
            
            <MobileMenuIconContainer>
               <MobileMenuIcon/>
            </MobileMenuIconContainer>

            <LogoContainer onClick={()=>returnToCurrentMonth()}> 
               <img className="logo" src={logo}/>
            </LogoContainer>


            {/* If at search, dont render navigation arrows. */}
            {(window.location.pathname.includes('calendar'))
               ? <CalNavigation/>
               
               :  <React.Fragment/> 
            }
               
            <SearchContainer>
               <form className="searchForm" onSubmit={handleSubmit(onSubmit)}>
                  <input
                     className="searchTerm"
                     placeholder="Search events.."
                     type="text" 
                     name="searchTerm"
                     ref={register({ required:true})}
                  />
                  <button id="searchButton" value="search" className="searchButton" type="submit"><img className="icon"src={search}/></button>
               </form>
            </SearchContainer>



            <UserContainer onClick={()=>handleNavPanel()} >
               {(auth.authenticated)
                  ? <img className="profileButton" src={profile}></img>
                  : <Link className="loginButtonContainer" to="/signin"><button className="loginButton">Sign In</button></Link>
               }
               {(auth.authenticated)
                  ? <img className="closeArrowButton" src={leftIconDarkMode}></img>
                  : <React.Fragment/>
               }
               
            </UserContainer>
         </Wrapper>
      </ThemeProvider>
   )
}

const mapStateToProps = (state) => ({ navPanelState:state.navPanel.show, auth:state.authenticate, selectedDate:state.selectedDate.selectedDate });
export default connect(mapStateToProps, { toggleNavPanel, getInitialDate, searchEntries, clearEntries,selectDate })(Header);

