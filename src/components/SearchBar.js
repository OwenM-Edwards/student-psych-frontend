import React from 'react';
import styled from "styled-components";
import { useHistory } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { search } from "../assets/index.js";


const SearchContainer = styled.div`
   display:flex;
   height:100%;
   margin-left:auto;
   overflow:hidden;
   width:40%;
   max-width:330px ;
   @media (max-width: 900px) {
      display:none;
   }
   
   & .icon {
      display:inline;
      width:100%;
      max-height:100%;
      max-width: 100%;
      object-fit: contain;
   }
   & .searchForm {
      align-self:center;
      display:flex;
      flex-direction:row;
      flex-wrap:nowrap;
      justify-content:center;
      width:100%;
   }
   & .searchButton{
      align-self:center;
      background-color:${({ theme }) => theme.primary.offWhite};
      border-left:1px solid black;
      border-radius: 0 5px 5px 0;
      border: none;
      color: ${({ theme }) => theme.primary.offBlack};
      cursor:pointer;
      display: inline-block;
      height:42px;
      margin-right:5px;
      width:14%;
      max-width:50px ;
      padding-top:2px;
      text-decoration: none;
      text-transform: uppercase;
      transition: all 0.4s ease 0s;
   }
   & .searchTerm {
      width:70%;
      max-width:300px ;
      height:42px;
      padding-left:15px;
      border-radius:5px 0 0 5px;
      outline: 0;
      border: 0;
      background-color:${({ theme }) => theme.primary.offWhite};
      
   }
`

const SearchBar = () => {
   const history = useHistory();
   const { register, handleSubmit } = useForm();

   const onSubmit = (data) => {
      history.push(`/search/${data.searchTerm}`);
   }

   return (
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
   )
}

export default SearchBar;