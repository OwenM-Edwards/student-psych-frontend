import React from 'react';
import styled from "styled-components";
import { connect } from 'react-redux';
import {modalHandler} from '../redux/actions/index';
import {
   close,
} from '../assets/index';


const Wrapper = styled.div`
   width:200px;
   height:auto;
   max-height:500px;
   z-index:5;
   background-color:black;
   position: absolute;
   background: ${({ theme }) => theme.backgroundLight};
   color: ${({ theme }) => theme.contrastText};
   display:flex;
   flex-direction:column;
   padding:10px;
   padding-top:40px;
   border-radius:5px;
   box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
   grid-gap:10px;
   overflow-y:scroll;
   & .closeButton{
      position:absolute;
      top:8px;
      right:5px;
      width:30px;
      height:30px;
      cursor: pointer;
      transition: all 0.2s ease 0s;
      &:hover {
         scale:0.9;
      }
   }
`

const OverflowEventsModal = ({selectedDate, modalState, modalHandler}) => {
   // Position of mouse click, sets modal postion to that.
   const {xValue, yValue} = modalState.modalInfo;
   const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
   const modalDate = new Date(selectedDate.year, selectedDate.month -1);
   const getOrdinalNum = (number) => {
      let selector;
    
      if (number <= 0) {
        selector = 4;
      } else if ((number > 3 && number < 21) || number % 10 > 3) {
        selector = 0;
      } else {
        selector = number % 10;
      }
    
      return number + ['th', 'st', 'nd', 'rd', ''][selector];
    };
   return (
      <Wrapper style={{top: yValue, left:xValue}}>
         {/* Close modal button */}
         <img onClick={()=>modalHandler(false)} className="closeButton" src={close}/>
         <p>Events for the {getOrdinalNum(modalState.modalInfo.modalDay)} of {months[modalDate.getMonth()]}</p>
         {modalState.modalInfo.eventList}
      </Wrapper> 
   )
}


const mapStateToProps = (state) => ({ selectedDate:state.selectedDate.selectedDate, modalState:state.modal});
export default connect(mapStateToProps, {modalHandler})(OverflowEventsModal);