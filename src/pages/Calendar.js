import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { EditEventModal, CalenderSquare, EventModal, AddEventModal,OverflowEventsModal } from '../components/index';
import { modalHandler, getSecureEventInfo, getEntries,getInitialDate,selectDate,clearEntries } from '../redux/actions/index';
import { connect } from 'react-redux';
import { useParams } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars';

const Calendar = ({ 
      auth, 
      selectedDate, 
      getSecureEventInfo,
      modalHandler,
      modalState, 
      entries,
      selectDate,
      editEntryState,
      deleteEntryState,
      addEntryState,
      getInitialDate,
      getEntries,
      clearEntries,
   }) => {
      
   const [ boxes, setBoxes ] = useState([]);
   const [ headers, setHeaders ] = useState([]);
   let dayStrings = ["", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
   const history = useHistory();
   const {month, year} = useParams();
   let button = '';


   useEffect(() => {
      async function start(){
         await getInitialDate();
      }
      if(month && !selectedDate){
         let urlDate = new Date(year, month);
         let currentDay = false;
         if(urlDate.getMonth() === new Date().getMonth() +1){
            currentDay = new Date().getDate();
         }
         else {
            currentDay = urlDate.getDate();
         }
         selectDate({
            day: currentDay,
            month: urlDate.getMonth(), 
            year: urlDate.getFullYear(),
            totalDaysInMonth: new Date(urlDate.getFullYear(), urlDate.getMonth(), 0).getDate(),
         })
      }
      else if(!month && !selectedDate){
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
      else {
         getEntries(selectedDate.month, selectedDate.year);
      }

   }, [selectedDate,addEntryState.isFetching,deleteEntryState.isFetching,editEntryState.isFetching]);

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
      if(auth.moderator || auth.admin){
         modalHandler({modalDisplay:'add', modalInfo:{ day:e.target.id, month:selectedDate.month, year:selectedDate.year }});
      }
   }

   // View Event
   const openViewEventModal = (eventInfo) => {
      if(auth.authenticated){
         async function f(){
            await getSecureEventInfo({
               eventInfo:eventInfo,
            }) 
         } 
         f(); 
         modalHandler({modalDisplay:'view', modalInfo: eventInfo});
      }
      else{
         modalHandler({modalDisplay:'view', modalInfo: eventInfo});
      }
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
         // If 1st is on a sunday, just backdate 6 squares.
         if(precedingMonthCheck.getDay() === 0){
            for(let i = 6; i > 0; i--){
               tempBoxes.push(
                  <CalenderSquareContainer key={`precedingBox ${i}`} >
                     <CalenderSquare type='preceding'/>
                  </CalenderSquareContainer >
               )
            }
            precedingDaysCompleted = true
         }
         // Esle backdate required days.
         else if(precedingMonthCheck.getDay() > 1 ){
            for(let i = precedingMonthCheck.getDay()-1; i > 0; i--){
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
      for(let i = 1; i < selectedDate.totalDaysInMonth + 1; i++){
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
            <Scrollbars>
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
               {(modalState.modalDisplay === 'overflow')
                  ? <OverflowEventsModal />
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
            </Scrollbars>
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
   width:100%;
   max-width:100%;
   min-width:300px;
   height:100%;
   display:flex;
   flex-direction:column;
   flex-wrap:nowrap;
   padding:30px 30px 10px 30px;
   transition: all 0.2s ease-in-out;
   min-height:500px;
   @media (max-width: 900px) {
      padding:10px 25px 10px 10px;
   }
`
const CalenderBoxesContainer = styled.div`
   width:100%;
   height:100%;
   display:grid;
   grid-template-columns:repeat(7, 1fr);
   grid-auto-rows: 1fr;
   grid-gap:5px;
  
`
const CalenderHeaderContainer = styled.div`
   width:100%;
   display:grid;
   grid-template-columns:repeat(7, 1fr);
   grid-gap:5px;
`
const CalenderSquareContainer  = styled.div`
   width:1fr;
   height:1fr;
   min-width: 0;
   display:flex;
   flex-direction:column;
`

const CalenderHeader = styled.div`
   width:1fr;
   max-width: 1fr;
   min-width:1fr;
   height:1fr;
   background: #1f2933;
   text-align: center;
   padding-top:3px;
   padding-bottom:3px;
   color:white;
   font-size:1.2rem;
   @media (max-width: 900px) {
    font-size: 1rem;
   }
   -webkit-user-select: none; /* Safari */        
   -moz-user-select: none; /* Firefox */
   -ms-user-select: none; /* IE10+/Edge */
   user-select: none; /* Standard */
`

const mapStateToProps = (state) => ({ deleteEntryState:state.deleteEntry,editEntryState:state.editEntry,addEntryState:state.addEntry, entries:state.entries, modalState:state.modal, auth:state.authenticate, selectedDate:state.selectedDate.selectedDate});
export default connect(mapStateToProps, { clearEntries,selectDate, getInitialDate, getEntries, modalHandler, getSecureEventInfo, })(Calendar);