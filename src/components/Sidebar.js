import React from 'react';
import styled from "styled-components";

const Wrapper = styled.div`
   width:20%;
   max-width: 200px;
   height:100%;
   z-index:-1;
   background: ${({ theme }) => theme.backgroundContrast};
   box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
   text-align:center;
   padding-top:50px;
`
const PopularEventsContainer = styled.div`
   width:100%;
   height:50%;
`
const RecentEventsContainer = styled.div`
   width:100%;
   height:50%;
`

const Sidebar = () => {
   return(
      <Wrapper>
         <PopularEventsContainer>
            Popular upcoming events.
         </PopularEventsContainer>

         <RecentEventsContainer>
            Recently added events.
         </RecentEventsContainer>
      </Wrapper>
   )
}

export default Sidebar;