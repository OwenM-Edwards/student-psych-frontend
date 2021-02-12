import React from 'react';
import styled from "styled-components";

const Wrapper = styled.div`
   width:100%;
   height:20px;
   background-color:white;
   cursor: pointer;
   z-index:2;
   font-size:1rem;
`

const EventTag = ({ handleTagClick, eventInfo }) => {
   return(
      <Wrapper onClick={handleTagClick}>
         {eventInfo.title}
      </Wrapper>
   )
}

export default EventTag;