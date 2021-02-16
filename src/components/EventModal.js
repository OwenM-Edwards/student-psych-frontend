import React from 'react';
import styled from "styled-components";
import { connect } from 'react-redux';

const Wrapper = styled.div`
   position:absolute;
   width:400px;
   height:500px;
   background-color:white;
   display:flex;
   flex-direction:column;
   padding:10px;
   z-index:2;
`
const StyledCloseButton = styled.div`
   position:absolute;
   top:0;
   right:0;
   width:20px;
   height:20px;
   background-color:red;
   cursor: pointer;
`
const StyledEditingContainer = styled.div`
`
const SecureInfoWrapper = styled.div`
   display:flex;
   flex-direction:column;
   width:100%;
   height:auto;
`
const InfoWrapper = styled.div`
   display:flex;
   flex-direction:column;
   width:100%;
   height:auto;
`

const EventModal = ({ secureInfo, handleDeleteEvent, setModalToggle, modalInfo, auth }) => {
   const handleDelete = () => {
      handleDeleteEvent(secureInfo.id)
   }
   
   // Open the edit modal.
   const handleEdit = () => {
      setModalToggle('edit');
   }


   // If logged in, display event info
   return(
      <Wrapper>
         <StyledCloseButton onClick={()=>setModalToggle(false)}></StyledCloseButton>
         PUBLIC INFO
         <InfoWrapper>
            <h1>Name:{modalInfo.title}</h1>
            <span>Description:{modalInfo.description}</span>
         </InfoWrapper>


         {(secureInfo)
            ? <SecureInfoWrapper>
               SECURE INFO
               <span>ID:{secureInfo.id}</span>
               <span>Day:{secureInfo.day}</span>
               <span>Month:{secureInfo.month}</span>
               <span>Year:{secureInfo.year}</span>
               <span>Type:{secureInfo.type}</span>
               <span>Image:{secureInfo.image}</span>
               <span>Start Time:{secureInfo.starttime}</span>
               <span>End Time:{secureInfo.endtime}</span>
            </SecureInfoWrapper>
            : <React.Fragment/>
         }

         {/* If user created event, show admin contols. */}
         {(modalInfo.userid === auth.user.id)
            ? <StyledEditingContainer>
                  <button onClick={handleDelete} type="button" value="delete">Delete Event.</button>
                  <button onClick={handleEdit} type="button" value="edit">Edit Event.</button>
               </StyledEditingContainer>
            : <React.Fragment/>
         }
      </Wrapper>
   ) 
}

const mapStateToProps = (state) => ({ secureInfo:state.secureEntry.secureInfo, auth:state.authenticate });
export default connect(mapStateToProps)(EventModal);