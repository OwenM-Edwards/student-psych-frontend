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
   eventDate,
   eventDescription,
   eventLink,
   eventOrganisation,
   eventSecure,
   eventTime,
   eventType,
   eventEdit,
   eventDelete,
   add,
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
   & .formInput {
      padding:10px;
      margin-bottom:5px;
   }
`
const TimeInputContainer = styled.div`
   width:100%;
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
// Make the element draggable.

const AddEventModal = ({ userinfo, addEntry, addEntryState, modalState, modalHandler }) => {
   const modalInfo = modalState.modalInfo;
   const [ inputTitle, setInputTitle ] = useState(false);
   const [ inputStartTime, setInputStartTime ] = useState(false);
   const [ inputEndTime, setInputEndTime ] = useState(false);
   const [ inputType, setInputType ] = useState('type 1');
   const [ inputDescription, setInputDescription ] = useState(false);
   const [ inputOrganisation, setInputOrganisation ] = useState(false);
   const [ inputPublicLinks, setInputPublicLinks ] = useState(false);
   const [ inputPrivateLinks, setInputPrivateLinks ] = useState(false);
   const [ previewSRC, setPreviewSRC] = useState(false);

   const [publicTypeState, setPublicTypeState] = useState(["","",""]);
   const [privateTypeState, setPrivateTypeState] = useState(["","",""]);
   const eventTypes = [
      { value: 'type 1', label: 'Event Type One'},
      { value: 'type 2', label: 'Event Type Two'},
      { value: 'type 3', label: 'Event Type Three'},
   ];
   const handlePreview = (data) => {
      data.preventDefault();
      let file = data.target.files[0];
      let reader = new FileReader();
      if (data.target.files.length === 0) {
        return;
      }
      reader.onloadend = (data) => {
         setPreviewSRC([reader.result])
      }
      reader.readAsDataURL(file);
   }
   const capitalizeTrim = (string) => {
      let returnString = string[0].toUpperCase() + string.slice(1);
      
      return returnString.trim();
   }
   const handleTitle = (e) => {
      setInputTitle(e.target.value);
   }
   const handleDescription = (e) => {
      setInputDescription(e.target.value);
   }
   const handleOrganisation = (e) => {
      setInputOrganisation(e.target.value);
   }
   const handlePublicLinks = (e) => {
      setInputPublicLinks(e.target.value);
   }
   const handlePrivateLinks = (e) => {
      setInputPrivateLinks(e.target.value);
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

   const handleSubmitEvent = (data) => {
      addEntry({
         title:capitalizeTrim(data.eventTitle),
         description:capitalizeTrim(data.eventDescription),
         organisation:capitalizeTrim(data.eventOrganisation),
         publiclinks:[data.PublicLinkInfo0,data.PublicLinkInfo1,data.PublicLinkInfo2],
         publiclinkstypes:[data.PublicLinkType0,data.PublicLinkType1,data.PublicLinkType2],
         privatelinks:[data.PrivateLinkInfo0,data.PrivateLinkInfo1,data.PrivateLinkInfo2],
         privatelinkstype:[data.PrivateLinkType0,data.PrivateLinkType1,data.PrivateLinkType2],
         day:modalInfo.day,
         month:modalInfo.month,
         year:modalInfo.year,
         image:'',
         type:data.eventType,
         userid:userinfo.user.id,
         starttime:data.eventStartTime,
         endtime:data.eventEndTime,
         type:data.eventType,
      });
      modalHandler(false);
   }


   if(!addEntryState.isFetching){
      return(
         <Wrapper>
            {/* Close modal button */}
            <img onClick={()=>modalHandler(false)} className="closeButton" src={close}/>

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