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
   left:45%;
   width:400px;
   height:auto;
   background:${({ theme }) => theme.primary.main};
   color:${({ theme }) => theme.primary.offWhite};
   display:flex;
   flex-direction:column;
   z-index:2;
   border-radius:10px;
   box-shadow: 0 10px 20px rgba(0,0,0,0.4), 0 6px 6px rgba(0,0,0,0.23);
   @media (max-width: 700px) {
      top:20%;
      left:0%;
      width:100%;
      height:100%;
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
         & a {
            color:${({ theme }) => theme.primary.light};
         }
      }
      & span {
         margin-right:20px;
      }
   }
   & .eventDescription {
      width:88%;
      margin-top:5px;
      height:auto;
      box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
      transition: all 0.3s cubic-bezier(.25,.8,.25,1);
      padding:10px;
      border-radius:10px;
      position: relative;
      left:25px;
      margin-bottom:20px;
   }
`
const ButtonContainer = styled.div`
   position: absolute;
   top:5px;
   height:30px;
   width:84px;
   border-radius:5px;
   right:10px;
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
      right:58px;
      scale:0.95;
   }
   & .deleteButton{
      top:4px;
      right:30px;
   }

`
const TitleContainer = styled.div`
   & .eventTitle{
      background-color:#323f4b;
      border-radius:5px 5px 0 0;
      color: ${({ theme }) => theme.contrastText};
      padding:20px;
      padding-top:40px;
      font-size:1.3rem;
      background-color:red;
      width:100%;
      word-wrap:break-word;
      box-shadow: 0 2px 1px rgba(0,0,0,0.4), 0 2px 2px rgba(0,0,0,0.20);
      height:auto;
      z-index:9;
      margin-bottom:5px;
   }
   & .careers{
      background-color:${({ theme }) => theme.colorCodes.careers};
   }
   & .conference{
      background-color:${({ theme }) => theme.colorCodes.conference};
   }
   & .special{
      background-color:${({ theme }) => theme.colorCodes.special};
   }
   & .other{
      background-color:${({ theme }) => theme.colorCodes.other};
   }
   & .revision{
      background-color:${({ theme }) => theme.colorCodes.revision};
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
      let count = 0;
      JSON.parse(modalInfo.publiclinks).forEach(entry => {
         if(entry && count < 3){
            publicLinks.push(
               <a href={entry} target="_blank" key={count}>{JSON.parse(modalInfo.publiclinks)[count + 3]}</a>
            )
         }
         count++;
      })
   }
   genPublicLinks();

   let privateLinks = [];
   const genPrivateLinks = () => {
      let count = 0;
      if(secureInfo){
         JSON.parse(secureInfo.eventinfo.privatelinks).forEach(entry => {
            if(entry && count < 3){
               privateLinks.push(
                  <a href={entry} key={count}>{JSON.parse(secureInfo.eventinfo.privatelinks)[count + 3]}</a>
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
         eventTitle = <p className="careers eventTitle">{modalInfo.title}</p>
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
                  <span>{modalInfo.starttime} - {modalInfo.endtime}</span>
                  {`
                     ${printDate.toLocaleString('en-us', {  weekday: 'long' })}
                     ${modalInfo.day}, 
                     ${printDate.toLocaleString('default', { month: 'long' })}, 
                     ${modalInfo.year}
                  `}
               </div>
               {/* Description */}
                  <div className="eventInfoContainer">
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