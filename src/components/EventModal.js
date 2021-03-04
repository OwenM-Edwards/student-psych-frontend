import React, {useEffect} from 'react';
import styled from "styled-components";
import { connect } from 'react-redux';
import {modalHandler,deleteEntry} from '../redux/actions/index';
import {registerEventClickAPI} from '../util/index';
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
   box-sizing:border-box;
   top:30%;
   left:20%;
   width:400px;
   height:auto;
   background:${({ theme }) => theme.primary.offWhite};
   color:#2b2b2b;
   display:flex;
   flex-direction:column;
   z-index:2;
   border-radius:10px;
   box-shadow: 0 10px 20px rgba(0,0,0,0.4), 0 6px 6px rgba(0,0,0,0.23);
   @media (max-width: 700px) {
      top:20%;
      left:0%;
      width:100%;
      height:auto;
      z-index:5;
   }

   & .icon {
      width:20px;
      height:20px;
      margin-right:15px;
   }
   & .eventInfoContainer{
      display:flex;
      flex-direction:row;
      align-content:center;
      margin-top:15px;
      margin-left:3px;
      & .linksContainer {
         width:100%;
         height:auto;
         display:flex;
         flex-direction:column;
      }
   }
   & .eventDescription {
      width:80%;
      margin-top:5px;
      height:auto;
      box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);
      padding:10px;
      border-radius:10px;

   }
`
const ButtonContainer = styled.div`
   position: absolute;
   top:5px;
   left:310px;
   background-color:${({ theme }) => theme.primary.offWhite};
   height:30px;
   width:84px;
   border-radius:5px;
   @media (max-width: 700px) {
      left:0;
   }
   & .btnIcon {
      position:absolute;
      cursor: pointer;
      transition: all 0.2s ease 0s;
      width:24px;
      height:24px;
      &:hover {
         scale:0.9;
      }
   }
   & .closeButton{
      top:4px;
      right:4px;
   }
   & .editButton{
      top:4px;
      right:57px;
   }
   & .deleteButton{
      top:4px;
      right:30px;
   }

`
const TitleContainer = styled.div`
   & .eventTitle{
      background-color:#323f4b;
      border-radius:5px;
      color: ${({ theme }) => theme.contrastText};
      padding:20px;
      padding-top:40px;
      font-size:1.3rem;
      background-color:red;
      width:100%;
      word-wrap:break-word;
      box-shadow: 0 5px 5px rgba(0,0,0,0.4), 0 2px 2px rgba(0,0,0,0.40);
      height:auto;
      z-index:9;
   }
   & .career{
      background-color:${({ theme }) => theme.colorCodes.red};
   }
   & .conference{
      background-color:${({ theme }) => theme.colorCodes.blue};
   }
   & .special{
      background-color:${({ theme }) => theme.colorCodes.purple};
   }
   & .other{
      background-color:${({ theme }) => theme.colorCodes.orange};
   }
   & .revision{
      background-color:${({ theme }) => theme.colorCodes.green};
   }
`
const InfoWrapper = styled.div`
   display:flex;
   flex-direction:column;
   width:100%;
   height:auto;
   background-color:${({ theme }) => theme.primary.offwhite};;
   padding:0 10px 20px 10px;
   border-radius:0 0 10px 10px;
`


const SecureInfoWrapper = styled.div`
   display:flex;
   flex-direction:column;
   width:100%;
   height:auto;
`







const EventModal = ({ modalHandler, secureInfo,deleteEntry, handleDeleteEvent, setModalToggle, modalState, auth }) => {

   const modalInfo = modalState.modalInfo;
   const printDate = new Date(modalInfo.year, modalInfo.month - 1, modalInfo.day);

   // Register click
   useEffect(() => {
      registerEventClickAPI(modalInfo.id);
   }, []);

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
         if(entry && count < 4){
            publicLinks.push(
               <a href={entry} key={count}>{entry}</a>
            )
         }
         count++;
      })
   }
   genPublicLinks();

   let privateLinks = [];
   const genPrivateLinks = () => {
      let count = 1;
      if(secureInfo){
         JSON.parse(secureInfo.eventinfo.privatelinks).forEach(entry => {
            if(entry && count < 4){
               privateLinks.push(
                  <a href={entry} key={count}>{entry}</a>
               )
            }
            count++;
         })
      }
   }
   genPrivateLinks();


   useEffect(() => {
      genPublicLinks();
      genPrivateLinks();
   }, [secureInfo, secureInfo.owner, modalInfo]);


   // Event title colors by event type.
   let eventTitle = '';
   switch(modalInfo.type){
      case 'Careers event':
         eventTitle = <p className="career eventTitle">{modalInfo.title}</p>
         break;
      case 'Conference':
         eventTitle = <p className="conference eventTitle">{modalInfo.title}</p>
         break;
      case 'Special interest talk':
         eventTitle = <p className="special eventTitle">{modalInfo.title}</p>
         break;
      case 'Revision':
         eventTitle = <p className="revision eventTitle">{modalInfo.title}</p>
         break;
      case 'Other':
         eventTitle = <p className="other eventTitle">{modalInfo.title}</p>
         break;
   }




   return(
         <Wrapper>
            <ButtonContainer>
               {/* Close modal button */}
               <img onClick={()=>modalHandler(false)} className="btnIcon closeButton" src={close}/>
               {/* If user created event, show admin contols. */}
               {(secureInfo.owner)
               ? <React.Fragment>
                     <img onClick={handleEdit} className="btnIcon editButton" src={eventEdit}/>
                     <img onClick={handleDelete} className="btnIcon deleteButton" src={eventDelete}/>
                  </React.Fragment>
                  : <React.Fragment/>
               }
            </ButtonContainer>

            <TitleContainer>
               {eventTitle}
            </TitleContainer>
            
            <InfoWrapper>
               
               {/* Event time */}
               <div className="eventInfoContainer">
                  <img className="icon"src={eventTime}/>
                  {`
                     ${printDate.toLocaleString('en-us', {  weekday: 'long' })}
                     ${modalInfo.day}, 
                     ${printDate.toLocaleString('default', { month: 'long' })}, 
                     ${modalInfo.year}.
                  `}
                  <span>{modalInfo.starttime} - {modalInfo.endtime}</span>
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
               {/* Public Links */}
               <div className="eventInfoContainer">
                  <img className="icon"src={eventLink}/>
                  <div className="linksContainer">{publicLinks}</div>
               </div>    
               {/* Private Links */}
               {(secureInfo)
                  ? <SecureInfoWrapper>
                     <div className="eventInfoContainer">
                     <img className="icon"src={eventSecure}/>
                        <div className="linksContainer">{privateLinks}</div>
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