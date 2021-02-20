import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';
import styled from "styled-components";
import { connect } from 'react-redux';
import {modalHandler,deleteEntry} from '../redux/actions/index';
import Draggable from 'react-draggable'; // The default
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
} from '../assets/index';

const Wrapper = styled.div`
   position:absolute;
   top:20%;
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
   & .icon {
      width:20px;
      height:20px;
      margin-right:5px;
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
   & .editButton{
      position:absolute;
      top:10px;
      right:75px;
      width:25px;
      height:25px;
      cursor: pointer;
      transition: all 0.2s ease 0s;
      &:hover {
         scale:0.9;
      }
   }
   & .deleteButton{
      position:absolute;
      top:10px;
      right:40px;
      width:25px;
      height:25px;
      cursor: pointer;
      transition: all 0.2s ease 0s;
      &:hover {
         scale:0.9;
      }
   }
   & .eventTitle{
      margin-bottom:20px;
      background-color:#323f4b;
      border-radius:5px;
      max-width:80%;
      color:white;
      padding:5px;
      font-size:1.6rem;
      word-wrap: break-word;
   }
   & .eventInfoContainer{
      display:flex;
      flex-direction:row;
      align-content:center;
      margin-top:15px;
      margin-left:3px;
   }
   & .eventDescription {
      width:100%;
      margin-top:5px;
      height:auto;
   }
`

const StyledEditingContainer = styled.div`
`
const SecureInfoWrapper = styled.div`
   display:flex;
   flex-direction:column;
   width:100%;
   height:auto;
`
const InfoWrapper = styled.div`
   display:flex;
   flex-direction:column;
   width:100%;
   height:auto;
`

const EventModal = ({ modalHandler, secureInfo,deleteEntry, handleDeleteEvent, setModalToggle, modalState, auth }) => {

   const modalInfo = modalState.modalInfo;
   const printDate = new Date(modalInfo.year, modalInfo.month - 1, modalInfo.day);
   const handleDelete = () => {
      deleteEntry(secureInfo.eventinfo.id);
      modalHandler(false);
   }
   
   // Open the edit modal.
   const handleEdit = () => {
      modalHandler({modalDisplay:'edit', modalInfo: modalState.modalInfo});
   }
   let publicLinks = [];
   const genPublicLinks = () => {
      let count = 1;
      JSON.parse(modalInfo.publiclinks).forEach(entry => {
         publicLinks.push(
            <p key={count}>{entry}</p>
         )
         count++;
      })
   }
   genPublicLinks();
   let privateLinks = [];
   const genPrivateLinks = () => {
      let count = 1;
      if(secureInfo){
         JSON.parse(secureInfo.eventinfo.privatelinks).forEach(entry => {
            privateLinks.push(
               <p key={count}>{entry}</p>
            )
            count++;
         })
      }

   }
   genPrivateLinks();

   useEffect(() => {
      console.log('trig')
      genPublicLinks();
      genPrivateLinks();
   }, [secureInfo, modalInfo]);

   // PRIVATE
   // private links
   // public links



   // If logged in, display event info
   return(

         <Wrapper>
            {/* Close modal button */}
            <img onClick={()=>modalHandler(false)} className="closeButton" src={close}/>
            {/* If user created event, show admin contols. */}
            {(secureInfo && secureInfo.owner)
            ? <React.Fragment>
                  <img onClick={handleEdit} className="editButton" src={eventEdit}/>
                  <img onClick={handleDelete} className="deleteButton" src={eventDelete}/>
               </React.Fragment>
               : <React.Fragment/>
            }

            <InfoWrapper>
               {/* Title */}
               <h1 className="eventTitle">{modalInfo.title}</h1>
               {/* Event time */}
                  <div className="eventInfoContainer">
                  <img className="icon"src={eventTime}/>
                  <span>{modalInfo.starttime} - {modalInfo.endtime}</span>
               </div>
               {/* Event date */}
               <div className="eventInfoContainer">
                  <img className="icon"src={eventDate}/>
                  {`
                     ${printDate.toLocaleString('en-us', {  weekday: 'long' })}
                     ${printDate.toLocaleString('default', { month: 'long' })} 
                     ${modalInfo.day}, 
                     ${modalInfo.year}.
                  `}
               </div>
               {/* Description */}
               <div className="eventInfoContainer">
                  <img className="icon"src={eventDescription}/>
                  <p className="eventDescription">{modalInfo.description}</p>
               </div>
               {/* Organisation */}
               <div className="eventInfoContainer">
                  <img className="icon"src={eventOrganisation}/>
                  <span>{modalInfo.organisation}</span>
               </div>
               {/* Event type */}
               <div className="eventInfoContainer">
                  <img className="icon"src={eventType}/>
                  <span>{modalInfo.type}</span>
               </div>
               {/* Image */}
               <div className="eventInfoContainer">
                  <span>Image:{modalInfo.image}</span>
               </div>
               {/* Public Links */}
               <div className="eventInfoContainer">

                  <img className="icon"src={eventLink}/>
                  <span>{publicLinks}</span>
               </div>    
               {/* Private Links */}
               {(secureInfo)
                  ? <SecureInfoWrapper>
                     <div className="eventInfoContainer">
                     <img className="icon"src={eventSecure}/>
                        <img className="icon"src={eventLink}/>
                        <span>Private Links:{privateLinks}</span>
                     </div>
                  </SecureInfoWrapper>
                  : <React.Fragment/>
               }
            </InfoWrapper>
         </Wrapper>

   ) 
}

const mapStateToProps = (state) => ({ modalState:state.modal, secureInfo:state.secureEntry.secureInfo, auth:state.authenticate });
export default connect(mapStateToProps,{deleteEntry,modalHandler})(EventModal);