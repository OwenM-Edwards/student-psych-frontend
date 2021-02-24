import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { connect } from "react-redux";
import { getSecureEventInfo,deleteEntry, editEntry,searchEntries,modalHandler } from "../redux/actions/index";
import { Link } from "react-router-dom";
import { LoadingIcon, EditEventModal, CalenderSquare, Sidebar, EventModal, AddEventModal } from '../components/index';
import { toast } from "react-toastify";
const Wrapper = styled.div`
   width:100%;
   height:100%;
   display:flex;
   padding:50px;
   justify-content:center;
   & .frosted{
      box-shadow: inset 0 0 500px rgba(255, 255, 255, .1);
      filter: blur(2px);
   }
`
const EntryHolder = styled.div`
   width:100px;
   height:20px;
   background-color:pink;
`

const StyledEntriesContainer = styled.div `
   width:100%;
   height:100%;
   display:flex;
   flex-direction:column;
   background: ${({ theme }) => theme.backgroundContrast};
   border-radius:3px;
   padding:20px;
`
const StyledEntry = styled.p`
   width:100%;
   max-width: 70%;
   background: ${({ theme }) => theme.backgroundLight};
   color: ${({ theme }) => theme.contrastText};
   height:auto;
   margin-bottom:10px;
   padding:10px 20px 10px 20px;
   cursor:pointer;
   border-radius:5px;
`

const Search = ({
      modalState,
      getSecureEventInfo, 
      auth, 
      searchEntries, 
      entriesState, 
      editEntryState, 
      deleteEntryState,
      modalHandler
   }) => {

   const {searchterm} = useParams();


   // View Event
   const openViewEventModal = (eventInfo) => {
      if(auth.user.id){
         getSecureEventInfo({
            eventInfo:eventInfo,
            userid:auth.user.id
         })
      }
      else{
         toast.dismiss();
         toast.info('Please login to view full event.');
      }
      modalHandler({modalDisplay:'view', modalInfo: eventInfo});
   }


   let sortedEntries = [];
   const sortEntries = () => {
      let count = 1;
      if(entriesState.entries){
         entriesState.entries.forEach(entry => {
            sortedEntries.push(
               <StyledEntry onClick={()=>openViewEventModal(entry)} key={count}> 
                  Title:{entry.title} Organisation:{entry.organisation}
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
            window.location = '/calendar';
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


const mapStateToProps = (state) => ({ modalState:state.modal, editEntryState:state.editEntry, deleteEntryState:state.deleteEntry, auth:state.authenticate, entriesState:state.searchEntries });
export default connect(mapStateToProps, {modalHandler, getSecureEventInfo,deleteEntry, editEntry,searchEntries})(Search);