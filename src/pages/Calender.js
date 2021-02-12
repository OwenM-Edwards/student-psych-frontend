import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { EditEventModal, CalenderSquare, Sidebar, LoadingIcon, EventModal, AddEventModal } from '../components/index';
import { getInitialDate, selectDate, getEntries, addEntry } from '../redux/actions/index';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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


const Calender = ({ editEntryState, deleteEntryState, entries, getEntries, selectedDate, getInitialDate, addEntryState }) => {
   const [ boxes, setBoxes ] = useState([]);
   const [ headers, setHeaders ] = useState([]);
   const [ modalInfo, setModalInfo ] = useState(false);
   const [ modalToggle, setModalToggle ] = useState(false);
   const [ addModalToggle, setaddModalToggle ] = useState(false);
   const [ editModalToggle, setEditModalToggle ] = useState(false);
   const toastId = 1
   let dayStrings = ["", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
   if(!selectedDate){
      getInitialDate();
   }
   useEffect(() => {
      getEntries(selectedDate.month, selectedDate.year);
      genDayHeaders();
      genBoxes();
      closeAllModals();
   }, [editEntryState.isFetching, selectedDate.month, addEntryState.isFetching, deleteEntryState.isFetching]);
   
   // let testMonth = new Date().toLocaleString('default', { month: 'long'});
   // console.log(testMonth)

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
   const createToast = (toastText) => {
      toast.info(toastText,{
         toastId: toastId
      });
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
                     <CalenderSquare/>
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
                  setaddModalToggle={setaddModalToggle} 
                  setModalInfo={setModalInfo} 
                  calSquareDay={i}
                  createToast={createToast}
               />
            </CalenderSquareContainer >
         )
      }
      setBoxes(tempBoxes);
   }

   const closeAllModals = () => {
      setModalToggle(false);
      setaddModalToggle(false);
      setEditModalToggle(false);
      
   }





   if(entries.isFetching){
      return(
         <LoadingIcon/>
      )     
   }
   return (
         <Wrapper> 
            <ToastContainer/>
            {(modalToggle)
               ? <EventModal createToast={createToast} setEditModalToggle={setEditModalToggle} setModalToggle={setModalToggle} setModalInfo={setModalInfo} modalInfo={modalInfo.eventInfo}/>
               : <React.Fragment/>
            }  
            {(addModalToggle)
               ? <AddEventModal setaddModalToggle={setaddModalToggle} setModalInfo={setModalInfo} modalInfo={modalInfo.eventInfo}/>
               : <React.Fragment/>
            }  
            {(editModalToggle)
               ? <EditEventModal setEditModalToggle={setEditModalToggle} setModalInfo={setModalInfo} modalInfo={modalInfo.eventInfo}/>
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


const mapStateToProps = (state) => ({ editEntryState:state.editEntry, deleteEntryState:state.deleteEntry, addEntryState:state.addEntry, selectedDate:state.selectedDate.selectedDate, entries:state.entries });
export default connect(mapStateToProps, { getInitialDate, selectDate, getEntries, addEntry })(Calender);