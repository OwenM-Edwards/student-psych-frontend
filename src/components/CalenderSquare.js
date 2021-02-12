import React, {useState, useEffect} from 'react';
import styled from "styled-components";
import { connect } from 'react-redux';
import {EventTag} from './index';

const Wrapper = styled.div`
   width:100%;

   height:100%;
   max-height:100%;
   text-align:center;
   &:hover {
      scale:0.99;
   }
`


const CalenderSquare = ({ 
      setModalToggle,
      setaddModalToggle,
      setModalInfo, 
      entries, 
      calSquareDay,
      selectedDate,
      userinfo,
      createToast,
   }) => {
   const [isFetching, setIsFetching] = useState(false);
   const [tagInfo, setTagInfo] = useState(false);
   let dayHeader = "";
   let eventInfo = false;
   let calenderSquareProps = {
      backgroundColor:'',
      opacity:1,
   }
   // Checks if calenderSquare day is a weekend.
   let weekendCheck = new Date(selectedDate.year, selectedDate.month - 1, calSquareDay);
   let currentDate = new Date();
   let eventTag = [];

   const handleTagClick = (eventInfo) => {
      if(eventInfo){
         setModalInfo({
            eventInfo,
         }) 
      }
      else {
         console.log('test')
      }
      setaddModalToggle(false);
      setModalToggle(true);

   }
   const handleBoxClick = (e) => {
      e.stopPropagation();
      if(userinfo.id){
         setModalInfo({
            eventInfo:{
               day:calSquareDay,
               month:selectedDate.month,
               year:selectedDate.year,
            }
         })  
         setModalToggle(false);
         setaddModalToggle(true);
      }
   }
   
   // Gets current entries in state, finds ones that match current date of calender square.
   const sortEntries = () => {
      let count = 1;
      if(entries){
         entries.forEach(entry => {
            if(entry.day === calSquareDay){
               eventTag.push(
                  <EventTag key={count} handleTagClick={handleTagClick} eventInfo={entry}/>
               )
               count++;
            }
         })
      }
   }
   sortEntries();

   // If box = outside total days in month
   if( calSquareDay > selectedDate.totalDaysInMonth){
      calenderSquareProps.backgroundColor = 'violet';
      calenderSquareProps.opacity = 0;
   }
   // If box = current day
   else if(currentDate.getMonth() + 1 === selectedDate.month && calSquareDay == selectedDate.day){
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
      <Wrapper onClick={handleBoxClick} style={{backgroundColor: calenderSquareProps.backgroundColor, opacity:calenderSquareProps.opacity}}>

         {calSquareDay}

         {eventTag}
  
      </Wrapper>
   )



   
}


const mapStateToProps = (state) => ({ userinfo:state.authenticate, selectedDate:state.selectedDate.selectedDate, entries:state.entries.entries });
export default connect(mapStateToProps)(CalenderSquare);
