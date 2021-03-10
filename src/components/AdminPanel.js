import React, { useEffect } from 'react';
import styled from "styled-components";
import { connect } from "react-redux";
import {getAllUsers, changeUserType, banAndDelete, deleteUser} from "../redux/actions/index";


const Wrapper = styled.div`
   max-width:100%;
   height:100%;
   display:flex;
   flex-direction:column;
   padding:30px;
   border-radius:0 0 5px 5px;
   box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
   overflow-y:scroll;
`
const EntryWrapper = styled.div`
   display:flex;
   flex-direction:row;
   box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
   margin-bottom:10px;
`
const UserTag = styled.ul`
   width:100%;
   display:flex;
   flex-direction:row;
   list-style-type: none;
   margin: 0;
   background: ${({ theme }) => theme.backgroundLight};
   color: ${({ theme }) => theme.contrastText};
   padding:10px 20px 10px 20px;
   border-radius:5px;
   margin-right:5px;
   & li {
      margin-right:15px;
      padding-right:5px;
      border-right:1px solid #2b2b2b;
   }
`
const InputContainer = styled.div`
   display:flex;
   flex-direction:row;
   flex-wrap:nowrap;
   width:auto;
   margin-left:auto;
   & button {
      width:auto;
      height:42px;
      color: #2b2b2b;
      text-transform: uppercase;
      text-decoration: none;
      background-color:${({ theme }) => theme.offwhite};
      padding: 5px 10px 5px 10px;
      border-radius:5px;
      display: inline-block;
      border: none;
      transition: all 0.2s ease 0s;
      cursor:pointer;
   }
   & .buttonContainer {
      display:flex;
      flex-direction:column;
      grid-gap:5px;
   }
   & .radioContainer {
      display:flex;
      flex-direction:column;
      width:auto;
      justify-content:center;
      margin-right:8px;
      & div{
         display:flex;
      }
      & input {
     
      }
      & label {

      }
   }

`

const AdminPanel = ({deleteUserState, getAllUsers, allUsers, changeUserType, banAndDelete, deleteUser}) => {
   let usersList = [];
   useEffect(()=>{
      const fetchAllUsers = async () => {
         await getAllUsers();
      }
      fetchAllUsers();
      
   }, [deleteUserState.isFetching]);

   const handleUserTypeChange = (e) => {
      // console.log(e.target.attributes.data.nodeValue)
      changeUserType({newType:e.target.value, userid:e.target.attributes.data.nodeValue});
   }

   const sortUsers = () => {
      if(allUsers){
         let count = 0;
         allUsers.forEach(user => {
            usersList.push(
               <EntryWrapper key={count}>
                  <UserTag >
                     <li>{user.id} </li>
                     <li>{user.email} </li>
                     <li>{user.type} </li> 
                  </UserTag>
                  <InputContainer>
                     <div className="radioContainer">
                        <div>
                           <input onChange={handleUserTypeChange} defaultChecked={!user.moderator && !user.admin} id={`accountUser${count}`} data={user.id} value="user" name={`accountType${count}`} type="radio"/>
                           <label htmlFor={`accountUser${count}`}>User</label>
                        </div>
                        <div>
                           <input onChange={handleUserTypeChange} defaultChecked={user.moderator && !user.admin} id={`accountModerator${count}`} data={user.id} value="moderator" name={`accountType${count}`} type="radio"/>
                           <label htmlFor={`accountModerator${count}`}>Editor</label>
                        </div>
                        <div>
                           <input onChange={handleUserTypeChange} defaultChecked={user.admin} id={`accountAdmin${count}`} data={user.id} value="admin" name={`accountType${count}`} type="radio"/>
                           <label htmlFor={`accountAdmin${count}`}>Admin</label>
                        </div>
                     </div>
                     <div className="buttonContainer">
                        <button onClick={()=>deleteUser(user.id)}>Delete Account</button>
                        <button onClick={()=>banAndDelete(user.id)}>Ban & Delete</button>     
                     </div>
                  </InputContainer>
               </EntryWrapper>

            )
            count++;
         })  
      }
   }
   sortUsers();
   
   return(
      <Wrapper>
            {usersList}

      </Wrapper>
   )  
  
}

const mapStateToProps = (state) => ({ deleteUserState:state.deleteUser, allUsers:state.allUsers.users});
export default connect(mapStateToProps, {deleteUser, banAndDelete, changeUserType, getAllUsers})(AdminPanel);
