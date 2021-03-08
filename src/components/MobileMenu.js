import React, {useEffect} from 'react';
import Loader from 'react-loader-spinner';
import { useForm } from "react-hook-form";
import { useHistory } from 'react-router-dom';
import { search } from "../assets/index.js";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { signOut } from '../redux/actions/index';
import styled, { ThemeProvider } from "styled-components";


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
   & .profileButton {
      width:45px;
      opacity:0.8;
      cursor: pointer;
      @media (max-width: 900px) {
         width:30px;
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
      font-size:1.1rem;
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


const MobileMenu = ({auth, mobileMenuState}) => {
   const { register, handleSubmit, watch, errors } = useForm();
   const history = useHistory();

   const onSubmit = (data) => {
      history.push(`/search/${data.searchTerm}`);
   }

   const handleSignOut = () => {
      signOut();
   }

   useEffect(()=>{
      console.log(mobileMenuState)
   },[mobileMenuState]);


   return(
      <ThemeProvider theme={mobileMenuState ? shown : hidden}>
         <Wrapper>
            <UserContainer >
               {(auth.authenticated)
                  ? <button className="signOut button" onClick={()=>handleSignOut()}>Sign Out</button>
                  : <Link className="loginButtonContainer" to="/signin"><button className="loginButton">Sign In</button></Link>
               }
               {(auth.authenticated)
                  ? <Link className="link" to="/profile"><button className="profile button" >Profile</button></Link>
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
   

   
         </Wrapper>
      </ThemeProvider>
   )
}


const mapStateToProps = (state) => ({ mobileMenuState:state.mobileMenuToggle.shown, navPanelState:state.navPanel.show, auth:state.authenticate, selectedDate:state.selectedDate.selectedDate });
export default connect(mapStateToProps, { signOut })(MobileMenu);

