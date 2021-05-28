import React from 'react';
import styled from "styled-components";

const Wrapper = styled.div`
   align-items:center;   
   display:flex;
   height:100%;
   justify-content:center;
   width:100%;
`
const MaintenanceContainer = styled.div`
   background-color:${({ theme }) => theme.primary.main};
   border-radius:10px;
   box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
   color:${props => props.theme.fontColor};
   height:auto;
   padding:30px;
   width:70%;
   max-width: 900px;
   & h2 {
      font-size:2.3rem;
      margin-bottom:30px;
   }
   & p {
      font-size:1.1rem;
   }
   & a {
      color:${({ theme }) => theme.primary.light};
   }

`

const Maintenance = () => {
   return(
      <Wrapper>
         <MaintenanceContainer>
            <h2>We'll be back soon!</h2>
            <p>Sorry for the inconvenience, but we're
               performing some maintenance at the moment. 
               If you need to you can always contact us at <a href="mailto:admin@studentpsychiatry.co.uk">admin@studentpsychiatry.co.uk</a>.
               Otherwise we'll be back online shortly.
            </p>
         </MaintenanceContainer>
      </Wrapper>
   )
}

export default Maintenance;