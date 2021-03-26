import styled, { ThemeProvider } from "styled-components";

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

export default function createEventTags(entry, counter, openViewEventModal){
   switch(entry.type){
      case 'Careers event':
         return(
            <EventTag onClick={()=>openViewEventModal(entry)} className="careers" key={counter}>{entry.title}</EventTag>
         )
      case 'Conference':
         return(
            <EventTag onClick={()=>openViewEventModal(entry)} className="conference" key={counter}>{entry.title}</EventTag>
         )
      case 'Special interest talk':
         return(
            <EventTag onClick={()=>openViewEventModal(entry)} className="special" key={counter}>{entry.title}</EventTag>
         )
      case 'Revision':
         return(
            <EventTag onClick={()=>openViewEventModal(entry)} className="revision" key={counter}>{entry.title}</EventTag>
         )
      case 'Other':
         return(
            <EventTag onClick={()=>openViewEventModal(entry)} className="other" key={counter}>{entry.title}</EventTag>
         )
   }
}