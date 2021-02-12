import React, {useState, useEffect} from 'react';
import styled from "styled-components";
import { connect } from 'react-redux';
import {EventTag} from './index';

const Wrapper = styled.div`
   width:100%;
   height:100%;
   text-align:center;
   &:hover {
      border: 1px solid #2b2b2b;
   }
`
const StyledDayHeader = styled.h1`
   font-size:1rem;
`

const CalenderSquare = ({ 
      setModalToggle,
      setModModalToggle,
      setModalInfo, 
      entries, 
      calSquareDay,
      selectedDate,
   }) => {
   const [isFetching, setIsFetching] = useState(false);
   let dayHeader = "";
   let eventInfo = false;
   let dayStrings = ["", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
   let calenderSquareProps = {
      backgroundColor:'',
   }
   // Checks if calenderSquare day is a weekend.
   let weekendCheck = new Date();
   weekendCheck.setDate(calSquareDay);


   // Gets current entries in state, finds ones that match current date of calender square.
   const sortEntries = () => {
      if(entries){
         entries.forEach(entry => {
            if(entry.day === calSquareDay){
               eventInfo = entry;
            }
         })
      }
   }
   sortEntries();
   
   const handleTagClick = (e) => {
      e.stopPropagation();
      if(eventInfo){
         setModalInfo({
            eventInfo,
         }) 
      }
      else {
         console.log('test')
      }
      setModModalToggle(false);
      setModalToggle(true);

   }
   const handleBoxClick = (e) => {
      e.stopPropagation();
      setModalInfo({
         eventInfo:{
            day:calSquareDay,
            month:selectedDate.month,
            year:selectedDate.year,
         }
      })  
      setModalToggle(false);
      setModModalToggle(true);
   }


   // If one of the first 7 days, add day string header.
   if(calSquareDay < 8){
      dayHeader = dayStrings[calSquareDay];
   }
   // If box = outside total days in month
   if( calSquareDay > selectedDate.totalDaysInMonth){
      calenderSquareProps.backgroundColor = 'violet';
   }
   // If box = current day
   else if(calSquareDay == selectedDate.day){
      calenderSquareProps.backgroundColor = 'pink';
   }
   // If box = A weekend
   else if(weekendCheck.getDay() === 6 || weekendCheck.getDay() === 0 ){
      calenderSquareProps.backgroundColor = 'purple';
   }
   else {
      calenderSquareProps.backgroundColor = 'orange';
   }


   return(
      <Wrapper onClick={handleBoxClick} style={{backgroundColor: calenderSquareProps.backgroundColor}}>
         <StyledDayHeader>
            {dayHeader}
         </StyledDayHeader>

         {calSquareDay}

         {(eventInfo)
            ? <EventTag handleTagClick={handleTagClick} eventInfo={eventInfo}/>
            : <div></div>
         }
      </Wrapper>
   )



   
}


const mapStateToProps = (state) => ({ selectedDate:state.selectedDate.selectedDate, entries:state.entries.entries });
export default connect(mapStateToProps)(CalenderSquare);
