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
// EXTRA REGISTER INFO
// confirm password
// extra info about admin etc
// I am a - medical student / doctor / student studying alternate degree, other
// 
// 
// REMOVE SEARCH FIELD, SEARCH BY BOTH BY DEFUALT.
// 
// COLOR KEY IN THE SIDEBAR
// HIDE THE SIDEBAR
// DATE IS AMERICAN





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
