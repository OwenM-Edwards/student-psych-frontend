import React, {useState} from 'react';
import styled from "styled-components";
import { selectDate,signOut,clearEntries,searchEntries } from '../redux/actions/index';
import { connect } from 'react-redux';
import { Link, useLocation } from 'react-router-dom'
import Select from 'react-select';
import { toast } from "react-toastify";

const Wrapper = styled.div`
   width:100%;
   height:100%;
   display:flex;
   flex-direction:row;
   flex-wrap:wrap;
   background-color:pink;
`

const Header = ({clearEntries,auth, selectDate, selectedDate, signOut,searchEntries}) => {
   const [searchField, setSearchField] = useState('title');
   const [searchTerm, setSearchTerm] = useState(false);
   const location = useLocation();
   // Increments or deincrements month by 1, creates new date in state.

   const searchTypes = [
      { value: 'title', label: 'Title'},
      { value: 'organisation', label: 'Organisation'},
   ];

   const returnToCurrentMonth = () => {
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
         Student Psychiatry Events
         {(auth.user.id)
            ? <button onClick={()=>handleSignOut()}>Sign Out</button>
            : <Link to="/signin"><button>Sign In</button></Link>
            
         }
         <button onClick={()=>returnToCurrentMonth()}>Today</button>
         <button onClick={()=>handleSearch()}>Search</button>
         <input
            placeholder="SearchBar"
            type="text" 
            name="search-bar"
            onChange={handleSearchBar}
         />
         <Select
            defaultValue={searchTypes[0]}
            options={searchTypes}
            isSearchable={false}
            onChange={handleType}
         />
         {(window.location.pathname.includes('search'))
            ? <button onClick={()=>handleBack()}>Back</button>
            : <div></div>
         }
         

         {/* If at calender, render cal month navigation */}
         {(location.pathname === '/calender')
            ? <div>
               <button onClick={()=>changeMonth('decrease')}>back</button>
               Day:{selectedDate.day}
               Month:{selectedDate.month}
               Year:{selectedDate.year}
               <button onClick={()=>changeMonth('increase')}>forward</button>
            </div>
            : <React.Fragment/>
         }
      </Wrapper>
   )
}

const mapStateToProps = (state) => ({ auth:state.authenticate, selectedDate:state.selectedDate.selectedDate });
export default connect(mapStateToProps, { searchEntries, clearEntries,selectDate,signOut })(Header);