import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { CalenderSquare, Sidebar, LoadingIcon } from '../components/index';
import { getEntries, addEntry } from '../redux/actions/index';
import { connect } from 'react-redux';


const Wrapper = styled.div`
   width:100%;
   height:100%;
   background-color:red;
   display:flex;
`
const StyledMain = styled.div`
   min-width:auto;
   flex-grow:1;
   height:100%;
   background-color:blue;
   display:grid;
   grid-template-columns:repeat(7, 1fr);
   grid-template-rows:repeat(5, 1fr);
   grid-gap:5px;
`
const CalenderSquareContainer  = styled.div`
   width:1fr;
   height:1fr;
`
const StyledSidebar = styled.div`
   width:20%;
   max-width: 200px;
   height:100%;
   background-color:yellow;
`


const Calender = ({ entries, getEntries, addEntry }) => {
   const [ boxes, setBoxes ] = useState([]);
   const date = new Date();
   const day = date.getDate();
   const month = date.getMonth() + 1;
   const year = date.getFullYear();
   const totalDaysInMonth = new Date(year, month, 0).getDate();
   const test = () => {
      console.log(entries.entries.data)
   }
   useEffect(() => {
      genBoxes();
      getEntries(month, year);
   }, []);

   const genBoxes = () => {
      setBoxes([]);
      let tempBoxes = [];
      for(let i = 1; i < 31 + 1; i++){
         tempBoxes.push(
            <CalenderSquareContainer key={i} >
               <CalenderSquare totalDaysInMonth={totalDaysInMonth} currentDay={day} currentMonth={month} currentYear={year} boxDay={i}/>
            </CalenderSquareContainer >
         )
      }
      setBoxes(tempBoxes);
   }


   if(entries.isFetching){
      return(
         <LoadingIcon/>
      )     
   }
   return (
      <Wrapper>   
         <StyledSidebar>
            <Sidebar genBoxes={test}/>
         </StyledSidebar>


         <StyledMain>
            {boxes}
         </StyledMain>

      </Wrapper>
   )
}


const mapStateToProps = (state) => ({ entries:state.entries });

export default connect(mapStateToProps, { getEntries, addEntry })(Calender);