import React, { useEffect } from 'react';
import styled from "styled-components";
import { connect } from "react-redux";
import {getSubmittedEvents, modalHandler,getSecureEventInfo} from "../redux/actions/index";
import { EditEventModal, EventModal, AddEventModal } from '../components/index';
import { toast } from "react-toastify";

const Wrapper = styled.div`
   width:100%;
   height:95%;
   display:flex;
   flex-direction:column;
   padding:30px;
   border-radius:0 0 5px 5px;
   box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
   overflow-y:scroll;
   overflow-x:hidden;
   background: ${({ theme }) => theme.primary.main};
   @media (max-width: 900px) {
      padding:10px;
      height:90%;
   }
`
const EntryTag = styled.div`
   width:100%;
   display:flex;
   flex-direction:row;
   list-style-type: none;
   margin: 0;
   padding: 0;
   margin-right:5px;
   background: ${({ theme }) => theme.backgroundLight};
   color: ${({ theme }) => theme.contrastText};
   padding:10px 20px 10px 20px;
   cursor:pointer;
   border-radius:5px;
   margin-bottom:10px;
   transition: all 0.2s ease-in-out;
   &:hover {
      background: ${({ theme }) => theme.primary.light};
   }
   & li {
      margin-right:5px;
      
   }
`

const SubmittedEvents = (
      {
         getSubmittedEvents, 
         submittedEntries,
         editEntryState, 
         deleteEntryState,
         modalState,
         modalHandler,
         auth,
         getSecureEventInfo,
      }
   ) => {
   let sortedEntries = [];
   useEffect(()=>{
      const fetchSubmittedEvents = async () => {
         await getSubmittedEvents();
      }
      fetchSubmittedEvents();
   }, [editEntryState.isFetching, deleteEntryState.isFetching]);

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
         toast.info('Please login to view full event.');
         modalHandler({modalDisplay:'view', modalInfo: eventInfo});
      }
   }

   const sortEvents = () => {
      if(submittedEntries){
         let count = 0;
         submittedEntries.forEach(entry => {
            sortedEntries.push(
               <EntryTag onClick={()=>openViewEventModal(entry)} key={count}>
                  <li>{entry.title} </li>
                  <li>{entry.day} </li>
                  <li>{entry.month} </li> 
                  <li>{entry.year} </li> 
                  <li>{entry.organisation} </li> 
               </EntryTag>
            )
            count++;
         })  
      }
   }
   sortEvents();
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
         {(sortedEntries.length < 1)
            ? <p>Nothing here yet</p>
            : sortedEntries
         }
      </Wrapper>
   )  
  
}

const mapStateToProps = (state) => ({ auth:state.authenticate, editEntryState:state.editEntry, deleteEntryState:state.deleteEntry, modalState:state.modal, submittedEntries:state.submittedEntries.submittedEntries});
export default connect(mapStateToProps, {getSecureEventInfo, modalHandler, getSubmittedEvents})(SubmittedEvents);
