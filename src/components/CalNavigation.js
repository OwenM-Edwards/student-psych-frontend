import React from 'react';
import { leftIconDarkMode, rightIconDarkMode } from "../assets/index.js";
import styled from "styled-components";
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { selectDate, clearEntries } from '../redux/actions/index';

const NavigationContainer = styled.div`
   height:100%;
   width:auto;
   display:flex;
   flex-direction:row;
   align-items:center;
   padding:0 10px 0 10px;
   margin-right:auto;

   @media (max-width: 900px) {
      padding:0;
      font-size:0.7rem;
      margin-right:15px;
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
      -webkit-user-select: none; /* Safari */        
      -moz-user-select: none; /* Firefox */
      -ms-user-select: none; /* IE10+/Edge */
      user-select: none; /* Standard */
   }

   & .printYear {
      -webkit-user-select: none; /* Safari */        
      -moz-user-select: none; /* Firefox */
      -ms-user-select: none; /* IE10+/Edge */
      user-select: none; /* Standard */
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

const CalNavigation = ({selectedDate,clearEntries,selectDate}) => {
   const history = useHistory();
   const printDate = new Date(selectedDate.year, selectedDate.month - 1);

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
      history.push(`/calendar/${changedDate.getMonth()}/${changedDate.getFullYear()}`);
   }

   return (
      <NavigationContainer>
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
   )
}


const mapStateToProps = (state) => ({ navPanelState:state.navPanel.show, auth:state.authenticate, selectedDate:state.selectedDate.selectedDate });
export default connect(mapStateToProps, { clearEntries,selectDate })(CalNavigation);