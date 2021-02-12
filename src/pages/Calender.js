import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { EditEventModal, CalenderSquare, Sidebar, LoadingIcon, EventModal, ModEventModal } from '../components/index';
import { getInitialDate, selectDate, getEntries, addEntry } from '../redux/actions/index';
import { connect } from 'react-redux';


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
   display:grid;
   grid-template-columns:repeat(7, 1fr);
   grid-template-rows:repeat(5, 1fr);
   grid-gap:5px;
   padding:50px 50px 50px 0px;
`
const CalenderSquareContainer  = styled.div`
   width:1fr;
   height:1fr;
`
const StyledSidebar = styled.div`
   width:20%;
   max-width: 200px;
   height:100%;
   background-color:#2b2b2b;
`
const StyledEventModal = styled.div`
   position:absolute;
   width:100px;
   height:300px;
   background-color:black;

`
const StyledMonthContainer = styled.div`
   position:absolute;
   top:70px;
   left:270px;
`


const Calender = ({ deleteEntryState, selectDate, entries, getEntries, addEntry, selectedDate, getInitialDate, addEntryState }) => {
   const [ boxes, setBoxes ] = useState([]);
   const [ modalInfo, setModalInfo ] = useState(false);
   const [ modalToggle, setModalToggle ] = useState(false);
   const [ modModalToggle, setModModalToggle ] = useState(false);
   const [ editModalToggle, setEditModalToggle ] = useState(false);
   if(!selectedDate){
      getInitialDate();
   }
   useEffect(() => {
      genBoxes();
      getEntries(selectedDate.month, selectedDate.year);
      closeAllModals();
   }, [selectedDate.month, addEntryState.isFetching, deleteEntryState.isFetching]);
   
   // let testMonth = new Date().toLocaleString('default', { month: 'long'});
   // console.log(testMonth)


   const genBoxes = () => {
      setBoxes([]);
      let tempBoxes = [];
      for(let i = 1; i < 31 + 1; i++){
         tempBoxes.push(
            <CalenderSquareContainer key={i} >
               <CalenderSquare 
                  setModalToggle={setModalToggle} 
                  setModModalToggle={setModModalToggle} 
                  setModalInfo={setModalInfo} 
                  calSquareDay={i}
               />
            </CalenderSquareContainer >
         )
      }
      setBoxes(tempBoxes);
   }
   const closeAllModals = () => {
      if(modalToggle === true || modModalToggle === true){
         setModalToggle(false);
         setModModalToggle(false);
         setEditModalToggle(false);
      }
   }



   if(entries.isFetching){
      return(
         <LoadingIcon/>
      )     
   }
   return (
         <Wrapper> 
            {(modalToggle)
               ? <EventModal setEditModalToggle={setEditModalToggle} setModalToggle={setModalToggle} setModalInfo={setModalInfo} modalInfo={modalInfo.eventInfo}/>
               : <React.Fragment/>
            }  
            {(modModalToggle)
               ? <ModEventModal setModModalToggle={setModModalToggle} setModalInfo={setModalInfo} modalInfo={modalInfo.eventInfo}/>
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
               <StyledMonthContainer>
                  
               </StyledMonthContainer>
               {boxes}
            </StyledMain>
         </Wrapper>
   )
}


const mapStateToProps = (state) => ({ deleteEntryState:state.deleteEntry, addEntryState:state.addEntry, selectedDate:state.selectedDate.selectedDate, entries:state.entries });
export default connect(mapStateToProps, { getInitialDate, selectDate, getEntries, addEntry })(Calender);