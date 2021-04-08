import React, {useEffect} from 'react';
import { useForm } from "react-hook-form";
import { useHistory } from 'react-router-dom';
import { search } from "../assets/index.js";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { signOut, toggleMobileMenu, getPopularEvents, getSecureEventInfo, modalHandler, getRecentEvents  } from '../redux/actions/index';
import styled, { ThemeProvider } from "styled-components";
import { toast } from "react-toastify";
import {createEventTags} from "../helpers/index";
import {useWindowDimensions} from '../hooks/index';

const Wrapper = styled.div`
   height:auto;
   width:40%;
   display:flex;
   position: absolute;
   background-color:red;
   left:0;
   top:70px;
   box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
   flex-direction:column;
   justify-content:flex-start;
   align-items:flex-start;
   background-color:${({ theme }) => theme.primary.main};
   color: ${({ theme }) => theme.primary.contrastText};
   transition: all 0.2s ease-in-out;
   z-index:9;
   transform: ${props => props.theme.transform};
   padding:20px 10px 10px 10px;
   overflow:hidden;
   font-size:0.7rem;
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
      height:32px;
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
      height:32px;
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
   margin-bottom:20px;

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
      color:${({ theme }) => theme.primary.offBlack};
   }
   & .button{
      padding:10px;
      height:35px;
      width:100%;
      background-color:#2f3e4d;
      border-radius:5px;
      color:${({ theme }) => theme.primary.light};
      border:0px;
      box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
      font-size:0.8rem;
      cursor: pointer;
      transition: all 0.2s ease 0s;
      margin-bottom:5px;
      &:hover {
         background-color:${({ theme }) => theme.primary.light};
         color:${({ theme }) => theme.primary.offBlack};
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
}
const hidden = {
   transform:"translate(-100%)",
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
      margin-bottom:15px;
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
`

const MobileMenu = ({recentEntries, popularEntries, signOut, auth, mobileMenuState, toggleMobileMenu, getPopularEvents, getSecureEventInfo, modalHandler, getRecentEvents }) => {
   const { register, handleSubmit } = useForm();
   const history = useHistory();
   let recentEvents = [];
   let popularEvents = [];
   let recentCapReached = false;
   let popularCapReached = false;
   const { width } = useWindowDimensions();

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
         let currentDate = new Date();
         recentEntries.forEach(entry => {
            if(counter < 3){
               // Check if entry not already passed.
               if(currentDate.getMonth() + 1 <= entry.month && currentDate.getFullYear() <= entry.year ){
                  if(currentDate.getMonth()+1 === entry.month){
                     if(currentDate.getDate() <= entry.day){
                        recentEvents.push(createEventTags(entry, counter, openViewEventModal));
                        counter++;
                     }
                  }
                  else {
                     recentEvents.push(createEventTags(entry, counter, openViewEventModal));
                     counter++;
                  }
               }
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
         let currentDate = new Date();
         popularEntries.forEach(entry => {
            if(counter < 3){
               if(currentDate.getMonth() + 1 <= entry.month && currentDate.getFullYear() <= entry.year ){
                  if(currentDate.getMonth()+1 === entry.month){
                     if(currentDate.getDate() <= entry.day){
                        popularEvents.push(createEventTags(entry, counter, openViewEventModal));
                        counter++;
                     }
                  }
                  else {
                     popularEvents.push(createEventTags(entry, counter, openViewEventModal));
                     counter++;
                  }
               }
            }
            else {
               popularCapReached = true;
            }
         })
      }         
   }
   genPopularEvents();

   useEffect(() => {
      if(width <= 900){
         if(!recentEntries){
            getRecentEvents();
         }
         if(!popularEntries){
            getPopularEvents();
         }
      }
   }, []);

   return(
      <ThemeProvider theme={mobileMenuState ? shown : hidden}>
         <Wrapper>
            <UserContainer >
               {(auth.authenticated)
                  ? <button className="button" onClick={()=>handleSignOut()}>Sign Out</button>
                  : <Link onClick={()=>toggleMobileMenu(false)} className="loginButtonContainer" to="/signin"><button className="button">Sign In</button></Link>
               }
               {(auth.authenticated)
                  ? <Link  onClick={()=>toggleMobileMenu(false)} className="loginButtonContainer" to="/profile"><button className="button" >Profile</button></Link>
                  : <React.Fragment/>
               }
            </UserContainer>
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
         </Wrapper>
      </ThemeProvider>
   )
}


const mapStateToProps = (state) => ({recentEntries:state.recentEvents.recentEntries, popularEntries:state.popularEvents.popularEntries, mobileMenuState:state.mobileMenuToggle.shown, navPanelState:state.navPanel.show, auth:state.authenticate, selectedDate:state.selectedDate.selectedDate });
export default connect(mapStateToProps, { getPopularEvents, getSecureEventInfo, modalHandler, getRecentEvents ,toggleMobileMenu, signOut })(MobileMenu);

