import React, {useState} from 'react';
import styled from "styled-components";
import { selectDate,signOut,clearEntries,searchEntries,getInitialDate } from '../redux/actions/index';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom'
import Select from 'react-select';
import { toast } from "react-toastify";
import {mindMattersLogo, leftIconDarkMode, rightIconDarkMode} from "../assets/index.js";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import {search} from '../assets/index';

const Wrapper = styled.div`
   width:100%;
   height:50px;
   display:flex;
   flex-direction:row;
   flex-wrap:nowrap;
   background: ${({ theme }) => theme.backgroundContrast};
   box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
   & .logoContainer {
      width:20%;
      max-width: 205px;
      min-width:205px;
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
      background-color:${({ theme }) => theme.warm};
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
      height:40px;
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
`







const Header = ({
      clearEntries,
      auth, 
      selectDate, 
      selectedDate, 
      signOut,
   }) => {
   const [searchField, setSearchField] = useState('title');
   const [searchTerm, setSearchTerm] = useState(false);
   const location = useLocation();
   const printDate = new Date(selectedDate.year, selectedDate.month - 1);
   const { register, handleSubmit, watch, errors } = useForm();
   // Increments or deincrements month by 1, creates new date in state.
   const onSubmit = (data) => {
      if(!data.searchField){
         toast.dismiss();
         toast.info('Please enter a search term first.');
      }
      else {
         window.location = `/search/${data.searchField}/${data.searchTerm}`;
      }
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
   }

   const handleSignOut = () => {
      signOut();
   }
   const handleSignIn = () => {
      window.location = '/signin';
   }
   const handleBack = () => {
      window.location = `/calendar`;
   }



   return(
      <Wrapper>
         <Link className="logoContainer" to="/calendar"> 
            <img className="logo" src={mindMattersLogo}/>
         </Link>

         {/* If at calender, render cal month navigation */}
         {(location.pathname === '/calendar')
            ? <NavigationContainer>
               <img className="leftArrow" onClick={()=>changeMonth('decrease')} src={leftIconDarkMode}/>
               <button className="todayButton" onClick={()=>returnToCurrentMonth()}>Today</button>
               <img className="rightArrow" onClick={()=>changeMonth('increase')} src={rightIconDarkMode}/>
               

               <div className="printMonth">
                  {printDate.toLocaleString('default', { month: 'long' })}
               </div>
               <div className="printYear">
                  {selectedDate.year}
               </div>

               
               {(window.location.pathname.includes('search'))
                  ? <button onClick={()=>handleBack()}>Back</button>
                  : <div></div>
               }
            </NavigationContainer>
            : <React.Fragment/>
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
               <select
                  name="searchField" 
                  ref={register}
                  className="searchField"
               >
                  <option value="title">Title</option>
                  <option value="organisation">Organisation</option>
               </select>
               
            </form>
         </SearchContainer>


         <UserContainer>
            {(auth.user.id)
               ? <button className="loginButton" onClick={()=>handleSignOut()}>Sign Out</button>
               : <button className="loginButton" onClick={()=>handleSignIn()}>Sign In</button>
            }
         </UserContainer>
      </Wrapper>
   )
}

const mapStateToProps = (state) => ({ auth:state.authenticate, selectedDate:state.selectedDate.selectedDate });
export default connect(mapStateToProps, { getInitialDate, searchEntries, clearEntries,selectDate,signOut })(Header);