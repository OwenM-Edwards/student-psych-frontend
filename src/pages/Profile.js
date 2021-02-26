import React, { useEffect } from 'react';
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { connect } from "react-redux";
import { getSecureEventInfo,deleteEntry, editEntry,searchEntries,modalHandler } from "../redux/actions/index";
import { PinnedEvents, AccountSettings } from '../components/index';
import { toast } from "react-toastify";



const Wrapper = styled.div`
   width:100%;
   height:100%;
   display:flex;
   padding:50px 50px 20px 50px;
   justify-content:center;
   flex-direction:row;

`

const PinnedEventsContainer = styled.div`
   width:50%;
   background-color:red;
`
const AccountSettingsContainer = styled.div`
   width:50%;
   background-color:yellow;
`


const Profile = () => {



   return(
      <Wrapper>
         <PinnedEventsContainer>
            <PinnedEvents/>
         </PinnedEventsContainer>

         <AccountSettingsContainer>
            <AccountSettings/>
         </AccountSettingsContainer>
      </Wrapper>
   )  
  
}


const mapStateToProps = (state) => ({});
export default connect(mapStateToProps)(Profile);

// Regular User -

// Manage pinned events.
// Change Password.
// Delete Account.
// 
// 


// Authorised User -

// Manage pinned events.
// Manage Submitted events.
// Change Password.
// Delete Account.


// Admin User -

// Manage authorised users.
// Manage pinned events.
// Manage Submitted events.
// Change Password.
// Delete Account.

