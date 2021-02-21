import React, {useEffect} from 'react';
import styled from "styled-components";
import { getRecentEvents } from '../redux/actions/index';
import { connect } from 'react-redux';

const Wrapper = styled.div`
   width:20%;
   max-width: 200px;
   height:100%;
   z-index:-1;
   background: ${({ theme }) => theme.backgroundContrast};
   box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
   text-align:center;
   padding-top:50px;
`
const EventsContainer = styled.div`
   width:100%;
   height:50%;
   display:flex;
   flex-direction:column;
   padding:5px;

   & .recentEventHeader{
      font-size:1.1rem;
      margin-bottom:15px;
   }
   & .eventTag {
      margin-bottom:10px;
   }
`

const Sidebar = ({getRecentEvents, recentEntries}) => {


   let recentEvents = [];
   const genRecentEvents = () => {
      console.log('sorting')
      let counter = 0;
      if(recentEntries){
         recentEntries.forEach(entry => {
            recentEvents.unshift(
               <p className="eventTag" key={counter}>{entry.title}</p>
            )
            counter++;
         })
         console.log(recentEvents);
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
            <h2 className="recentEventHeader">Popular upcoming events.</h2>
         </EventsContainer>

         <EventsContainer>
            <h2 className="recentEventHeader">Recently added events.</h2>
            {recentEvents}
         </EventsContainer>
      </Wrapper>
   )
}



const mapStateToProps = (state) => ({ recentEntries:state.recentEvents.recentEntries });
export default connect(mapStateToProps, { getRecentEvents })(Sidebar);