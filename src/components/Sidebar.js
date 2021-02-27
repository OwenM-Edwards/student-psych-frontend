import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import { getRecentEvents,modalHandler,getSecureEventInfo,getPopularEvents } from '../redux/actions/index';
import { connect } from 'react-redux';
import { toast } from "react-toastify";

const Wrapper = styled.div`
   width:20%;
   max-width: 190px;
   min-width:190px;
   height:100%;
   z-index:2;
   background: ${({ theme }) => theme.backgroundContrast};
   box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
   text-align:center;
   display:flex;
   flex-direction:column;
   justify-content:space-between;
   align-content:space-between;
   padding-top:8%;
`
const EventsContainer = styled.div`
   width:100%;
   min-height:20%;
   display:flex;
   flex-direction:column;
   padding:10px;
   & .eventsHeader{
      font-size:1.1rem;
      margin-bottom:15px;
   }
   & .colorCode{
      border-radius:3px;
      opacity:0.9;
      margin-bottom:5px;
      color: ${({ theme }) => theme.contrastText};
      padding:4px;
      width:93%;
      align-self:center;
   }
   & .red {
      background: ${({ theme }) => theme.red};
   }
   & .blue {
      background: ${({ theme }) => theme.blue};
   }
   & .purple {
      background: ${({ theme }) => theme.purple};
   }
   & .orange {
      background: ${({ theme }) => theme.orange};
   }
   & .green {
      background: ${({ theme }) => theme.green};
   }
   & .colorCodesContainer{
      display:flex;
      flex-direction:column;
      overflow-y:hidden;
      transition: all 0.2s ease 0s;
   }
`
const EventTag = styled.div`
   opacity:0.9;
   width:95%;
   background-color:${({ theme }) => theme.backgroundLight};
   color: ${({ theme }) => theme.contrastText};
   padding:5px 0 5px 0;
   border-radius:3px;
   margin: 0 5px 5px 5px;
   cursor: pointer;
   overflow:hidden;
`


const Sidebar = ({ getPopularEvents, getRecentEvents, recentEntries, modalHandler, auth, getSecureEventInfo,popularEntries }) => {
   let recentEvents = [];
   let popularEvents = [];
   let recentCapReached = false;
   let popularCapReached = false;
   const [colorCodesToggle, setColorCodesToggle] = useState(false);

   const openViewEventModal = (eventInfo) => {
      if(auth.authenticated){
         async function f(){
            await getSecureEventInfo({
               eventInfo:eventInfo,
            }) 
         } 
         f(); 
         modalHandler({modalDisplay:'view', modalInfo: eventInfo});
      }
      else{
         toast.dismiss();
         toast.info('Please login to view full event.');
         modalHandler({modalDisplay:'view', modalInfo: eventInfo});
      }
   }

   const colorCodeStyleShown = {
      height: '100%',
   };
   const colorCodeStyleHidden = {
      height: '0px',
   };


   const genRecentEvents = () => {
      let counter = 0;
      if(recentEntries && recentCapReached !== true){
         recentEntries.forEach(entry => {
            if(counter < 3){
               switch(entry.type){
                  case 'Careers event':
                     recentEvents.push(
                        <EventTag onClick={()=>openViewEventModal(entry)} className="red" key={counter}>{entry.title}</EventTag>
                     )
                     break;
                  case 'Conference':
                     recentEvents.push(
                        <EventTag onClick={()=>openViewEventModal(entry)} className="blue" key={counter}>{entry.title}</EventTag>
                     )
                     break;
                  case 'Special interest talk':
                     recentEvents.push(
                        <EventTag onClick={()=>openViewEventModal(entry)} className="purple" key={counter}>{entry.title}</EventTag>
                     )
                     break;
                  case 'Revision':
                     recentEvents.push(
                        <EventTag onClick={()=>openViewEventModal(entry)} className="green" key={counter}>{entry.title}</EventTag>
                     )
                     break;
                  case 'Other':
                     recentEvents.push(
                        <EventTag onClick={()=>openViewEventModal(entry)} className="orange" key={counter}>{entry.title}</EventTag>
                     )
                     break;
               }
               counter++;
            }
            else {
               recentCapReached = true;
            }
         })
      }         
   }
   genRecentEvents();

   const genPopularEvents = () => {
      let counter = 0;
      if(popularEntries && popularCapReached !== true){
         popularEntries.forEach(entry => {
            if(counter < 3){
               switch(entry.type){
                  case 'Careers event':
                     popularEvents.push(
                        <EventTag onClick={()=>openViewEventModal(entry)} className="red" key={counter}>{entry.title}</EventTag>
                     )
                     break;
                  case 'Conference':
                     popularEvents.push(
                        <EventTag onClick={()=>openViewEventModal(entry)} className="blue" key={counter}>{entry.title}</EventTag>
                     )
                     break;
                  case 'Special interest talk':
                     popularEvents.push(
                        <EventTag onClick={()=>openViewEventModal(entry)} className="purple" key={counter}>{entry.title}</EventTag>
                     )
                     break;
                  case 'Revision':
                     popularEvents.push(
                        <EventTag onClick={()=>openViewEventModal(entry)} className="green" key={counter}>{entry.title}</EventTag>
                     )
                     break;
                  case 'Other':
                     popularEvents.push(
                        <EventTag onClick={()=>openViewEventModal(entry)} className="orange" key={counter}>{entry.title}</EventTag>
                     )
                     break;
               }
               counter++;
            }
            else {
               popularCapReached = true;
            }
         })
      }         
   }
   genPopularEvents();

   useEffect(() => {
      if(!recentEntries){
         getRecentEvents();
      }
      if(!popularEntries){
         getPopularEvents();
      }
   }, []);


   return(
      <Wrapper>
         {/* Popular Events */}
         <EventsContainer>
            <h2 className="eventsHeader">Popular Events</h2>
            {popularEvents}
         </EventsContainer>

         {/* Recent Events */}
         <EventsContainer>
            <h2 className="eventsHeader">Recent Events</h2>
            {recentEvents}
         </EventsContainer>

         <EventsContainer>
            <h2 onClick={()=>(colorCodesToggle) ? setColorCodesToggle(false) : setColorCodesToggle(true) } className="eventsHeader">Colour Codes:</h2>
            <div style={(colorCodesToggle) ? colorCodeStyleShown : colorCodeStyleHidden} className="colorCodesContainer">
               <p className="colorCode red">Careers Event</p>
               <p className="colorCode blue">Conference</p>
               <p className="colorCode purple">Special Interest Talk</p>
               <p className="colorCode green">Revision or Training</p>
               <p className="colorCode orange">Other</p>
            </div>
         </EventsContainer>
      </Wrapper>
   )
}



const mapStateToProps = (state) => ({ auth:state.authenticate, recentEntries:state.recentEvents.recentEntries, popularEntries:state.popularEvents.popularEntries });
export default connect(mapStateToProps, { getPopularEvents, getSecureEventInfo, modalHandler, getRecentEvents })(Sidebar);