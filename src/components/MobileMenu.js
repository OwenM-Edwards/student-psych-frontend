import React, {useEffect} from 'react';
import Loader from 'react-loader-spinner';
import { useForm } from "react-hook-form";
import { useHistory } from 'react-router-dom';
import { search } from "../assets/index.js";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { signOut, toggleMobileMenu, getPopularEvents, getSecureEventInfo, modalHandler, getRecentEvents  } from '../redux/actions/index';
import styled, { ThemeProvider } from "styled-components";
import { toast } from "react-toastify";

const Wrapper = styled.div`
   height:auto;
   width:40%;
   min-width:200px;
   display:flex;
   position: absolute;
   background-color:red;
   right:0;
   top:70px;
   box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
   flex-direction:column;
   justify-content:flex-start;
   align-items:flex-start;
   background-color:${({ theme }) => theme.primary.main};
   color: ${({ theme }) => theme.primary.contrastText};
   transition: transform 0.2s ease-in-out;
   z-index:4;
   transform: ${props => props.theme.transform};
   padding:10px;
   padding-top:20px;
   overflow:hidden;

   @media (min-width: 900px) {
      display:none;
   }
`
const SearchContainer = styled.div`
   height:auto;
   width:100%;
   max-width:330px ;
   display:flex;
   overflow:hidden;
   margin-bottom:20px;
   & .icon {
      display:inline;
      width:100%;
      max-width: 100%;
      max-height:100%;
      object-fit: contain;
   }
   & .searchForm {
      width:100%;
      align-self:center;
      display:flex;
      flex-direction:row;
      flex-wrap:nowrap;
      justify-content:center;
   }
   & .searchButton{
      width:14%;
      max-width:50px ;
      height:42px;
      color: ${({ theme }) => theme.primary.offBlack};
      text-transform: uppercase;
      text-decoration: none;
      background-color:${({ theme }) => theme.primary.offWhite};
      padding-top:2px;
      border-radius: 0 5px 5px 0;
      display: inline-block;
      border: none;
      border-left:1px solid black;
      transition: all 0.4s ease 0s;
      cursor:pointer;
      align-self:center;
   }
   & .searchTerm {
      width:100%;
      max-width:300px ;
      height:42px;
      padding-left:15px;
      border-radius:5px 0 0 5px;
      outline: 0;
      border: 0;
      background-color:${({ theme }) => theme.primary.offWhite};
      
   }
`

const UserContainer = styled.div`
   height:auto;
   width:100%;
   display:flex;
   flex-direction:column;
   align-items:center;
   padding:0 10px 0 10px;
   margin-top:20px;

   @media (max-width: 900px) {
      padding:5px 0px 0px 0px;
      margin-right:0;
   }
   & .loginButtonContainer {
      align-self:center;
      justify-self:center;
      height:100%;
      width:100%;
      display:flex;
      align-items:center;
      text-decoration: none;
      box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
      color:${({ theme }) => theme.primary.offBlack};

   }
   & .loginButton{
      width:100%;
      height:40px;
      color: ${({ theme }) => theme.primary.offBlack};
      text-transform: uppercase;
      text-decoration: none;
      background-color:${({ theme }) => theme.primary.offWhite};
      padding: 5px;
      border-radius:10px;
      border: none;
      transition: all 0.4s ease 0s;
      cursor: pointer;
      &:hover {
         background-color:${({ theme }) => theme.primary.light};
      }
   }
   & .signOutButton{
      width:100%;
      height:40px;
      color: ${({ theme }) => theme.primary.offBlack};
      text-transform: uppercase;
      text-decoration: none;
      background-color:${({ theme }) => theme.primary.offWhite};
      padding: 5px;
      border-radius:10px;
      border: none;
      transition: all 0.4s ease 0s;
      cursor: pointer;
      margin-bottom:10px;
      &:hover {
         background-color:${({ theme }) => theme.primary.light};
      }
   }
   & .profileButton {
      width:100%;
      height:40px;
      color: ${({ theme }) => theme.primary.offBlack};
      text-transform: uppercase;
      text-decoration: none;
      background-color:${({ theme }) => theme.primary.offWhite};
      padding: 5px;
      border-radius:10px;
      border: none;
      transition: all 0.4s ease 0s;
      cursor: pointer;
      &:hover {
         background-color:${({ theme }) => theme.primary.light};
      }
   }
   & .closeArrowButton {
      position: relative;
      bottom:15px;
      width:40px;
      transition: all 0.2s ease-in-out;
      cursor: pointer;
      transform: ${props => props.theme.transform};
   }
`
const shown = {
   transform:"translate(0%)",
   height: "40%",
   minHeight: "70px",
   display: 'flex',
}
const hidden = {
   transform:"translate(100%)",
   height: "0%",
   minHeight: "0px",
   display:'none',
}

