import React, {useState, useEffect} from 'react';
import styled from "styled-components";
import { selectDate,signOut,clearEntries,searchEntries,getInitialDate,toggleNavPanel } from '../redux/actions/index';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom'
import Select from 'react-select';
import { toast } from "react-toastify";
import { mindMattersLogo, leftIconDarkMode, rightIconDarkMode } from "../assets/index.js";
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
   background: ${({ theme }) => theme.backgroundContrast};
   box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
   padding:10px 0 10px 0;
   & .logoContainer {
      width:190px;
      max-width: 190px;
      display:flex;
      flex-direction:row;
      padding:0 0 0 5px;
      height:auto;
      align-self:center;
      align-content:center;
      z-index:3;
      position: relative;
      top:20px;
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
   display:flex;
   flex-direction:row;
   align-items:center;
   justify-content:space-around;
   padding:0 10px 0 10px;
   margin-right:auto;
   & .todayButton {
      width:auto;
      height:42px;
      color: #2b2b2b;
      text-transform: uppercase;
      text-decoration: none;
      background-color:${({ theme }) => theme.offwhite};
      padding: 5px 10px 5px 10px;
      border-radius:5px;
      display: inline-block;
      border: none;
      transition: all 0.2s ease 0s;
      cursor:pointer;
      &:hover {
         scale:0.9;
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
   }
   & .rightArrow{
      height:100%;
      cursor: pointer;
      &:hover {
         scale:0.9;
      }
   }
`
const SearchContainer = styled.div`
   height:100%;
   width:20%;
   margin-left:auto;
   display:flex;
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
      height:42px;
      color: #2b2b2b;
      text-transform: uppercase;
      text-decoration: none;
      background-color:${({ theme }) => theme.offwhite};
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
      background-color:${({ theme }) => theme.offwhite};

   }
   & .searchTerm {
      width:70%;
      height:42px;
      padding-left:15px;
      border-radius:5px 0 0 5px;
      outline: 0;
      border: 0;
      background-color:${({ theme }) => theme.offwhite};
   }
`
const UserContainer = styled.div`
   height:100%;
   width:120px;
   display:flex;
   flex-direction:row;
   align-items:center;
   padding:0 10px 0 10px;
   margin-right:45px;
   justify-content:flex-end;
   & .loginButton{
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
   & .profileButton {
      width:45px;
      cursor:pointer;
      opacity:0.8;
   }
`







const Header = ({
      clearEntries,
      auth, 
      selectDate, 
      selectedDate, 
      signOut,
      toggleNavPanel,
   }) => {
   const [searchField, setSearchField] = useState('title');
   const [searchTerm, setSearchTerm] = useState(false);
   const location = useLocation();
   const printDate = new Date(selectedDate.year, selectedDate.month - 1);
   const { register, handleSubmit, watch, errors } = useForm();
   // Increments or deincrements month by 1, creates new date in state.
   const history = useHistory();
   const onSubmit = (data) => {
      window.location = `/search/${data.searchTerm}`;
   }


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
      window.location = '/signin';
   }
   const handleBack = () => {
      window.location = `/calendar`;
   }

   return(
      <Wrapper>
         <div onClick={()=>returnToCurrentMonth()}className="logoContainer"> 
            <img className="logo" src={mindMattersLogo}/>
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


         <UserContainer>
            {(auth.authenticated)
               ? <img className="profileButton" onClick={()=>toggleNavPanel(true)} src={profile}></img>
               : <button className="loginButton" onClick={()=>handleSignIn()}>Sign In</button>
            }
         </UserContainer>
      </Wrapper>
   )
}

const mapStateToProps = (state) => ({ auth:state.authenticate, selectedDate:state.selectedDate.selectedDate });
export default connect(mapStateToProps, { toggleNavPanel, getInitialDate, searchEntries, clearEntries,selectDate,signOut })(Header);