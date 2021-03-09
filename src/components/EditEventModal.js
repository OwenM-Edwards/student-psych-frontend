import React, {useEffect} from 'react';
import styled from "styled-components";
import { connect } from 'react-redux';
import { LoadingIcon } from './index';
import {modalHandler, editEntry} from '../redux/actions/index';
import { EventForm } from '../components/index';

import {
   close,
} from '../assets/index';

const Wrapper = styled.div`
   position:absolute;
   top:20%;
   left:20%;
   width:400px;
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
      top:0%;
      left:0%;
      width:100%;
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

const EditEventModal = ({ 
      auth, 
      editEntryState, 
      modalState,
      modalHandler,
      editEntry,
      secureInfo
   }) => {
   const modalInfo = modalState.modalInfo;
   modalInfo.privatelinks = secureInfo.eventinfo.privatelinks;

   const capitalizeTrim = (string) => {
      let returnString = string[0].toUpperCase() + string.slice(1);
      
      return returnString.trim();
   }
   const handleEdit = (data) => {
      editEntry({
         title:capitalizeTrim(data.eventTitle),
         description:capitalizeTrim(data.eventDescription),
         organisation:capitalizeTrim(data.eventOrganisation),
         publiclinks:[
            data.PublicLinkInfo0,
            data.PublicLinkInfo1,
            data.PublicLinkInfo2,
         ],
         privatelinks:[
            data.PrivateLinkInfo0,
            data.PrivateLinkInfo1,
            data.PrivateLinkInfo2,
         ],
         day:modalInfo.day,
         month:modalInfo.month,
         year:modalInfo.year,
         type:data.eventType,
         starttime:data.eventStartTime,
         endtime:data.eventEndTime,
         entryid:modalInfo.id,
         id: modalInfo.id,
      })
      modalHandler(false);
   }


   if(!editEntryState.isFetching){
      return(
         <Wrapper>
            <h1 className="formTitle">Edit Event</h1>
            {/* Close modal button */}
            <div className="buttonContainer">
               <img onClick={()=>modalHandler(false)} className="closeButton" src={close}/>
            </div>
            

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

const mapStateToProps = (state) => ({ secureInfo:state.secureEntry.secureInfo, modalState:state.modal, auth:state.authenticate, editEntryState: state.editEntry });

export default connect(mapStateToProps,{modalHandler, editEntry})(EditEventModal);