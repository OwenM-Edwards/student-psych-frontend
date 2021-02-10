import React from 'react';
import styled from "styled-components";

const Wrapper = styled.div`
   width:100%;
   height:100;

`

const Sidebar = ({genBoxes}) => {
   return(
      <Wrapper>
         <button onClick={()=>genBoxes()}></button>
      </Wrapper>
   )
}

export default Sidebar;