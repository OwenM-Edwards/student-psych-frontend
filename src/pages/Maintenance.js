import React from 'react';
import styled from "styled-components";

const Wrapper = styled.div`
   width:100%;
   max-height:100%;
   max-width: 900px;
   display:flex;
   justify-content:center;
   align-items:center;   
`
const MaintenanceContainer = styled.div`
   background-color:${({ theme }) => theme.primary.main};
   color:${props => props.theme.fontColor};
   width:70%;
   height:auto;
   border-radius:10px;
   box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
   padding:30px;
   & h2 {
      margin-bottom:30px;
      font-size:2.3rem;
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
            <p>Sorry for the inconvenience but we are
               performing some maintenance at the moment. 
               If you need to you can always contact us at <a href="mailto:admin@studentpsychiatry.co.uk">admin@studentpsychiatry.co.uk</a>.
               Otherwise we'll be back online shortly.
            </p>


         </MaintenanceContainer>
      </Wrapper>
   )
}

export default Maintenance;