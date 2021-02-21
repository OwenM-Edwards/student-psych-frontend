import React, {useState} from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import {
   add,
   remove,
} from '../assets/index';
import {
   close,
   eventDate,
   eventDescription,
   eventLink,
   eventOrganisation,
   eventSecure,
   eventTime,
   eventType,
   eventEdit,
   eventDelete,
} from '../assets/index';


const Wrapper = styled.div`
   width:100%;
   height:auto;
   background-color:${({ theme }) => theme.backgroundLight};
   cursor: pointer;
   font-size:1rem;
   margin-bottom:5px;
   word-wrap: break-word;
   color: ${({ theme }) => theme.contrastText};
   z-index:3;

   & .formInput {
      padding:10px;
      margin-bottom:5px;
   }
   & .inputForm{
      display:flex;
      flex-direction:column;
      flex-wrap:nowrap;
      padding:10px;
      border: 0;
      margin-top:10px;
   }
   & .eventTimeContainer{
      width:50%;
      align-self:flex-start;
      display:flex;  
   }
   & .formTime{
         width:50%;
         height:100%;
      }
   & .formDescription{
      resize: none;
   }
   & .formSubmitButton {
      width:100px;
      height:40px;
      color: #2b2b2b;
      text-transform: uppercase;
      text-decoration: none;
      background: white;
      padding: 5px;
      border-radius:5px;
      border: none;
      transition: all 0.4s ease 0s;
      margin-top:10px;
      cursor:pointer;
      &:hover{
         scale:0.98;
      }
   }
   & .formLinks {
      width:100%;
      height: auto;
      display:flex;
      flex-wrap:wrap;
      margin-bottom:5px;
      margin-top:10px;
   }
   & .formLink {
      width:40%;
      padding:5px;
      height:30px;
      margin-bottom:5px;
   }
   & .formLinkType {
      width:40%;
      height:30px;
      margin-bottom:5px;
      margin-right:5px;
   }

   & .icon {
      width:5%;
      height:23px;
      justify-self:center;
      align-self:center;
   }
`

// HandleSubmitEvent is the event to fire on form completion.
// Default options, enter false if form starts empty.

const EventForm = ({handleSubmitEvent, defaultOptions}) => {
   
   const {title, organisation, description, day, month, year, image, type, starttime, endtime} = (defaultOptions) ? defaultOptions : '';
   

   const { register, handleSubmit, watch, errors } = useForm();
   const [publicCount, setPublicCount] = useState(1);
   const [privateCount, setPrivateCount] = useState(1);
   const [publicInfoState, setPublicInfoState] = useState(["","",""]);
   const [privateInfoState, setPrivateInfoState] = useState(["","",""]);
   const onSubmit = (data) => {
      // Sets the default values of the dynamically generated link inputs, to current values.
      // This persists them in state, and if form failed validation, they wont vanish.
      setPublicInfoState([data.PublicLinkInfo0,data.PublicLinkInfo1,data.PublicLinkInfo2])
      setPrivateInfoState([data.PrivateLinkInfo0,data.PrivateLinkInfo1,data.PrivateLinkInfo2])
      handleSubmitEvent(data);
   }
   const handleIncreaseLinks = (type, val) => {
      if(type==='public'){
         setPublicCount(val)
      }
      else {
         setPrivateCount(val)
      }
   }
   const handleDynamicLinks = (e) => {
      if(e.target.placeholder === 'Public Link'){
         let temp = publicInfoState;
         temp[e.target.id] = e.target.value;
         setPublicInfoState(temp);
      }
      else {
         let temp = privateInfoState;
         temp[e.target.id] = e.target.value;
         setPrivateInfoState(temp);
      }
   }


   const Link = ({type, id}) => {
      return (
         <React.Fragment>
            <input
               className="formLink" 
               placeholder={`${type} Link`}
               type="text" 
               name={`${type}LinkInfo${id}`}
               ref={register}
               defaultValue={(type === 'Public' ? publicInfoState[id] : privateInfoState[id] )}
               onChange={handleDynamicLinks}
               id={id}
            />
            <select 
               className="formLinkType" 
               name={`${type}LinkType${id}`}
               ref={register}
            >
               <option value="1">Option 1</option>
               <option value="2">Option 2</option>
            </select>
         </React.Fragment>
      )
   }
   return (
      <Wrapper>
         <form onSubmit={handleSubmit(onSubmit)}>
            <fieldset className="inputForm">
               {/* Title */}
               <input
                  className="formInput"
                  type="text"
                  placeholder="Title - 50 characters."
                  defaultValue={title}
                  name="eventTitle"
                  minLength="4"
                  maxlength="50"
                  ref={register({ required:true })}
               />
               {/* Description */}
               <textarea
                  className="formDescription formInput"
                  type="text"
                  defaultValue={description}
                  placeholder="Description - 90 characters."
                  name="eventDescription"
                  minLength="4"
                  maxlength="90"
                  ref={register({ required:true })}
               />
               {/* Organisation */}
               <input
                  className="formInput"
                  type="text"
                  defaultValue={organisation}
                  placeholder="Organisation"
                  maxlength="30"
                  name="eventOrganisation"
                  ref={register({ required:true })}
               />
               {/* Image */}
               <input
                  name="formInput"
                  className="formInput"
                  defaultValue={image}
                  type="file"
                  accept="image/png, image/jpeg"
                  id="file"
                  ref={register()}
               />

               <div className="eventTimeContainer">
                  {/* Start Time */}
                  <input
                     className="formTime formInput"
                     placeholder="Start Time"
                     defaultValue={starttime}
                     type="time" 
                     name="eventStartTime"
                     ref={register({ required:true })}
                  />
                  {/* End Time */}
                  <input
                     className="formTime formInput"
                     placeholder="End Time"
                     defaultValue={endtime}
                     type="time" 
                     name="eventEndTime"
                     ref={register({ required:true })}
                  />
               </div>

               {/* Event Type */}
               <select 
                  name="eventType" 
                  className="formInput" 
                  ref={register}
               >
                  <option value="Careers event">Careers event</option>
                  <option value="Conference">Conference</option>
                  <option value="Special interest talk">Special interest talk</option>
                  <option value="Revision">Revision</option>
                  <option value="Other">Other</option>
               </select>

               <div className="formLinks">
                  {/* Public Links */}
                  {[...Array(publicCount)].map((x, i) => <Link type="Public" id={i} key={i}/> )}
                  {(publicCount > 2)
                     ? <React.Fragment/>
                     : <img className="icon" onClick={()=>handleIncreaseLinks('public', publicCount + 1)} src={add}/> 
                  }
                  {(publicCount > 1)
                     ? <img className="icon" onClick={()=>handleIncreaseLinks('public', publicCount - 1)} src={remove}/> 
                     : <React.Fragment/>
                  }
               </div>
               
               <div className="formLinks">
                  {/* Private Links */}
                  {[...Array(privateCount)].map((x, i) => <Link type="Private" id={i} key={i}/> )}
                  {(privateCount > 2)
                     ? <React.Fragment/>
                     : <img className="icon" onClick={()=> handleIncreaseLinks('private', privateCount + 1)} src={add}/> 
                  }
                  {(privateCount > 1)
                     ? <img className="icon" onClick={()=>handleIncreaseLinks('private', privateCount - 1)} src={remove}/> 
                     : <React.Fragment/>
                  }
               </div>


               {/* Submit Button */}
               <input value="Submit" className="formSubmitButton formInput" type="submit" />
            </fieldset>
         </form>
      </Wrapper>

   )
}


export default EventForm;