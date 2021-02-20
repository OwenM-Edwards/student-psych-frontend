import React, {useState} from 'react';
import styled from "styled-components";
import { selectDate,signOut,clearEntries,searchEntries,getInitialDate } from '../redux/actions/index';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom'
import Select from 'react-select';
import { toast } from "react-toastify";
import {mindMattersLogo, leftIconDarkMode, rightIconDarkMode} from "../assets/index.js"


const Wrapper = styled.div`
   width:100%;
   height:100%;
   display:flex;
   flex-direction:row;
   flex-wrap:nowrap;
   background: ${({ theme }) => theme.backgroundContrast};
   box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
`
const LogoContainer = styled.div`
   width:20%;
   max-width:202px;
   display:flex;
   flex-direction:row;
   padding:0 0 0 5px;
   height:49px;
   align-self:center;
   align-content:center;
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
      width:50%;
      max-width: 50px;
      height:42px;
      color: #2b2b2b;
      text-transform: uppercase;
      text-decoration: none;
      background: white;
      padding: 5px;
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
   & .printYear{
      
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
   width:40%;
   display:flex;
   flex-direction:row;
   align-items:center;
   justify-content:space-around;
   padding:0 10px 0 10px;
   margin-left:auto;
   & .searchBar{
      width:65%;
      height:42px;
      padding-left:15px;
      border-radius:5px 0 0 5px;
      outline: 0;
      border: 0;
   }
   & .searchButton{
      width:15%;
      height:42px;
      color: #2b2b2b;
      text-transform: uppercase;
      text-decoration: none;
      background: white;
      padding: 5px;
      border-radius: 0 5px 5px 0;
      display: inline-block;
      border: none;
      border-left:1px solid black;
      transition: all 0.4s ease 0s;
      cursor:pointer;
      margin-right:5px;
   }
   & .searchType{
      width:20%;
   }
`
const UserContainer = styled.div`
   height:100%;
   width:120px;
   display:flex;
   flex-direction:row;
   align-items:center;
   padding:0 10px 0 10px;
   & .loginButton{
      width:100%;
      height:40px;
      color: #2b2b2b;
      text-transform: uppercase;
      text-decoration: none;
      background: white;
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
   console.log()
   // Increments or deincrements month by 1, creates new date in state.

   const searchTypes = [
      { value: 'title', label: 'Title'},
      { value: 'organisation', label: 'Organisation'},
   ];
   const customStyles = {
      control: base => ({
         ...base,
         height: 41,
         minHeight: 35
      })
   };



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
   const handleSearchBar = (e) => {
      setSearchTerm(e.target.value);
   }
   const handleType = (e) => {
      setSearchField(e.value);
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
   const handleSearch = () => {
      if(!searchTerm){
         toast.dismiss();
         toast.info('Please enter a search term first.');
      }
      else {
         window.location = `/search/${searchField}/${searchTerm}`;
      }
   }
   const handleBack = () => {
      window.location = `/calender`;
   }



   return(
      <Wrapper>
         <LogoContainer>
            <img src={mindMattersLogo}/>
         </LogoContainer>

         {/* If at calender, render cal month navigation */}
         {(location.pathname === '/calender')
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
            <input
               className="searchBar"
               placeholder="Search events.."
               type="text" 
               name="search-bar"
               onChange={handleSearchBar}
            />
            <button className="searchButton" onClick={()=>handleSearch()}>Search</button>
            <Select
               className="searchType"
               defaultValue={searchTypes[0]}
               options={searchTypes}
               isSearchable={false}
               onChange={handleType}
               styles={customStyles}
            />
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