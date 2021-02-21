import React from 'react';
import styled from "styled-components";

const Wrapper = styled.div`
   width:100%;
   max-height:46px;
   cursor: pointer;
   z-index:2;
   font-size:1rem;
   margin-bottom:5px;
   padding:5px;
   overflow:hidden;
   word-wrap: break-word;
   color: ${({ theme }) => theme.contrastText};
   transition: all 0.2s ease-in-out;

   & .career{
      background-color:${({ theme }) => theme.red};
   }
   & .conference{
      background-color:${({ theme }) => theme.blue};
   }
   & .special{
      background-color:${({ theme }) => theme.purple};
   }
   & .other{
      background-color:${({ theme }) => theme.orange};
   }
   & .revision{
      background-color:${({ theme }) => theme.green};
   }

`
// EVENT COLORS AND TYPES

// ORGANISATION TYPES
// organisation type is tied to the admins org type in database.
//
//
// careers event / RED
// conference / BLUE
// special interest talk / PURPLE
// other / ORANGE
// revision / training / GREEN
// 
// POULARITY BASED OFF OF CLICKS, NOt ATTENDING/INTERESTED.
// 
// 
// COLOR KEY IN THE SIDEBAR
// HIDE THE SIDEBAR
// DATE IS AMERICAN





const EventTag = ({ openViewEventModal, eventInfo }) => {
   const handleClick = (e) => {
      e.stopPropagation();
      openViewEventModal(eventInfo);
   }

   if(eventInfo.type === 'Careers event'){
      return(
         <Wrapper onClick={handleClick}>
            <p className="career">{eventInfo.title}</p>
         </Wrapper>
      )
   }
   else if(eventInfo.type === 'Conference'){
      return(
         <Wrapper onClick={handleClick}>
            <p className="conference">{eventInfo.title}</p>
         </Wrapper>
      )
   }
   else if(eventInfo.type === 'Special interest talk'){
      return(
         <Wrapper onClick={handleClick}>
            <p className="special">{eventInfo.title}</p>
         </Wrapper>
      )
   }
   else if(eventInfo.type === 'Revision'){
      return(
         <Wrapper onClick={handleClick}>
            <p className="revision">{eventInfo.title}</p>
         </Wrapper>
      )
   }
   else if(eventInfo.type === 'Other'){
      return(
         <Wrapper onClick={handleClick}>
            <p className="other">{eventInfo.title}</p>
         </Wrapper>
      )
   }
}

export default EventTag;
