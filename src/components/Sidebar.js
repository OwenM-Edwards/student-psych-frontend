import React, {useEffect} from 'react';
import styled from "styled-components";
import { getRecentEvents } from '../redux/actions/index';
import { connect } from 'react-redux';

const Wrapper = styled.div`
   width:20%;
   max-width: 200px;
   min-width:200px;
   height:100%;
   z-index:2;
   background: ${({ theme }) => theme.backgroundContrast};
   box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
   text-align:center;
   padding-top:8%;
`
const EventsContainer = styled.div`
   width:100%;
   min-height:40%;
   display:flex;
   flex-direction:column;
   padding:10px;
   & .recentEventHeader{
      font-size:1.1rem;
      margin-bottom:15px;
   }
`
const EventTag = styled.div`
   background-color:${({ theme }) => theme.warm};
   color:${({ theme }) => theme.contrastText};
   padding:5px 0 5px 0;
   border-radius:3px;
   margin: 0 5px 10px 5px;
   cursor: pointer;
`

const Sidebar = ({getRecentEvents, recentEntries}) => {
   let recentEvents = [];
   const genRecentEvents = () => {
      let counter = 0;
      if(recentEntries){
         recentEntries.forEach(entry => {
            recentEvents.unshift(
               <EventTag key={counter}>{entry.title}</EventTag>
            )
            counter++;
         })
      }         
   }
   genRecentEvents();

   useEffect(() => {
      if(!recentEntries){
         getRecentEvents();
      }
   }, [recentEntries]);


   return(
      <Wrapper>
         <EventsContainer>
            <h2 className="recentEventHeader">Popular Events</h2>
            {recentEvents}
         </EventsContainer>

         <EventsContainer>
            <h2 className="recentEventHeader">Recent Events</h2>
            {recentEvents}
         </EventsContainer>
      </Wrapper>
   )
}



const mapStateToProps = (state) => ({ recentEntries:state.recentEvents.recentEntries });
export default connect(mapStateToProps, { getRecentEvents })(Sidebar);