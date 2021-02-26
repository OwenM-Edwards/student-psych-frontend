import React from 'react';
import styled from "styled-components";
import { connect } from 'react-redux';
import {EventTag} from './index';
import {modalHandler} from '../redux/actions/index';



const CalenderSquare = ({ 
      entries, 
      calSquareDay,
      selectedDate,
      openAddEventModal,
      openViewEventModal,
      type,
      modalHandler,
   }) => {
   // Checks if calenderSquare day is a weekend.
   let weekendCheck = new Date(selectedDate.year, selectedDate.month - 1, calSquareDay);
   let currentDate = new Date();
   let eventTags = [];


   // Gets current entries in state, finds ones that match current date of calender square.
   const sortEntries = () => {
      let count = 1;
      if(entries){
         entries.forEach(entry => {
            if(entry.day === calSquareDay){
               eventTags.push(
                  <EventTag key={count} openViewEventModal={openViewEventModal} eventInfo={entry}/>
               )
               count++;
            }
         })  
      }
   }
   sortEntries();



   const handleShowMore = (e) => {
      e.stopPropagation();
      modalHandler(
         {
            modalDisplay:'overflow', 
            modalInfo: {
               xValue: e.pageX, yValue: e.pageY,
               eventList: eventTags,
               modalDay:calSquareDay,
            },
         }
      );
   }



   // Preceding day
   if(type==='preceding'){
      return(
         <Wrapper className="precedingDay" id={calSquareDay}>
         </Wrapper>
      )
   }
   // Selected day
   else if(currentDate.getMonth() + 1 === selectedDate.month && calSquareDay == selectedDate.day){
      return(
         <Wrapper className="currentDay" id={calSquareDay} onClick={openAddEventModal}>
            <p className="day">{calSquareDay}</p>
            {eventTags}
         </Wrapper>
      )
   }
   // Weekend
   else if(weekendCheck.getDay() === 6 || weekendCheck.getDay() === 0){
      return(
         <Wrapper className="weekendDay" id={calSquareDay} onClick={openAddEventModal}>
            <p className="day">{calSquareDay}</p>
            {eventTags}
         </Wrapper>
      )
   }
   // Normal day
   else{
      return(
         <Wrapper className="weekDay" id={calSquareDay} onClick={openAddEventModal}>
            <p className="day">{calSquareDay}</p>
            <EventTagsContainer>
               {eventTags}
            </EventTagsContainer>

            {(eventTags.length > 2)
               ? <button className="showMoreButton" onClick={handleShowMore}>View All ({eventTags.length})</button>
               : <React.Fragment></React.Fragment>
            }
         </Wrapper>
      )
   }
}


const mapStateToProps = (state) => ({ selectedDate:state.selectedDate.selectedDate, entries:state.entries.entries });
export default connect(mapStateToProps, {modalHandler})(CalenderSquare);













const EventTagsContainer = styled.div`

   max-height:100%;
   text-align:center;

   border-radius:3px;
   overflow:hidden;
`


const Wrapper = styled.div`
   height:100%;
   max-height:100%;
   text-align:center;
   border-radius:3px;
   transition: all 0.1s ease-in-out;
   display:flex;
   flex-direction:column;
   /* overflow:hidden; */
   &:hover {
      /* scale:1.03; */
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
   & .showMoreButton{
      z-index:9;
      width:auto;
      height:42px;
      color: #2b2b2b;
      text-transform: uppercase;
      text-decoration: none;
      background-color:${({ theme }) => theme.offwhite};
      padding: 5px 10px 5px 10px;
      border-radius:5px;
      display: inline-block;
      border: none;
      transition: all 0.2s ease 0s;
      cursor:pointer;
      font-size:0.8rem;
   }
`
