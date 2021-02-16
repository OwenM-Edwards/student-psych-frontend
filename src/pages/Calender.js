import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { EditEventModal, CalenderSquare, Sidebar, EventModal, AddEventModal } from '../components/index';
import { getSecureEventInfo, deleteEntry, editEntry, selectDate, addEntry } from '../redux/actions/index';
import { connect } from 'react-redux';
import { toast } from "react-toastify";

const Calender = ({ 
      auth, 
      editEntryState, 
      deleteEntryState, 
      selectedDate, 
      editEntry, 
      deleteEntry,
      getSecureEventInfo,
   }) => {
   const [ boxes, setBoxes ] = useState([]);
   const [ headers, setHeaders ] = useState([]);
   const [ modalInfo, setModalInfo ] = useState(false);
   const [ modalToggle, setModalToggle ] = useState(false);
   let dayStrings = ["", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
   useEffect(() => {
      genDayHeaders();
      genBoxes();
      setModalToggle(false);
   }, [auth, editEntryState.isFetching, selectedDate.month, deleteEntryState.isFetching]);
   

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
   const handleCreateEvent = (e) => {
      if(auth.user.id){
         setModalInfo({
            eventInfo:{
               day:e.target.id,
               month:selectedDate.month,
               year:selectedDate.year,
            }
         })  
         setModalToggle('add');
      }
      else {
         toast.dismiss();
         toast.error('Only approved users can create new events.');
      }
   }
   const handleEditEvent = (eventInfo) => {
      editEntry(eventInfo);
   }
   const handleViewEvent = (eventInfo) => {
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
      setModalInfo({
         eventInfo,
      }) 
      setModalToggle('event');
   }
   const handleDeleteEvent = (eventInfo) => {
      deleteEntry(eventInfo);
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
                     <CalenderSquare />
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
                  setModalToggle={setModalToggle} 
                  setModalInfo={setModalInfo} 
                  calSquareDay={i}
                  handleCreateEvent={handleCreateEvent} 
                  handleViewEvent={handleViewEvent} 
               />
            </CalenderSquareContainer >
         )
      }
      setBoxes(tempBoxes);
   }

   return (
         <Wrapper> 
            
            {(modalToggle === 'event')
               ? <EventModal handleDeleteEvent={handleDeleteEvent} setModalToggle={setModalToggle} setModalInfo={setModalInfo} modalInfo={modalInfo.eventInfo}/>
               : <React.Fragment/>
            }  
            {(modalToggle === 'add')
               ? <AddEventModal setModalToggle={setModalToggle} setModalInfo={setModalInfo} modalInfo={modalInfo.eventInfo}/>
               : <React.Fragment/>
            }  
            {(modalToggle === 'edit')
               ? <EditEventModal handleEditEvent={handleEditEvent} setModalToggle={setModalToggle} setModalInfo={setModalInfo} modalInfo={modalInfo.eventInfo}/>
               : <React.Fragment/>
            } 

            <StyledSidebar> 
               <Sidebar/>
            </StyledSidebar>

            <StyledMain>
               <CalenderHeaderContainer>
                  {headers}
               </CalenderHeaderContainer>
               <CalenderBoxesContainer>
                  {boxes}
               </CalenderBoxesContainer>

            </StyledMain>
         </Wrapper>
   )
}



const Wrapper = styled.div`
   width:100%;
   height:100%;
   background-color:red;
   display:flex;
`
const StyledMain = styled.div`
   min-width:auto;
   flex-grow:1;
   height:100%;
   background-color:#2b2b2b;
   display:flex;
   flex-direction:column;
   padding:50px 50px 50px 0px;
`
const CalenderBoxesContainer = styled.div`
   width:100%;
   height:95%;
   background-color:#2b2b2b;
   display:grid;
   grid-template-columns:repeat(7, 1fr);
   grid-template-rows:repeat(auto, 1fr);
   grid-gap:5px;
`
const CalenderHeaderContainer = styled.div`
   width:100%;
   height:5%;
   background-color:#2b2b2b;
   display:grid;
   grid-template-columns:repeat(7, 1fr);
   grid-template-rows:repeat(5, 1fr);
   grid-gap:5px;
`
const CalenderSquareContainer  = styled.div`
   width:1fr;
   height:150px;
`

const CalenderHeader = styled.div`
   width:1fr;
   height:1fr;
   background-color:white;
   text-align: center;
`

const StyledSidebar = styled.div`
   width:20%;
   max-width: 200px;
   height:100%;
   background-color:#2b2b2b;
`

const mapStateToProps = (state) => ({ auth:state.authenticate, editEntryState:state.editEntry, deleteEntryState:state.deleteEntry, selectedDate:state.selectedDate.selectedDate});
export default connect(mapStateToProps, { getSecureEventInfo, deleteEntry, editEntry, selectDate, addEntry })(Calender);