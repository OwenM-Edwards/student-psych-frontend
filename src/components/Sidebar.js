import React, {useEffect, useState} from 'react';
import styled, { ThemeProvider } from "styled-components";
import { getRecentEvents,modalHandler,getSecureEventInfo,getPopularEvents } from '../redux/actions/index';
import { connect } from 'react-redux';
import { toast } from "react-toastify";
import { menu } from "../assets/index.js";



const Wrapper = styled.div`
   width:${props => props.theme.width};
   max-width: 150px;
   height:100%;
   z-index:0;
   background:#1f2933;
   /* box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23); */
   text-align:center;
   display:flex;
   flex-direction:column;
   transition: width 0.2s ease-in-out;
   justify-content:flex-start;
   
   @media (max-width: 900px) {
      width:0px;
      overflow:hidden;
   }

   & .arrowContainer {
      width:100%;
      display:flex;
      flex-direction:row;
      justify-content:flex-end;
      justify-self:flex-start;
      transition: all 0.2s ease-in-out;
      & img{
         width:30px;
         transition: all 0.2s ease-in-out;
         transform: ${props => props.theme.transform};
         cursor:pointer;
         &:hover {
            scale:0.9;
         }
      }
   }
   
`
const EventsContainer = styled.div`
   width:100%;
   height:auto;
   display:flex;
   opacity:${props => props.theme.opacity};
   flex-direction:column;
   transition: all 0.2s ease-in-out;
   padding-top:10px;
   padding-right:3px;
   & .eventsHeader{
      font-size:1.1rem;
      margin-bottom:15px;
      
   }
   & .colorCode{
      border-radius:3px;
      opacity:0.8;
      margin-bottom:5px;
      color: ${({ theme }) => theme.contrastText};
      padding:5px 0 5px 0;
      width:93%;
      align-self:center;
   }
   & .careers {
      background: ${({ theme }) => theme.colorCodes.careers};
   }
   & .conference {
      background: ${({ theme }) => theme.colorCodes.conference};
   }
   & .special {
      background: ${({ theme }) => theme.colorCodes.special};
   }
   & .revision {
      background: ${({ theme }) => theme.colorCodes.revision};
   }
   & .other {
      background: ${({ theme }) => theme.colorCodes.other};
   }
   & .colorCodesContainer{
      display:flex;
      flex-direction:column;
      overflow-y:hidden;
      transition: all 0.2s ease 0s;
      justify-content:flex-end;
      display:none;
   }
`
const EventTag = styled.div`
   opacity:0.9;
   width:95%;
   background-color:${({ theme }) => theme.backgroundLight};
   color: ${({ theme }) => theme.contrastText};
   padding:5px 3px;
   border-radius:3px;
   margin: 0 5px 5px 5px;
   cursor: pointer;
   overflow:hidden;
   -webkit-user-select: none; /* Safari */        
   -moz-user-select: none; /* Firefox */
   -ms-user-select: none; /* IE10+/Edge */
   user-select: none; /* Standard */
   overflow: hidden;
   text-overflow: ellipsis;
   white-space: nowrap;
`
const shown = {
   width:"20%",
}
const hidden = {
   width: "30px",
   opacity: "0",
   transform: "rotate(180deg)",
}


const Sidebar = ({ getPopularEvents, getRecentEvents, recentEntries, modalHandler, auth, getSecureEventInfo,popularEntries }) => {
   let recentEvents = [];
   let popularEvents = [];
   let recentCapReached = false;
   let popularCapReached = false;
   const [colorCodesToggle, setColorCodesToggle] = useState(false);
   const [sidebarToggle, setSidebarToggle] = useState(true);

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
         toast.info('Please login to view private event links.');
         modalHandler({modalDisplay:'view', modalInfo: eventInfo});
      }
   }

   const genRecentEvents = () => {
      let counter = 0;
      if(recentEntries && recentCapReached !== true){
         recentEntries.forEach(entry => {
            if(counter < 7){
               let currentDate = new Date();
               if(currentDate.getMonth() + 1 <= entry.month && currentDate.getFullYear() <= entry.year){
                  switch(entry.type){
                     case 'Careers event':
                        recentEvents.push(
                           <EventTag onClick={()=>openViewEventModal(entry)} className="careers" key={counter}>{entry.title}</EventTag>
                        )
                        break;
                     case 'Conference':
                        recentEvents.push(
                           <EventTag onClick={()=>openViewEventModal(entry)} className="conference" key={counter}>{entry.title}</EventTag>
                        )
                        break;
                     case 'Special interest talk':
                        recentEvents.push(
                           <EventTag onClick={()=>openViewEventModal(entry)} className="special" key={counter}>{entry.title}</EventTag>
                        )
                        break;
                     case 'Revision':
                        recentEvents.push(
                           <EventTag onClick={()=>openViewEventModal(entry)} className="revision" key={counter}>{entry.title}</EventTag>
                        )
                        break;
                     case 'Other':
                        recentEvents.push(
                           <EventTag onClick={()=>openViewEventModal(entry)} className="other" key={counter}>{entry.title}</EventTag>
                        )
                        break;
                  }
                  counter++;
               }
               
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
            if(counter < 7){
               let currentDate = new Date();
               if(currentDate.getMonth() + 1 <= entry.month && currentDate.getFullYear() <= entry.year){
                  switch(entry.type){
                     case 'Careers event':
                        popularEvents.push(
                           <EventTag onClick={()=>openViewEventModal(entry)} className="careers" key={counter}>{entry.title}</EventTag>
                        )
                        break;
                     case 'Conference':
                        popularEvents.push(
                           <EventTag onClick={()=>openViewEventModal(entry)} className="conference" key={counter}>{entry.title}</EventTag>
                        )
                        break;
                     case 'Special interest talk':
                        popularEvents.push(
                           <EventTag onClick={()=>openViewEventModal(entry)} className="special" key={counter}>{entry.title}</EventTag>
                        )
                        break;
                     case 'Revision':
                        popularEvents.push(
                           <EventTag onClick={()=>openViewEventModal(entry)} className="revision" key={counter}>{entry.title}</EventTag>
                        )
                        break;
                     case 'Other':
                        popularEvents.push(
                           <EventTag onClick={()=>openViewEventModal(entry)} className="other" key={counter}>{entry.title}</EventTag>
                        )
                        break;
                  }
                  counter++;
               }
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


   const toggleSidebar = () => {
      if(sidebarToggle){
         setSidebarToggle(false)
      }
      else {
         setSidebarToggle(true)
      }
   }

   return(
      <ThemeProvider theme={sidebarToggle ? shown : hidden}>
         <Wrapper>
            <div className="arrowContainer">
               <img onClick={()=>toggleSidebar()} src={menu}/>
            </div>
            

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

            {/* <EventsContainer>
               <h2 className="eventsHeader">Colour Codes:</h2>
               <div className="colorCodesContainer">
                  <p className="colorCode red">Careers Event</p><div className=""></div>
                  <p className="colorCode blue">Conference</p>
                  <p className="colorCode purple">Special Interest Talk</p>
                  <p className="colorCode green">Revision or Training</p>
                  <p className="colorCode orange">Other</p>
               </div>
            </EventsContainer> */}
         </Wrapper>
      </ThemeProvider>  
   )
}



const mapStateToProps = (state) => ({ auth:state.authenticate, recentEntries:state.recentEvents.recentEntries, popularEntries:state.popularEvents.popularEntries });
export default connect(mapStateToProps, { getPopularEvents, getSecureEventInfo, modalHandler, getRecentEvents })(Sidebar);