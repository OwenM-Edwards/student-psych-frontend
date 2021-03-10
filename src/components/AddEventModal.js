import React, {useState} from 'react';
import styled from "styled-components";
import { connect } from 'react-redux';
import Select from 'react-select';
import { LoadingIcon } from './index';
import 'react-toastify/dist/ReactToastify.css';
import { addEntry,modalHandler } from '../redux/actions/index';
import { EventForm } from '../components/index';
import {
   close,
} from '../assets/index';

const Wrapper = styled.div`
   position:absolute;
   top:20%;
   left:45%;
   width:40%;
   max-width:400px;
   min-width:325px;
   height:auto;
   background:${({ theme }) => theme.primary.offWhite};
   color: ${({ theme }) => theme.contrastText};
   display:flex;
   flex-direction:column;
   z-index:2;
   border-radius:5px;
   box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
   @media (max-width: 700px) {
      top:auto;
      left:0%;
      width:100%;
      max-width:100%;
      height:auto;
      z-index:5;
   }
   & .formTitle {
      font-size:1.6rem;
      width:100%;
      background-color:${({ theme }) => theme.primary.main};
      color: ${({ theme }) => theme.primary.light};
      padding:20px;
      border-radius:5px;
   }
   & .buttonContainer{
      background:${({ theme }) => theme.primary.offWhite};
      width:30px;
      height:30px;
      position:absolute;
      top:11px;
      right:9px;
      border-radius:5px;
      & .closeButton{
         width:30px;
         height:30px;
         cursor: pointer;
         transition: all 0.2s ease 0s;
         &:hover {
            scale:0.9;
         }
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

// Make the element draggable.

const AddEventModal = ({ addEntry, addEntryState, modalState, modalHandler }) => {
   const modalInfo = modalState.modalInfo;

   
   const capitalizeTrim = (string) => {
      let returnString = string[0].toUpperCase() + string.slice(1);
      return returnString.trim();
   }
   
   const handleSubmitEvent = (data) => {
      addEntry({
         title:capitalizeTrim(data.eventTitle),
         description:capitalizeTrim(data.eventDescription),
         organisation:capitalizeTrim(data.eventOrganisation),
         publiclinks:[
            data.PublicLinkInfo0,
            data.PublicLinkInfo1,
            data.PublicLinkInfo2,
            data.PublicLinkInfo3,
            data.PublicLinkInfo4,
            data.PublicLinkInfo5,
         ],
         privatelinks:[
            data.PrivateLinkInfo0,
            data.PrivateLinkInfo1,
            data.PrivateLinkInfo2,
            data.PrivateLinkInfo3,
            data.PrivateLinkInfo4,
            data.PrivateLinkInfo5,
         ],
         day:modalInfo.day,
         month:modalInfo.month,
         year:modalInfo.year,
         type:data.eventType,
         starttime:data.eventStartTime,
         endtime:data.eventEndTime,
         type:data.eventType,
      });
      modalHandler(false);
   }


   if(!addEntryState.isFetching){
      return(
         <Wrapper>
            <h1 className="formTitle">Add Event</h1>
            {/* Close modal button */}
            <div className="buttonContainer">
               <img onClick={()=>modalHandler(false)} className="closeButton" src={close}/>
            </div>
            

            {/* The Form */}
            <div className="inputForm">
               <EventForm handleSubmitEvent={handleSubmitEvent}/>
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

const mapStateToProps = (state) => ({ modalState:state.modal, userinfo:state.authenticate, addEntryState: state.addEntry });

export default connect(mapStateToProps, {modalHandler, addEntry})(AddEventModal);