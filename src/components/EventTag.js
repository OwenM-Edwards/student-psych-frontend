import React from 'react';
import styled from "styled-components";

const Wrapper = styled.div`
   width:100%;
   max-height:46px;
   background-color:${({ theme }) => theme.backgroundLight};
   cursor: pointer;
   z-index:2;
   font-size:1rem;
   margin-bottom:5px;
   padding:5px;
   overflow:hidden;
   word-wrap: break-word;

   color: ${({ theme }) => theme.contrastText};
   transition: all 0.2s ease-in-out;

`


const EventTag = ({ openViewEventModal, eventInfo }) => {
   const handleClick = (e) => {
      e.stopPropagation();
      openViewEventModal(eventInfo);
   }
   return(
      <Wrapper onClick={handleClick}>
         {eventInfo.title}
      </Wrapper>
   )
}

export default EventTag;
