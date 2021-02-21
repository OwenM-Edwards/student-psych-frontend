import React, {useState} from 'react';
import styled from "styled-components";
import { connect } from 'react-redux';
import Select from 'react-select';
import { LoadingIcon } from './index';
import { toast } from 'react-toastify';
import {modalHandler, editEvent} from '../redux/actions/index';
import { EventForm } from '../components/index';

import { editEntry } from '../redux/actions/index';
import {
   close,
} from '../assets/index';

const Wrapper = styled.div`
   position:absolute;
   top:10%;
   left:20%;
   width:500px;
   height:auto;
   background: ${({ theme }) => theme.backgroundLight};
   color: ${({ theme }) => theme.contrastText};
   display:flex;
   flex-direction:column;
   padding:10px;
   z-index:2;
   border-radius:5px;
   box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
   & .formTitle {
      font-size:1.6rem;
      position: relative;
      left:10px;
   }
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
   & .inputForm{
      display:flex;
      flex-direction:column;
      flex-wrap:nowrap;
      padding:10px;
      border: 0;
      margin-top:10px;
   }
`
const StyledCloseButton = styled.div`
   position:absolute;
   top:0;
   right:0;
   width:20px;
   height:20px;
   background-color:red;
   cursor: pointer;
`

const EditEventModal = ({ 
      auth, 
      addEntryState, 
      setModalToggle, 
      handleEditEvent, 
      modalState,
      modalHandler,
      editEntry,
   }) => {
   const modalInfo = modalState.modalInfo;
   const [ inputTitle, setInputTitle ] = useState(modalInfo.title);
   const [ inputStartTime, setInputStartTime ] = useState(modalInfo.starttime);
   const [ inputEndTime, setInputEndTime ] = useState(modalInfo.endtime);
   const [ inputType, setInputType ] = useState('type 1');
   const [ inputDescription, setInputDescription ] = useState(modalInfo.description);
   const eventTypes = [
      { value: 'type 1', label: 'Event Type One'},
      { value: 'type 2', label: 'Event Type Two'},
      { value: 'type 3', label: 'Event Type Three'},
   ];
   const capitalizeTrim = (string) => {
      let returnString = string[0].toUpperCase() + string.slice(1);
      
      return returnString.trim();
   }
   const handleTitle = (e) => {
      setInputTitle(e.target.value);
   }
   const handleStartTime = (e) => {
      setInputStartTime(e.target.value);
   }
   const handleEndTime = (e) => {
      setInputEndTime(e.target.value);
   }
   const handleType = (e) => {
      setInputType(e.value);
   }
   const handleDescription = (e) => {
      setInputDescription(e.target.value);
   }

   const handleEdit = (data) => {
      editEntry({
         title:capitalizeTrim(data.eventTitle),
         description:capitalizeTrim(data.eventDescription),
         organisation:capitalizeTrim(data.eventOrganisation),
         day:modalInfo.day,
         month:modalInfo.month,
         year:modalInfo.year,
         image:'',
         type:data.eventType,
         userid:auth.user.id,
         starttime:data.eventStartTime,
         endtime:data.eventEndTime,
         entryid:modalInfo.id,
         id: modalInfo.id,
      })
      modalHandler(false);
   }


   if(!addEntryState.isFetching){
      return(
         <Wrapper>
            <h1 className="formTitle">Edit Event</h1>
            {/* Close modal button */}
            <img onClick={()=>modalHandler(false)} className="closeButton" src={close}/>

            <div className="inputForm">
               <EventForm defaultOptions={modalInfo} handleSubmitEvent={handleEdit}/>
            </div>
         </Wrapper>
      )
   }
   else {
      return(
         <Wrapper>
            <LoadingIcon/>
         </Wrapper>
      )
   }
   
}

const mapStateToProps = (state) => ({ modalState:state.modal, auth:state.authenticate, addEntryState: state.addEntry });

export default connect(mapStateToProps,{modalHandler, editEntry})(EditEventModal);