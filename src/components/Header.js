import React from 'react';
import styled from "styled-components";

const Wrapper = styled.div`
   width:100%;
   height:100%;
   display:flex;
   flex-direction:row;
   flex-wrap:wrap;
   background-color:pink;
`

const Header = () => {
   return(
      <Wrapper>
         Student Psychiatry Events
      </Wrapper>
   )
}

export default Header;