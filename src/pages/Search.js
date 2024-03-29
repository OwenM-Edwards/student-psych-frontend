import React, { useEffect } from 'react';
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { connect } from "react-redux";
import { getSecureEventInfo,deleteEntry, editEntry,searchEntries,modalHandler,selectDate } from "../redux/actions/index";
import { LoadingIcon, EditEventModal, EventModal, AddEventModal } from '../components/index';
import { toast } from "react-toastify";
import { useHistory } from 'react-router-dom';
import { rightIconDarkMode } from "../assets/index.js";


const Wrapper = styled.div`
   width:100%;
   height:100%;
   display:flex;
   padding:50px 50px 20px 50px;
   justify-content:center;

   & .frosted{
      box-shadow: inset 0 0 500px rgba(255, 255, 255, .1);
      filter: blur(2px);
   }
`

const StyledEntriesContainer = styled.div `
   width:100%;
   max-width: 900px;
   height:100%;
   display:flex;
   flex-direction:column;
   box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
   border-radius:3px;
   padding:20px;
   overflow-y:scroll;
   background: ${({ theme }) => theme.primary.main};
`
const StyledEntry = styled.div`
   width: 100%;
   height:auto;
   margin-bottom:10px;
   transition: all 0.1s ease-in-out;
   display:flex;
   flex-direction:row;
   & div {
      background: ${({ theme }) => theme.backgroundLight};
      color: ${({ theme }) => theme.contrastText};
      width:100%;
      cursor:pointer;
      padding:10px 20px 10px 20px;
      border-radius:5px;
      display:flex;
      flex-direction:row;
      flex-wrap:wrap;
      grid-gap:10px;
   }
   & img {
      align-self:center;
      height:50px;
      cursor:pointer;
      transition: all 0.1s ease-in-out;
      &:hover {
         scale:0.90;
      }
   }
`

const Search = ({
      modalState,
      getSecureEventInfo, 
      auth, 
      searchEntries, 
      entriesState, 
      editEntryState, 
      deleteEntryState,
      modalHandler,
      selectDate,
      selectedDate, 
   }) => {

   const {searchterm} = useParams();
   const history = useHistory();

   // View Event
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


   let sortedEntries = [];
   const sortEntries = () => {
      let count = 1;
      if(entriesState.entries){
         entriesState.entries.forEach(entry => {
            let linkDate = new Date(entry.year, entry.month -1);
            sortedEntries.push(
               <StyledEntry onClick={()=>openViewEventModal(entry)} key={count}> 
                  <div>
                     <p>Title: {entry.title} </p>
                     <p>Organisation: {entry.organisation} </p>
                     <p>Start Time: {entry.starttime}</p>
                     <p>End Time: {entry.endtime} </p>
                     <p>Day: {entry.day}</p>
                     <p>Month: {entry.month}</p>
                     <p>Year: {entry.year}</p>
                  </div>
                  <img onClick={()=>{
                     selectDate(false)
                     history.push(`/calendar/${linkDate.getMonth() +1}/${linkDate.getFullYear()}`)
                     }} src={rightIconDarkMode}
                  />
               </StyledEntry>
            )
            count++;
         })
      }

   }
   sortEntries();

   useEffect(() => {
      async function search(){
         if(!searchterm){
            history.push('/calendar');
         }
         else{
            searchEntries(searchterm);
         }
      }
      search();
   }, [editEntryState.isFetching, deleteEntryState.isFetching]);

   if(!entriesState.isFetching){
      return(
         <Wrapper>
            {(modalState.modalDisplay === 'view')
               ? <EventModal/>
               : <React.Fragment/>
            }  
            {(modalState.modalDisplay === 'add')
               ? <AddEventModal />
               : <React.Fragment/>
            }  
            {(modalState.modalDisplay === 'edit')
               ? <EditEventModal />
               : <React.Fragment/>
            } 
            <StyledEntriesContainer>
               {sortedEntries}
            </StyledEntriesContainer>
            {/* {sortedEntries}
            <div>SEARCH</div> */}
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


const mapStateToProps = (state) => ({ selectedDate:state.selectedDate.selectedDate, modalState:state.modal, editEntryState:state.editEntry, deleteEntryState:state.deleteEntry, auth:state.authenticate, entriesState:state.searchEntries });
export default connect(mapStateToProps, {selectDate, modalHandler, getSecureEventInfo,deleteEntry, editEntry,searchEntries})(Search);