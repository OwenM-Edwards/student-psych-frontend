import React, {useState} from 'react';
import styled from "styled-components";
import { connect } from 'react-redux';
import Select from 'react-select';
import { LoadingIcon } from './index';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { editEntry } from '../redux/actions/index';
const Wrapper = styled.div`
   position:absolute;
   width:400px;
   height:500px;
   background-color:white;
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
// Make the element draggable.

const EditEventModal = ({ userinfo, editEntry, addentrystate, setEditModalToggle, modalInfo }) => {
   const [ inputTitle, setInputTitle ] = useState(modalInfo.title);
   const [ inputStartTime, setInputStartTime ] = useState(modalInfo.starttime);
   const [ inputEndTime, setInputEndTime ] = useState(modalInfo.endtime);
   const [ inputType, setInputType ] = useState('type 1');
   const [ inputDescription, setInputDescription ] = useState(modalInfo.description);
   const eventTypes = [
      { value: 'type 1', label: 'Event Type One'},
      { value: 'type 2', label: 'Event Type Two'},
      { value: 'type 3', label: 'Event Type Three'},
   ];
   const toastId = 1


   const handleTitle = (e) => {

      setInputTitle(e.target.value);
   }
   const handleStartTime = (e) => {
      setInputStartTime(e.target.value);
   }
   const handleEndTime = (e) => {
      setInputEndTime(e.target.value);
   }
   const handleType = (e) => {
      setInputType(e.value);
   }
   const handleDescription = (e) => {
      setInputDescription(e.target.value);
   }
   const handleEdit = (e) => {
      e.preventDefault();
      editEntry({
         title:inputTitle,
         description:inputDescription,
         day:modalInfo.day,
         month:modalInfo.month,
         year:modalInfo.year,
         image:'image',
         type:inputType,
         userid:userinfo.id,
         startTime:inputStartTime,
         endTime:inputEndTime,
         entryid:modalInfo.id,
      });
   }


   // If error submitting
   if (addentrystate.error === true) {
      // Set timeout needed to push to bottom of call stack, wont appear otherwise.
      setTimeout(function(){
         toast.error('Error adding event, please try again later.',{
            toastId: toastId
         });
      },100); 
   } 

   if(!addentrystate.isFetching){
      return(
         <Wrapper>
            <ToastContainer/>
            EDIT EVENT MODAL
            <StyledCloseButton onClick={()=>setEditModalToggle(false)}></StyledCloseButton>
            <form onSubmit={handleEdit}>
               <fieldset>
                  <legend>Add Event.</legend>
                  <input
                     placeholder="Title"
                     type="text" 
                     name="event-title"
                     defaultValue={modalInfo.title}
                     required="required"
                     onChange={handleTitle}
                  />
   
                  <input
                     placeholder="Start Time"
                     type="time" name="start-event-time"
                     required="required"
                     defaultValue={modalInfo.starttime}
                     onChange={handleStartTime}
                  />
                  <input
                     placeholder="End Time"
                     type="time" name="end-event-time"
                     required="required"
                     defaultValue={modalInfo.endtime}
                     onChange={handleEndTime}
                  />
   
                  <Select
                     defaultValue={eventTypes[0]}
                     options={eventTypes}
                     isSearchable={false}
                     required="required"
                     onChange={handleType}
                  />
   
                  <textarea
                     placeholder="Event Description"
                     type="text"
                     defaultValue={modalInfo.description}
                     required="required"
                     minLength="3"
                     maxLength="80"
                     onChange={handleDescription}
                  />
                  <button type="submit">Submit</button>
               </fieldset>
            </form>
   
            {/* Name:{modalInfo.name}
            Description:{modalInfo.description}
            ID:{modalInfo.id}
            Day:{modalInfo.day}
            Month:{modalInfo.month} */}
            {/* 
               Close button.
               Description.
               Attachments.
               Restrictions. 
            */}
         </Wrapper>
      )
   }
   else {
      return(
         <Wrapper>
            <LoadingIcon/>
         </Wrapper>
      )
   }
   
}

const mapStateToProps = (state) => ({ userinfo:state.authenticate, addentrystate: state.addEntry });

export default connect(mapStateToProps, {editEntry})(EditEventModal);