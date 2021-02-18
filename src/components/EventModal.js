import React from 'react';
import styled from "styled-components";
import { connect } from 'react-redux';
import {modalHandler,deleteEntry} from '../redux/actions/index';

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

const EventModal = ({ modalHandler, secureInfo,deleteEntry, handleDeleteEvent, setModalToggle, modalState, auth }) => {
   const modalInfo = modalState.modalInfo;
   
   const handleDelete = () => {
      deleteEntry(secureInfo.eventinfo.id);
      modalHandler(false);
   }
   
   // Open the edit modal.
   const handleEdit = () => {
      modalHandler({modalDisplay:'edit', modalInfo: modalState.modalInfo});
   }


   // If logged in, display event info
   return(
      <Wrapper>
         <StyledCloseButton onClick={()=>modalHandler(false)}></StyledCloseButton>
         PUBLIC INFO
         <InfoWrapper>
            <h1>Name:{modalInfo.title}</h1>
            <span>Description:{modalInfo.description}</span>
         </InfoWrapper>


         {(secureInfo)
            ? <SecureInfoWrapper>
               SECURE INFO
               <span>ID:{secureInfo.eventinfo.id}</span>
               <span>Day:{secureInfo.eventinfo.day}</span>
               <span>Month:{secureInfo.eventinfo.month}</span>
               <span>Year:{secureInfo.eventinfo.year}</span>
               <span>Type:{secureInfo.eventinfo.type}</span>
               <span>Image:{secureInfo.eventinfo.image}</span>
               <span>Start Time:{secureInfo.eventinfo.starttime}</span>
               <span>End Time:{secureInfo.eventinfo.endtime}</span>
            </SecureInfoWrapper>
            : <React.Fragment/>
         }

         {/* If user created event, show admin contols. */}
         {(secureInfo && secureInfo.owner)
            ? <StyledEditingContainer>
                  <button onClick={handleDelete} type="button" value="delete">Delete Event.</button>
                  <button onClick={handleEdit} type="button" value="edit">Edit Event.</button>
               </StyledEditingContainer>
            : <React.Fragment/>
         }
      </Wrapper>
   ) 
}

const mapStateToProps = (state) => ({ modalState:state.modal, secureInfo:state.secureEntry.secureInfo, auth:state.authenticate });
export default connect(mapStateToProps,{deleteEntry,modalHandler})(EventModal);