const EventsContainer = styled.div`
   width:100%;
   height:40%;
   display:flex;
   opacity:${props => props.theme.opacity};
   flex-direction:column;
   transition: all 0.2s ease-in-out;
   padding-top:10px;
   padding-right:3px;
   & .eventsHeader{
      font-size:0.9rem;
      margin-bottom:15px;
   }
   & .colorCode{
      border-radius:3px;
      opacity:0.8;
      margin-bottom:5px;
      color: ${({ theme }) => theme.contrastText};
      padding:5px 0 5px 5px;
      width:100%;
      align-self:center;
      height:20px;
      font-size:0.8rem;
   }
   & .careers {
      background: ${({ theme }) => theme.colorCodes.careers};
   }
   & .conference {
      background: ${({ theme }) => theme.colorCodes.conference};
   }
   & .special {
      background: ${({ theme }) => theme.colorCodes.special};
   }
   & .revision {
      background: ${({ theme }) => theme.colorCodes.revision};
   }
   & .other {
      background: ${({ theme }) => theme.colorCodes.other};
   }
   & .colorCodesContainer{
      display:flex;
      flex-direction:column;
      overflow-y:hidden;
      transition: all 0.2s ease 0s;
      justify-content:flex-end;
   }
`
const EventTag = styled.div`
   opacity:0.9;
   width:100%;
   background-color:${({ theme }) => theme.backgroundLight};
   color: ${({ theme }) => theme.contrastText};
   padding:5px 0 5px 0;
   border-radius:3px;
   margin-bottom:5px;
   cursor: pointer;
   overflow:hidden;
   height:20px;
   font-size:0.8rem;
`

