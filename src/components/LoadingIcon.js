import React from 'react';
import styled from "styled-components";
import Loader from 'react-loader-spinner';

const Wrapper = styled.div`
   width:100%;
   height:100%;
   display:flex;
   align-content:center;
   justify-content:center;
`
const SpinnerContainer = styled.div`
   margin:0 auto;
   align-self:center;
`

// Pass type as prop, types can be found at https://www.npmjs.com/package/react-loader-spinner
// If no type provided, defaults to BallTriangle.
const LoadingIcon = ({type}) => {

   const spinnerColor = "#db8722";

   return(
      <Wrapper>
         <SpinnerContainer>
            <Loader type={(type) ? type : "BallTriangle"} color={spinnerColor} height={100} width={100} />
         </SpinnerContainer>
      </Wrapper>
   )
}

export default LoadingIcon;