import React, {useEffect} from 'react';
import styled from "styled-components";
import { getRecentEvents,modalHandler,getSecureEventInfo } from '../redux/actions/index';
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
   & .recentEventHeader{
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


const Sidebar = ({getRecentEvents, recentEntries, modalHandler, auth, getSecureEventInfo}) => {
   let recentEvents = [];
   let capReached = false;

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

   const toggleColorCodes = () => {
      
   }


   const genRecentEvents = () => {
      let counter = 0;
      if(recentEntries && capReached !== true){
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
               capReached = true;
            }
         })
      }         
   }
   genRecentEvents();

   useEffect(() => {
      if(!recentEntries){
         getRecentEvents();
      }
   }, []);


   return(
      <Wrapper>
         <EventsContainer>
            <h2 className="recentEventHeader">Popular Events</h2>
            {recentEvents}
         </EventsContainer>

         <EventsContainer>
            <h2 className="recentEventHeader">Recent Events</h2>
            {recentEvents}
         </EventsContainer>

         <EventsContainer>
            <h2 onClick={()=>toggleColorCodes()} className="recentEventHeader">Colour Codes:</h2>
            <div className="colorCodesContainer">
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



const mapStateToProps = (state) => ({ auth:state.authenticate, recentEntries:state.recentEvents.recentEntries });
export default connect(mapStateToProps, { getSecureEventInfo, modalHandler, getRecentEvents })(Sidebar);