const MobileMenu = ({recentEntries, popularEntries, signOut, auth, mobileMenuState, toggleMobileMenu, getPopularEvents, getSecureEventInfo, modalHandler, getRecentEvents }) => {
   const { register, handleSubmit, watch, errors } = useForm();
   const history = useHistory();
   let recentEvents = [];
   let popularEvents = [];
   let recentCapReached = false;
   let popularCapReached = false;

   const onSubmit = (data) => {
      history.push(`/search/${data.searchTerm}`);
   }

   const handleSignOut = () => {
      toggleMobileMenu(false); 
      signOut();
   }

   useEffect(()=>{
   },[mobileMenuState]);

   const openViewEventModal = (eventInfo) => {
      if(auth.authenticated){
         async function f(){
            await getSecureEventInfo({
               eventInfo:eventInfo,
            }) 
         } 
         f(); 
         modalHandler({modalDisplay:'view', modalInfo: eventInfo});
      }
      else{
         toast.dismiss();
         toast.info('Please login to view private event links.');
         modalHandler({modalDisplay:'view', modalInfo: eventInfo});
      }
   }

   const genRecentEvents = () => {
      let counter = 0;
      if(recentEntries && recentCapReached !== true){
         recentEntries.forEach(entry => {
            if(counter < 3){
               switch(entry.type){
                  case 'Careers event':
                     recentEvents.push(
                        <EventTag onClick={()=>openViewEventModal(entry)} className="careers" key={counter}>{entry.title}</EventTag>
                     )
                     break;
                  case 'Conference':
                     recentEvents.push(
                        <EventTag onClick={()=>openViewEventModal(entry)} className="conference" key={counter}>{entry.title}</EventTag>
                     )
                     break;
                  case 'Special interest talk':
                     recentEvents.push(
                        <EventTag onClick={()=>openViewEventModal(entry)} className="special" key={counter}>{entry.title}</EventTag>
                     )
                     break;
                  case 'Revision':
                     recentEvents.push(
                        <EventTag onClick={()=>openViewEventModal(entry)} className="revision" key={counter}>{entry.title}</EventTag>
                     )
                     break;
                  case 'Other':
                     recentEvents.push(
                        <EventTag onClick={()=>openViewEventModal(entry)} className="other" key={counter}>{entry.title}</EventTag>
                     )
                     break;
               }
               counter++;
            }
            else {
               recentCapReached = true;
            }
         })
      }         
   }
   genRecentEvents();

   const genPopularEvents = () => {
      let counter = 0;
      if(popularEntries && popularCapReached !== true){
         popularEntries.forEach(entry => {
            if(counter < 3){
               switch(entry.type){
                  case 'Careers event':
                     popularEvents.push(
                        <EventTag onClick={()=>openViewEventModal(entry)} className="careers" key={counter}>{entry.title}</EventTag>
                     )
                     break;
                  case 'Conference':
                     popularEvents.push(
                        <EventTag onClick={()=>openViewEventModal(entry)} className="conference" key={counter}>{entry.title}</EventTag>
                     )
                     break;
                  case 'Special interest talk':
                     popularEvents.push(
                        <EventTag onClick={()=>openViewEventModal(entry)} className="special" key={counter}>{entry.title}</EventTag>
                     )
                     break;
                  case 'Revision':
                     popularEvents.push(
                        <EventTag onClick={()=>openViewEventModal(entry)} className="revision" key={counter}>{entry.title}</EventTag>
                     )
                     break;
                  case 'Other':
                     popularEvents.push(
                        <EventTag onClick={()=>openViewEventModal(entry)} className="other" key={counter}>{entry.title}</EventTag>
                     )
                     break;
               }
               counter++;
            }
            else {
               popularCapReached = true;
            }
         })
      }         
   }
   genPopularEvents();

   return(
      <ThemeProvider theme={mobileMenuState ? shown : hidden}>
         <Wrapper>
            <SearchContainer>
               <form className="searchForm" onSubmit={handleSubmit(onSubmit)}>
                  <input
                     className="searchTerm"
                     placeholder="Search events.."
                     type="text" 
                     name="searchTerm"
                     ref={register({ required:true})}
                  />
                  <button id="searchButton" value="search" className="searchButton" type="submit"><img className="icon"src={search}/></button>
               </form>
            </SearchContainer>
            {/* Popular Events */}
            <EventsContainer>
               <h2 className="eventsHeader">Popular Events</h2>
               {popularEvents}
            </EventsContainer>

            {/* Recent Events */}
            <EventsContainer>
               <h2 className="eventsHeader">Recent Events</h2>
               {recentEvents}
            </EventsContainer>
            <EventsContainer>
               <h2 className="eventsHeader">Colour Codes:</h2>
               <div className="colorCodesContainer">
                  <p className="colorCode careers">Careers Event</p><div className=""></div>
                  <p className="colorCode conference">Conference</p>
                  <p className="colorCode special">Special Interest Talk</p>
                  <p className="colorCode revision">Revision or Training</p>
                  <p className="colorCode other">Other</p>
               </div>
            </EventsContainer>

            <UserContainer >
               {(auth.authenticated)
                  ? <button className="signOutButton button" onClick={()=>handleSignOut()}>Sign Out</button>
                  : <Link onClick={()=>toggleMobileMenu(false)} className="loginButtonContainer" to="/signin"><button className="loginButton">Sign In</button></Link>
               }
               {(auth.authenticated)
                  ? <Link  onClick={()=>toggleMobileMenu(false)} className="loginButtonContainer" to="/profile"><button className="profileButton" >Profile</button></Link>
                  : <React.Fragment/>
               }
            </UserContainer>
         </Wrapper>
      </ThemeProvider>
   )
}


const mapStateToProps = (state) => ({recentEntries:state.recentEvents.recentEntries, popularEntries:state.popularEvents.popularEntries, mobileMenuState:state.mobileMenuToggle.shown, navPanelState:state.navPanel.show, auth:state.authenticate, selectedDate:state.selectedDate.selectedDate });
export default connect(mapStateToProps, { getPopularEvents, getSecureEventInfo, modalHandler, getRecentEvents ,toggleMobileMenu, signOut })(MobileMenu);

