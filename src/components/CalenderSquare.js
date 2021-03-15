import React from 'react';
import styled from "styled-components";
import { connect } from 'react-redux';
import {EventTag} from './index';
import {modalHandler} from '../redux/actions/index';
import {useWindowDimensions} from '../hooks/index';


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
   const { height, width } = useWindowDimensions();
   console.log(width)


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
               eventList: eventTags,
               modalDay:calSquareDay,
            },
         }
      );
   }


   let boxDayType = '';
   // Preceding day
   if(type==='preceding'){
      return(
         <Wrapper className="precedingDay" id={calSquareDay}>
         </Wrapper>
      )
   }
   else { 
      if( currentDate.getMonth() + 1 === selectedDate.month &&  calSquareDay == currentDate.getDate() &&  currentDate.getFullYear() === selectedDate.year){
         boxDayType = 'currentDay';
      } 
      else if(weekendCheck.getDay() === 6 || weekendCheck.getDay() === 0){
         boxDayType = 'weekendDay';
      }
      else{
         boxDayType = 'weekDay';
      }
      return(
         <Wrapper className={boxDayType} id={calSquareDay} onClick={openAddEventModal}>
            <p className="day">{calSquareDay}</p>
            <EventTagsContainer>
               {eventTags}
            </EventTagsContainer>
            {(eventTags.length >= 3 || (eventTags.length > 0 && width < 500))
               ? <button className="showMoreButton" onClick={handleShowMore}>More ({eventTags.length})</button>
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
   text-align:center;
   border-radius:3px;
   transition: all 0.1s ease-in-out;
   display:flex;
   flex-direction:column;
   overflow:hidden;
   justify-content:flex-start;

   &:hover {
      /* scale:1.03; */
      box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
   }
   & .day{
      margin: 0 auto;
      border-radius:0 0 30px 30px;
      width:40px;
      height:26px;
      text-align:center;
      padding:2px 2px 2px 2px;
      margin-bottom:10px;
      box-shadow: 0 10px 20px rgba(0,0,0,0.05), 0 6px 6px rgba(0,0,0,0.2);
      -webkit-user-select: none; /* Safari */        
      -moz-user-select: none; /* Firefox */
      -ms-user-select: none; /* IE10+/Edge */
      user-select: none; /* Standard */
   }
   &.precedingDay{
      background: ${({ theme }) => theme.primary.currentDay};
      opacity:0.05;
      &:hover {
         scale:1;
         box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
      }
   }
   &.currentDay{
      background-color:${({ theme }) => theme.primary.currentDay};
      color:${({ theme }) => theme.primary.offBlack};
      background-color: #1ddecb;
      
   }
   &.weekendDay{
      background-color:${({ theme }) => theme.primary.weekendDay};
   }
   &.weekDay{
      background-color:${({ theme }) => theme.primary.weekDay};
      
   }
   & .showMoreButton{
      z-index:3;
      width:auto;
      height:25px;
      min-height:25px;
      color: #f3f3f3;
      text-transform: uppercase;
      text-decoration: none;
      background-color:${({ theme }) => theme.primary.main};
      padding: 5px 10px 5px 10px;
      border-radius:5px;
      display: inline-block;
      border: none;
      transition: all 0.2s ease 0s;
      cursor:pointer;
      margin-top:auto;
      font-size:0.8rem;
      @media (max-width: 900px) {
         font-size:0.5rem;
      }
   }
`
