import React, {useState} from 'react';
import styled from "styled-components";
import { connect } from 'react-redux';
import {EventTag} from './index';

const StyledCalDay = styled.div`
   height:100%;
   max-height:100%;
   text-align:center;
   
   transition: all 0.2s ease-in-out;
   &:hover {
      scale:1.05;
   }
   border-radius:3px;
   &:hover {
      box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
   }
   &.precedingDay{
      background: ${({ theme }) => theme.precedingDay};
      color: ${({ theme }) => theme.contrastText};
   }
   &.currentDay{
      background: ${({ theme }) => theme.currentDay};
      color: ${({ theme }) => theme.contrastText};
   }
   &.weekendDay{
      background: ${({ theme }) => theme.weekendDay};
   }
   &.weekDay{
      background: ${({ theme }) => theme.weekDay};
   }
   &.outsideDay{
      opacity:0;
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


   if(type==='preceding'){
      return(
         <StyledCalDay className="currentDay" id={calSquareDay}>
         </StyledCalDay>
      )
   }
   else if(currentDate.getMonth() + 1 === selectedDate.month && calSquareDay == selectedDate.day){
      return(
         <StyledCalDay className="currentDay" id={calSquareDay} onClick={openAddEventModal}>
            {calSquareDay}
            {eventTag}
         </StyledCalDay>
      )
   }
   else if(weekendCheck.getDay() === 6 || weekendCheck.getDay() === 0){
      return(
         <StyledCalDay className="weekendDay" id={calSquareDay} onClick={openAddEventModal}>
            {calSquareDay}
            {eventTag}
         </StyledCalDay>
      )
   }
   else if(calSquareDay > selectedDate.totalDaysInMonth){
      return(
         <StyledCalDay className="outsideDay" >
         </StyledCalDay>
      )
   }
   else{
      return(
         <StyledCalDay className="weekDay" id={calSquareDay} onClick={openAddEventModal}>
            {calSquareDay}
            {eventTag}
         </StyledCalDay>
      )
   }
}


const mapStateToProps = (state) => ({ selectedDate:state.selectedDate.selectedDate, entries:state.entries.entries });
export default connect(mapStateToProps)(CalenderSquare);
