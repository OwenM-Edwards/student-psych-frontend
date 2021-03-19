import React from 'react';
import styled from "styled-components";

const Wrapper = styled.div`
   width:100%;
   height:auto;
   z-index:2;
   font-size:0.8rem;
   color: ${({ theme }) => theme.contrastText};
   transition: all 0.2s ease-in-out;
   opacity:1;
   -webkit-user-select: none; /* Safari */        
   -moz-user-select: none; /* Firefox */
   -ms-user-select: none; /* IE10+/Edge */
   user-select: none; /* Standard */

   & .tag {
      width:100%;
      padding:5px 3px;
      margin-bottom:5px;
      cursor: pointer;
      border-radius:0 0 10px 10px;
      box-shadow: 0 5px 20px rgba(0,0,0,0.05), 0 6px 6px rgba(0,0,0,0.10);
      word-wrap: break-word;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap; 
   }
   & .career{
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
   else {
      return (
         null
      )
   }
}

export default EventTag;
