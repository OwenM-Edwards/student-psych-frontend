import React, {useState, useEffect} from 'react';
import styled, { ThemeProvider } from "styled-components";
import { selectDate,signOut,clearEntries,searchEntries,getInitialDate,toggleNavPanel } from '../redux/actions/index';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom'
import Select from 'react-select';
import { toast } from "react-toastify";
import { mindMattersLogo, leftIconDarkMode, rightIconDarkMode, logo, logoFill } from "../assets/index.js";
import { NavPanel } from './index';
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { search, profile } from '../assets/index';
import { useHistory } from 'react-router-dom';

const Wrapper = styled.div`
   width:100%;
   height:100%;
   display:flex;
   flex-direction:row;
   flex-wrap:nowrap;
   background-color:${({ theme }) => theme.primary.main};
   color: ${({ theme }) => theme.primary.contrastText};
   box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
   padding:10px 0 10px 0;
   z-index:4;
   z-index:5;
   & .logoContainer {
      max-width: 180px;
      display:flex;
      flex-direction:row;
      padding:0 0 0 5px;
      height:auto;
      align-self:center;
      align-content:center;
      z-index:3;
      position: relative;
      top:0px;
      right:5px;
      
   }
   & .logo {
      width:100%;
      object-fit:cover;
      cursor:pointer;
   }
`

const NavigationContainer = styled.div`
   height:100%;
   width:30%;
   max-width:300px ;
   min-width:300px;
   display:flex;
   flex-direction:row;
   align-items:center;
   justify-content:flex-start;
   padding:0 10px 0 10px;
   margin-right:auto;
   @media (max-width: 900px) {
      padding:0;
      width:20%;
      max-width:200px ;
      min-width:200px;
      font-size:0.7rem;
   }
   
   & .todayButton {
      width:auto;
      height:42px;
      color: ${({ theme }) => theme.primary.offBlack};
      text-transform: uppercase;
      text-decoration: none;
      background-color:${({ theme }) => theme.primary.offWhite};
      padding: 5px 10px 5px 10px;
      border-radius:10px;
      display: inline-block;
      border: none;
      transition: all 0.2s ease 0s;
      outline: none;
      cursor:pointer;
      &:hover {
         background-color:${({ theme }) => theme.primary.light};
      }
      @media (max-width: 900px) {
         padding:5px;
         font-size:0.7rem;
         height:32px;
      }
   }
   & .printMonth{
      margin-right:5px;
   }
   & .leftArrow{
      height:100%;
      cursor: pointer;
      &:hover {
         scale:0.9;
      }
      @media (max-width: 900px) {
         height:60%;
      }
   }
   & .rightArrow{
      height:100%;
      cursor: pointer;
      &:hover {
         scale:0.9;
      }
      @media (max-width: 900px) {
         height:60%;
      }
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
      width:0;
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
   & .searchField {
      width:30%;

      height:42px;
      padding: .6em 1.4em .5em .8em;
      box-sizing: border-box;
      margin: 0;
      border: 1px solid #aaa;
      box-shadow: 0 1px 0 1px rgba(0,0,0,.04);
      border-radius: .5em;
      background-color:${({ theme }) => theme.primary.offWhite};

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
   }
   & .loginButtonContainer {
      align-self:center;
      justify-self:center;
      height:100%;
      width:100%;
      display:flex;
      align-items:center;
      text-decoration: none;
      box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
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
      selectedDate, 
      signOut,
      toggleNavPanel,
      navPanelState,
   }) => {
   const [searchField, setSearchField] = useState('title');
   const [searchTerm, setSearchTerm] = useState(false);
   const location = useLocation();
   const printDate = new Date(selectedDate.year, selectedDate.month - 1);
   const { register, handleSubmit, watch, errors } = useForm();
   // Increments or deincrements month by 1, creates new date in state.
   const history = useHistory();
   
   const onSubmit = (data) => {
      history.push(`/search/${data.searchTerm}`);
   }
   useEffect(()=>{
   },[auth.authenticated]);

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

   const changeMonth = (val) => {
      clearEntries();
      let changedDate;
      if(val === 'increase'){
         changedDate = new Date(selectedDate.year, selectedDate.month, selectedDate.day)
      }
      else {
         changedDate = new Date(selectedDate.year, selectedDate.month - 2, selectedDate.day)
      }
      selectDate({
         day: changedDate.getDate(),
         month: changedDate.getMonth() + 1, 
         year: changedDate.getFullYear(),
         totalDaysInMonth: new Date(changedDate.getFullYear(), changedDate.getMonth() + 1, 0).getDate(),
      })
      history.push(`/calendar/${changedDate.getMonth()+1}/${changedDate.getFullYear()}`);
   }

   const handleSignIn = () => {
      history.push('/signin');
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
            <NavPanel/>
            <div onClick={()=>returnToCurrentMonth()}className="logoContainer"> 
               <img className="logo" src={logo}/>
            </div>


            {/* If at search, dont render navigation arrows. */}
            {(window.location.pathname.includes('calendar'))
               ? <NavigationContainer>
                     <img className="leftArrow" onClick={()=>changeMonth('decrease')} src={leftIconDarkMode}/>
                     <button className="todayButton" onClick={()=>returnToCurrentMonth()}>Today</button>
                     <img className="rightArrow" onClick={()=>changeMonth('increase')} src={rightIconDarkMode}/>
                     

                     <div className="printMonth">
                        {printDate.toLocaleString('default', { month: 'long' })}
                     </div>
                     
                     {(window.location.pathname.includes('search'))
                        ? <React.Fragment/>
                        : 
                        <div className="printYear">
                        {selectedDate.year}
                        </div>
                     }
                  </NavigationContainer>
               
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
export default connect(mapStateToProps, { toggleNavPanel, getInitialDate, searchEntries, clearEntries,selectDate,signOut })(Header);

