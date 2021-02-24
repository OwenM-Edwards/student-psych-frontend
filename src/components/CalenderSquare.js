import React, {useState} from 'react';
import styled from "styled-components";
import { connect } from 'react-redux';
import {EventTag} from './index';

const StyledCalDay = styled.div`
   height:100%;
   max-height:100%;
   text-align:center;
   border-radius:3px;
   transition: all 0.1s ease-in-out;
   &:hover {
      scale:1.03;
      box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
   }
   & .day{
      margin: 0 auto;
      background: ${({ theme }) => theme.backgroundContrast};
      border-radius:0 0 30px 30px;
      width:40px;
      height:26px;
      text-align:center;
      padding:2px 2px 2px 2px;
      margin-bottom:10px;
      box-shadow: 0 10px 20px rgba(0,0,0,0.05), 0 6px 6px rgba(0,0,0,0.05);
   }
   &.precedingDay{
      background: ${({ theme }) => theme.currentDay};
      opacity:0.05;
      &:hover {
         scale:1;
         box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
      }
   }
   &.currentDay{
      background-color:${({ theme }) => theme.backgroundLight};
      opacity:0.7;
   }
   &.weekendDay{
      background: ${({ theme }) => theme.weekendDay};
   }
   &.weekDay{
      background: ${({ theme }) => theme.weekDay};
   }
`


const CalenderSquare = ({ 
      entries, 
      calSquareDay,
      selectedDate,
      openAddEventModal,
      openViewEventModal,
      type,
   }) => {
   let boxType = '';
   // Checks if calenderSquare day is a weekend.
   let weekendCheck = new Date(selectedDate.year, selectedDate.month - 1, calSquareDay);
   let currentDate = new Date();
   let eventTag = [];

   // Gets current entries in state, finds ones that match current date of calender square.
   const sortEntries = () => {
      let count = 1;
      if(entries){
         entries.forEach(entry => {
            if(entry.day === calSquareDay){
               eventTag.push(
                  <EventTag key={count} openViewEventModal={openViewEventModal} eventInfo={entry}/>
               )
               count++;
            }
         })
      }
   }
   sortEntries();

   // Preceding day
   if(type==='preceding'){
      return(
         <StyledCalDay className="precedingDay" id={calSquareDay}>
         </StyledCalDay>
      )
   }
   // Selected day
   else if(currentDate.getMonth() + 1 === selectedDate.month && calSquareDay == selectedDate.day){
      return(
         <StyledCalDay className="currentDay" id={calSquareDay} onClick={openAddEventModal}>
            <p className="day">{calSquareDay}</p>
            {eventTag}
         </StyledCalDay>
      )
   }
   // Weekend
   else if(weekendCheck.getDay() === 6 || weekendCheck.getDay() === 0){
      return(
         <StyledCalDay className="weekendDay" id={calSquareDay} onClick={openAddEventModal}>
            <p className="day">{calSquareDay}</p>
            {eventTag}
         </StyledCalDay>
      )
   }
   // Normal day
   else{
      return(
         <StyledCalDay className="weekDay" id={calSquareDay} onClick={openAddEventModal}>
            <p className="day">{calSquareDay}</p>
            {eventTag}
         </StyledCalDay>
      )
   }
}


const mapStateToProps = (state) => ({ selectedDate:state.selectedDate.selectedDate, entries:state.entries.entries });
export default connect(mapStateToProps)(CalenderSquare);
