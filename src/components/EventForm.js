import React from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";


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
   display:flex;
   & .formTitle {
      width:100%;
      background-color:white;
   }
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
      width:100%;
      align-self:flex-start;
      display:flex;  
   }
   & .formTime{
         width:100%;
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
      width:50%;
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
      width:23px;
      position: relative;
      bottom:2px;
      height:23px;
      justify-self:center;
      align-self:center;
   }
`

// HandleSubmitEvent is the event to fire on form completion.
// Default options, enter false if form starts empty.
const EventForm = ({handleSubmitEvent, defaultOptions, addEntryState}) => {
   
   const {privatelinks, publiclinks, title, organisation, description, day, month, year, image, type, starttime, endtime} = (defaultOptions) ? defaultOptions : false;
   let parsedPrivateLinks;
   let parsedPublicLinks;
   if(privatelinks){
      parsedPrivateLinks = JSON.parse(privatelinks);
   }
   if(publiclinks){
      parsedPublicLinks = JSON.parse(publiclinks);
   }
   const { register, handleSubmit, watch, errors } = useForm();

   const onSubmit = async (data) => {
      await handleSubmitEvent(data);
   }

   return (
      <Wrapper>
         <form onSubmit={handleSubmit(onSubmit)}>
            <fieldset className="inputForm">
               {/* Title */}
               <input
                  className="formInput"
                  type="text"
                  placeholder="Title - 200 characters."
                  defaultValue={title}
                  name="eventTitle"
                  minLength="4"
                  maxLength="200"
                  ref={register({ required:true })}
                  disable={addEntryState}
               />
               {/* Description */}
               <textarea
                  className="formDescription formInput"
                  type="text"
                  defaultValue={description}
                  placeholder="Description - 600 characters."
                  name="eventDescription"
                  minLength="4"
                  maxLength="600"
                  ref={register({ required:true })}
                  disable={addEntryState}
               />
               {/* Organisation */}
               <input
                  className="formInput"
                  type="text"
                  defaultValue={organisation}
                  placeholder="Organisation"
                  maxLength="30"
                  name="eventOrganisation"
                  ref={register({ required:true })}
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
                  defaultValue={type}
               >
                  <option value="Careers event">Careers event</option>
                  <option value="Conference">Conference</option>
                  <option value="Special interest talk">Special interest talk</option>
                  <option value="Revision">Revision</option>
                  <option value="Other">Other</option>
               </select>

               {/* Public Links */}
               <div className="formLinks">   
                  <input
                     className="formLink" 
                     placeholder="Public link name"
                     defaultValue={(parsedPublicLinks) ? parsedPublicLinks[3] : ''}
                     type="text" 
                     maxLength="30"
                     name="PublicLinkInfo3"
                     ref={register}
                  />
                  <input
                     className="formLink" 
                     placeholder="Public link"
                     defaultValue={(parsedPublicLinks) ? parsedPublicLinks[0] : ''}
                     type="text" 
                     maxLength="2000"
                     name="PublicLinkInfo0"
                     ref={register}
                  />
                  
                  <input
                     className="formLink" 
                     placeholder="Public link name"
                     defaultValue={(parsedPublicLinks) ? parsedPublicLinks[4] : ''}
                     type="text" 
                     maxLength="30"
                     name="PublicLinkInfo4"
                     ref={register}
                  />
                  <input
                     className="formLink" 
                     placeholder="Public link"
                     defaultValue={(parsedPublicLinks) ? parsedPublicLinks[1] : ''}
                     type="text" 
                     maxLength="2000"
                     name="PublicLinkInfo1"
                     ref={register}
                  />
                  
                  <input
                     className="formLink" 
                     placeholder="Public link name"
                     defaultValue={(parsedPublicLinks) ? parsedPublicLinks[5] : ''}
                     type="text" 
                     maxLength="30"
                     name="PublicLinkInfo5"
                     ref={register}
                  />
                  <input
                     className="formLink" 
                     placeholder="Public link"
                     defaultValue={(parsedPublicLinks) ? parsedPublicLinks[2] : ''}
                     type="text" 
                     maxLength="2000"
                     name="PublicLinkInfo2"
                     ref={register}
                  />
                  
               </div>
               
               {/* Private Links */}
               <div className="formLinks">
                  <input
                     className="formLink" 
                     placeholder="Private link name"
                     defaultValue={(parsedPrivateLinks) ? parsedPrivateLinks[3] : ''}
                     type="text" 
                     maxLength="30"
                     name="PrivateLinkInfo3"
                     ref={register}
                  />
                  <input
                     className="formLink" 
                     placeholder="Private link"
                     defaultValue={(parsedPrivateLinks) ? parsedPrivateLinks[0] : ''}
                     type="text" 
                     maxLength="2000"
                     name="PrivateLinkInfo0"
                     ref={register}
                  />
                  
                  <input
                     className="formLink" 
                     placeholder="Private link name"
                     defaultValue={(parsedPrivateLinks) ? parsedPrivateLinks[4] : ''}
                     type="text" 
                     maxLength="30"
                     name="PrivateLinkInfo4"
                     ref={register}
                  />
                  <input
                     className="formLink" 
                     placeholder="Private link"
                     defaultValue={(parsedPrivateLinks) ? parsedPrivateLinks[1] : ''}
                     type="text" 
                     maxLength="2000"
                     name="PrivateLinkInfo1"
                     ref={register}
                  />
                  
                  <input
                     className="formLink" 
                     placeholder="Private link name"
                     defaultValue={(parsedPrivateLinks) ? parsedPrivateLinks[5] : ''}
                     type="text" 
                     maxLength="30"
                     name="PrivateLinkInfo5"
                     ref={register}
                  />
                  <input
                     className="formLink" 
                     placeholder="Private link"
                     defaultValue={(parsedPrivateLinks) ? parsedPrivateLinks[2] : ''}
                     type="text" 
                     maxLength="2000"
                     name="PrivateLinkInfo2"
                     ref={register}
                  />
               </div>

               {/* Submit Button */}
               <input value="Submit" className="formSubmitButton formInput" type="submit" />
            </fieldset>
         </form>
      </Wrapper>
   )
}

export default EventForm;