import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { EditEventModal, CalenderSquare, EventModal, AddEventModal } from '../components/index';
import { modalHandler, getSecureEventInfo, getEntries,getInitialDate } from '../redux/actions/index';
import { connect } from 'react-redux';
import { toast } from "react-toastify";

const Calendar = ({ 
      auth, 
      selectedDate, 
      getSecureEventInfo,
      modalHandler,
      modalState, 
      entries,
   }) => {
   const [ boxes, setBoxes ] = useState([]);
   const [ headers, setHeaders ] = useState([]);
   let dayStrings = ["", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];


   useEffect(() => {
      genDayHeaders();
      genBoxes();
   }, [auth, selectedDate, entries]);
   

   const genDayHeaders = () => {
      let tempHeaders = [];
      // Create day headers.
      for(let i = 1; i < 8; i++ ){
         tempHeaders.push(
            <CalenderHeader key={`headerBox ${i}`}>
               {dayStrings[i]}
            </CalenderHeader>
         )
      }
      setHeaders(tempHeaders);
   }

   
   // Add Event.
   const openAddEventModal = (e) => {
      if(auth.user.id){
         modalHandler({modalDisplay:'add', modalInfo:{ day:e.target.id, month:selectedDate.month, year:selectedDate.year }});
      }
      else {
         toast.dismiss();
         toast.error('Only approved users can create new events.');
      }
   }
   // View Event
   const openViewEventModal = (eventInfo) => {
      if(auth.user.id){
         getSecureEventInfo({
            eventInfo:eventInfo,
            userid:auth.user.id
         })
      }
      else{
         toast.dismiss();
         toast.info('Please login to view full event.');
      }
      console.log(eventInfo)
      modalHandler({modalDisplay:'view', modalInfo: eventInfo});
   }
   const closeModals = () => {
      if(modalState.modalDisplay){
         modalHandler(false);
      }
   }

   const genBoxes = () => {
      let precedingMonthCheck = new Date(selectedDate.year, selectedDate.month - 1, 1);
      let tempBoxes = [];

      let precedingDaysCompleted = false;
      // If there are preceding days from last month before monday, create these first.
      if(!precedingDaysCompleted){
         if(precedingMonthCheck.getDay() > 1 ){
            for(let i = precedingMonthCheck.getDay() - 1; i > 0; i--){
               tempBoxes.push(
                  <CalenderSquareContainer key={`precedingBox ${i}`} >
                     <CalenderSquare type='preceding'/>
                  </CalenderSquareContainer >
               )
            }
            precedingDaysCompleted = true
         }
         else {
            precedingDaysCompleted = true
         }
      }
      // Gen rest of month
      for(let i = 1; i < 31 + 1; i++){
         tempBoxes.push(
            <CalenderSquareContainer key={i} >
               <CalenderSquare 
                  type={'main'}
                  calSquareDay={i}
                  openAddEventModal={openAddEventModal} 
                  openViewEventModal={openViewEventModal} 
               />
            </CalenderSquareContainer >
         )
      }
      setBoxes(tempBoxes);
   }

   return (
         <Wrapper> 
            
            {(modalState.modalDisplay === 'view')
               ? <EventModal draggable="true"/>
               : <React.Fragment/>
            }  
            {(modalState.modalDisplay === 'add')
               ? <AddEventModal />
               : <React.Fragment/>
            }  
            {(modalState.modalDisplay === 'edit')
               ? <EditEventModal />
               : <React.Fragment/>
            } 

            {(!modalState.modalDisplay)
               ?
               <StyledMain>
                  <CalenderHeaderContainer>
                     {headers}
                  </CalenderHeaderContainer>
                  <CalenderBoxesContainer>
                     {boxes}
                  </CalenderBoxesContainer>
               </StyledMain>
               :
               <StyledMain className="frosted" onClick={()=>closeModals()}>
                  <CalenderHeaderContainer>
                     {headers}
                  </CalenderHeaderContainer>
                  <CalenderBoxesContainer>
                     {boxes}
                  </CalenderBoxesContainer>
               </StyledMain>
            }

         </Wrapper>
   )
}


const Wrapper = styled.div`
   width:100%;
   height:100%;
   display:flex;

   & .frosted{
      box-shadow: inset 0 0 500px rgba(255, 255, 255, .1);
      filter: blur(2px);
   }
`
const StyledMain = styled.div`
   min-width:auto;
   flex-grow:1;
   height:100%;
   min-height:100%;
   display:flex;
   flex-direction:column;
   flex-wrap:nowrap;
   padding:50px 50px 50px 0px;
   transition: all 0.2s ease-in-out;

`
const CalenderBoxesContainer = styled.div`
   width:100%;
   height:100%;
   display:grid;
   grid-template-columns:repeat(7, 1fr);
   grid-auto-rows: 1fr;
   grid-gap:5px;
   padding:5px 0 20px 50px;
`
const CalenderHeaderContainer = styled.div`
   width:100%;
   min-height:3%;
   display:grid;
   grid-template-columns:repeat(7, 1fr);
   grid-gap:5px;
   padding-left:50px;
`
const CalenderSquareContainer  = styled.div`
   width:1fr;
   height:1fr;
   min-width: 0
`

const CalenderHeader = styled.div`
   width:1fr;
   height:1fr;
   background: ${({ theme }) => theme.weekDay};
   text-align: center;
   padding-top:5px;
`

const mapStateToProps = (state) => ({ entries:state.entries, modalState:state.modal, auth:state.authenticate, selectedDate:state.selectedDate.selectedDate});
export default connect(mapStateToProps, { getInitialDate, getEntries, modalHandler, getSecureEventInfo, })(Calendar);