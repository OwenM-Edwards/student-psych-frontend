import React from 'react';
import styled from "styled-components";
import { connect } from 'react-redux';
import {deleteEntry} from '../redux/actions/index';
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

// Make the element draggable.
const EventModal = ({ createToast, setEditModalToggle, setModalToggle, modalInfo, setModalInfo, userinfo, deleteEntry }) => {
   let adminControls = false;
   // If current user is creater of event, allow edit/delete controls.
   if(modalInfo.userid === userinfo.id){
      adminControls = true
   }

   const handleDelete = () => {
      deleteEntry(modalInfo.id)
   }
   const handleEdit = () => {
      setModalToggle(false);
      setEditModalToggle(true);
   }

   // If logged in, display event info
   if(userinfo.id){
      return(
         <Wrapper>
            <StyledCloseButton onClick={()=>setModalToggle(false)}></StyledCloseButton>
            <h1>Name:{modalInfo.title}</h1>
            <p>Description:{modalInfo.description}</p>
            <span>ID:{modalInfo.id}</span>
            <span>Day:{modalInfo.day}</span>
            <span>Month:{modalInfo.month}</span>
            <span>Year:{modalInfo.year}</span>
            <span>Type:{modalInfo.type}</span>
            <span>Image:{modalInfo.image}</span>
            <span>UserID:{modalInfo.userid}</span>
            <span>Start Time:{modalInfo.starttime}</span>
            <span>End Time:{modalInfo.endtime}</span>
   
   
            {(adminControls)
               ? <StyledEditingContainer>
                     <button onClick={handleDelete} type="button" value="delete">Delete Event.</button>
                     <button onClick={handleEdit} type="button" value="edit">Edit Event.</button>
                 </StyledEditingContainer>
               : <React.Fragment/>
            }
         </Wrapper>
      )
   }
   // Else, display only name.
   else {
      createToast('Please login view full event info.')
      return(
         <Wrapper>
            <StyledCloseButton onClick={()=>setModalToggle(false)}></StyledCloseButton>
            <h1>Name:{modalInfo.title}</h1>
         </Wrapper>
      )
   }

   
}

const mapStateToProps = (state) => ({ userinfo:state.authenticate, entries:state.entries.entries.data });

export default connect(mapStateToProps, {deleteEntry})(EventModal);