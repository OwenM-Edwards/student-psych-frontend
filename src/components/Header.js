import React from 'react';
import styled from "styled-components";
import { selectDate,signOut } from '../redux/actions/index';
import { connect } from 'react-redux';
import { Link, useLocation } from 'react-router-dom'

const Wrapper = styled.div`
   width:100%;
   height:100%;
   display:flex;
   flex-direction:row;
   flex-wrap:wrap;
   background-color:pink;
`

const Header = ({userinfo, selectDate, selectedDate, signOut}) => {
   const location = useLocation();
   // Increments or deincrements month by 1, creates new date in state.

   const returnToCurrentMonth = () => {
      let currentDate = new Date();
      selectDate({
         day: currentDate.getDate(),
         month: currentDate.getMonth() + 1, 
         year: currentDate.getFullYear(),
         totalDaysInMonth: new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate(),
      })
   }

   const changeMonth = (val) => {
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


   return(
      <Wrapper>
         Student Psychiatry Events
         {(userinfo.id)
            ? <button onClick={()=>handleSignOut()}>Sign Out</button>
            : <Link to="/signin"><button>Sign In</button></Link>
            
         }
         <button onClick={()=>returnToCurrentMonth()}>Today</button>
         

         {/* If at calender, render cal month navigation */}
         {(location.pathname === '/')
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

const mapStateToProps = (state) => ({ userinfo:state.authenticate, selectedDate:state.selectedDate.selectedDate });
export default connect(mapStateToProps, { selectDate,signOut })(Header);