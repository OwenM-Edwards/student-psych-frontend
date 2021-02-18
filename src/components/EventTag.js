import React from 'react';
import styled from "styled-components";

const Wrapper = styled.div`
   width:100%;
   max-width:100%;
   height:auto;
   background-color:white;
   cursor: pointer;
   z-index:2;
   font-size:1rem;
   margin-bottom:5px;
   padding:2px;
   overflow-x:hidden;
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
