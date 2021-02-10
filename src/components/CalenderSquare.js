import React from 'react';
import styled from "styled-components";
import { connect } from 'react-redux';


const Wrapper = styled.div`
   width:100%;
   height:100%;
`
const StyledWeekDay = styled.div`
   width:100%;
   height:100%;
   background-color:orange;
      
   text-align:center;
`
const StyledCurrentDay = styled.div`
   width:100%;
   height:100%;
   background-color:violet;
      
   text-align:center;
`
const StyledWeekendDay = styled.div`
   width:100%;
   height:100%;
   background-color:purple;
      
   text-align:center;
`

const StyledOverflowDay = styled.div`
   width:100%;
   height:100%;
   background-color:pink;
      
   text-align:center;
`

const CalenderSquare = ({ entries, totalDaysInMonth, currentDay, currentMonth, currentYear, boxDay  }) => {
   let dayHeader = "";
   let eventInfo = "";
   let dayStrings = ["", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
   const currentDate = new Date();
   currentDate.setDate(boxDay);
   let eventEntries = entries.entries.data;

   const sortEntries = () => {
      eventEntries.forEach(el => {
         if(el.day === boxDay){
            eventInfo = el.description;
         }
      })
   }
   sortEntries();
   // If one of the first 7 days, add day string header.
   if(boxDay < 8){
      dayHeader = dayStrings[boxDay];
   }
   // If box = outside total days in month
   if( boxDay > totalDaysInMonth){
      return(
         <StyledOverflowDay>
            {boxDay}
            {eventInfo}
         </StyledOverflowDay>
      )
   }
   // If box = current day
   if(boxDay == currentDay){
      return(
         <StyledCurrentDay>
            <h1>
               {dayHeader}
            </h1>
            {boxDay}
            {eventInfo}
         </StyledCurrentDay>
      )
   }
   // If box = A weekend
   if(currentDate.getDay() === 6 || currentDate.getDay() === 0 ){
      return(
         <StyledWeekendDay>
            <h1>
               {dayHeader}
            </h1>
            {boxDay}
            {eventInfo}
         </StyledWeekendDay>
      )
   }
   else {
      return(
         <StyledWeekDay>
            <h1>
               {dayHeader}
            </h1>
            {boxDay}
            {eventInfo}
         </StyledWeekDay>
      )
   }
}


const mapStateToProps = (state) => ({ entries:state.entries });

export default connect(mapStateToProps)(CalenderSquare);
