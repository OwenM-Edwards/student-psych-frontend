import React from 'react';
import styled from "styled-components";

const Wrapper = styled.div`
   width:100%;
   max-height:46px;
   z-index:2;
   font-size:1rem;
   color: ${({ theme }) => theme.contrastText};
   transition: all 0.2s ease-in-out;
   opacity:0.9;
   & .tag {
      padding:5px;
      overflow:hidden;
      word-wrap: break-word;
      margin-bottom:5px;
      cursor: pointer;
      border-radius:0 0 10px 10px;
      box-shadow: 0 5px 20px rgba(0,0,0,0.05), 0 6px 6px rgba(0,0,0,0.10);
   }
   & .career{
      background-color:${({ theme }) => theme.red};
      height:100%;
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
// POULARITY BASED OFF OF CLICKS, NOt ATTENDING/INTERESTED.
// HIDE THE SIDEBAR





const EventTag = ({ openViewEventModal, eventInfo }) => {
   const handleClick = (e) => {
      e.stopPropagation();
      openViewEventModal(eventInfo);
   }

   if(eventInfo.type === 'Careers event'){
      return(
         <Wrapper onClick={handleClick}>
            <p className="tag career">{eventInfo.title}</p>
         </Wrapper>
      )
   }
   else if(eventInfo.type === 'Conference'){
      return(
         <Wrapper onClick={handleClick}>
            <p className="tag conference">{eventInfo.title}</p>
         </Wrapper>
      )
   }
   else if(eventInfo.type === 'Special interest talk'){
      return(
         <Wrapper onClick={handleClick}>
            <p className="tag special">{eventInfo.title}</p>
         </Wrapper>
      )
   }
   else if(eventInfo.type === 'Revision'){
      return(
         <Wrapper onClick={handleClick}>
            <p className="tag revision">{eventInfo.title}</p>
         </Wrapper>
      )
   }
   else if(eventInfo.type === 'Other'){
      return(
         <Wrapper onClick={handleClick}>
            <p className="tag other">{eventInfo.title}</p>
         </Wrapper>
      )
   }
}

export default EventTag;
