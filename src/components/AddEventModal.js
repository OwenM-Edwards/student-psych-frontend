import React, {useState} from 'react';
import styled from "styled-components";
import { connect } from 'react-redux';
import Select from 'react-select';
import { LoadingIcon } from './index';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addEntry } from '../redux/actions/index';
const Wrapper = styled.div`
   position:absolute;
   width:400px;
   height:500px;
   background-color:white;
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
// Make the element draggable.

const AddEventModal = ({ userinfo, addEntry, addentrystate, setaddModalToggle, modalInfo }) => {
   const [ inputTitle, setInputTitle ] = useState('');
   const [ inputStartTime, setInputStartTime ] = useState('');
   const [ inputEndTime, setInputEndTime ] = useState('');
   const [ inputType, setInputType ] = useState('type 1');
   const [ inputDescription, setInputDescription ] = useState('');
   const [ inputOrganisation, setInputOrganisation ] = useState('');
   const [ inputLink, setInputLink ] = useState('');
   const [ inputSocialLink, setInputSocialLink ] = useState('');
   const eventTypes = [
      { value: 'type 1', label: 'Event Type One'},
      { value: 'type 2', label: 'Event Type Two'},
      { value: 'type 3', label: 'Event Type Three'},
   ];
   const toastId = 1


   const handleTitle = (e) => {
      setInputTitle(e.target.value);
   }
   const handleDescription = (e) => {
      setInputDescription(e.target.value);
   }
   const handleOrganisation = (e) => {
      setInputOrganisation(e.target.value);
   }
   const handleLink = (e) => {
      setInputLink(e.target.value);
   }
   const handleSocialLink = (e) => {
      setInputSocialLink(e.target.value);
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

   const handleSubmit = (e) => {
      e.preventDefault();
      addEntry({
         title:inputTitle,
         description:inputDescription,
         organistion:inputOrganisation,
         link:inputLink,
         sociallink:inputSocialLink,
         day:modalInfo.day,
         month:modalInfo.month,
         year:modalInfo.year,
         image:'image',
         type:inputType,
         userid:userinfo.id,
         startTime:inputStartTime,
         endTime:inputEndTime,
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
            MOD EVENT MODAL
            <StyledCloseButton onClick={()=>setaddModalToggle(false)}></StyledCloseButton>
            <form onSubmit={handleSubmit}>
               <fieldset>
                  <legend>Add Event.</legend>
                  <input
                     type="checkbox" 
                     name="event-title"
                     required="required"
                     onChange={handleTitle}
                     id="private"
                     value="private"
                  />
                  <label htmlFor="private">Private</label>
                  <input
                     placeholder="Title"
                     type="text" 
                     name="event-title"
                     required="required"
                     onChange={handleTitle}
                  />
                  <textarea
                     placeholder="Event Description"
                     type="text"
                     required="required"
                     minLength="3"
                     maxLength="80"
                     onChange={handleDescription}
                  />
                  <input
                     placeholder="Organisation"
                     type="text" 
                     name="event-organisation"
                     required="required"
                     onChange={handleOrganisation}
                  />
                  <input
                     placeholder="Link"
                     type="text" 
                     name="event-link"
                     required="required"
                     onChange={handleLink}
                  />
                  <input
                     placeholder="Social Media Link"
                     type="text" 
                     name="event-sociallink"
                     required="required"
                     onChange={handleSocialLink}
                  />
   
                  <input
                     placeholder="Start Time"
                     type="time" name="start-event-time"
                     required="required"
                     onChange={handleStartTime}
                  />
                  <input
                     placeholder="End Time"
                     type="time" name="end-event-time"
                     required="required"
                     onChange={handleEndTime}
                  />
   
                  <Select
                     defaultValue={eventTypes[0]}
                     options={eventTypes}
                     isSearchable={false}
                     required="required"
                     onChange={handleType}
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

export default connect(mapStateToProps, {addEntry})(AddEventModal);