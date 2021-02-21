import React, {useState} from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import {
   add,
   remove,
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
   & .inputForm{
      display:flex;
      flex-direction:column;
      flex-wrap:nowrap;
      padding:10px;
      border: 0;
      margin-top:10px;
   }
   & .icon {
      width:5%;
      height:23px;
      justify-self:center;
      align-self:center;
   }
`



const EventForm = ({handleSubmitEvent}) => {
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
               placeholder={`${type} Link`}
               type="text" 
               name={`${type}LinkInfo${id}`}
               ref={register}
               defaultValue={(type === 'Public' ? publicInfoState[id] : privateInfoState[id] )}
               onChange={handleDynamicLinks}
               id={id}
            />
            <select 
               name={`${type}LinkType${id}`}
               className="formType" 
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
                  placeholder="Title"
                  name="eventTitle"
                  ref={register({ required:true, maxLength: 50, minLength: 4, })}
               />
               {/* Description */}
               <textarea
                  className="formInput"
                  type="text"
                  placeholder="Event Description"
                  name="eventDescription"
                  ref={register({ required:true, maxLength: 80, minLength: 4, })}
               />
               {/* Organisation */}
               <input
                  className="formInput"
                  type="text"
                  placeholder="Organisation"
                  name="eventOrganisation"
                  ref={register({ required:true })}
               />
               {/* Image */}
               <input
                  name="eventImage"
                  className="formInput"
                  type="file"
                  accept="image/png, image/jpeg"
                  id="file"
                  ref={register()}
               />
               {/* Start Time */}
               <input
                  className="formInput"
                  placeholder="Start Time"
                  type="time" 
                  name="eventStartTime"
                  ref={register({ required:true })}
               />
               {/* End Time */}
               <input
                  className="formInput"
                  placeholder="End Time"
                  type="time" 
                  name="eventEndTime"
                  ref={register({ required:true })}
               />
               {/* Event Type */}
               <select 
                  name="eventType" 
                  className="formInput" 
                  ref={register}
               >
                  <option value="1">Option 1</option>
                  <option value="2">Option 2</option>
               </select>

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

               {/* Submit Button */}
               <input type="submit" />
            </fieldset>
         </form>
      </Wrapper>

   )
}


export default EventForm;