import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import { connect } from "react-redux";
import { AccountSettings, SubmittedEvents, AdminPanel } from '../components/index';



const Wrapper = styled.div`
   width:100%;
   height:95%;
   display:flex;
   flex-direction:column;
   padding:50px 20px 30px 20px;
   border-radius:5px;
`
const Main = styled.div`
   width:100%;
   height:94%;
   display:flex;
   flex-direction:column;
   flex-wrap:wrap;

`
const ButtonContainer = styled.div`
   background: ${({ theme }) => theme.primary.main};
   width:100%;
   height:6%;
   min-height:60px;
   display:flex;
   justify-content:center;
   padding:5px;
   border-radius:5px 5px 0 0;
   grid-gap:10px;
   & button{
      width:30%;
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
`

const AccountSettingsContainer = styled.div`
   width:100%;
   height:100%;
   /* border-radius:0 0 5px 5px; */
`
const AdminSettingsContainer = styled.div`
   width:100%;
   height:100%;
   /* border-radius:0 0 5px 5px; */
`
const SubmittedEventsContainer = styled.div`
   width:100%;
   height:100%;
   /* border-radius:0 0 5px 5px; */
`


const Profile = ({auth}) => {
   const [ menuState, setMenuState ] = useState('account');


   return(
      <Wrapper>
         <ButtonContainer>
            <button onClick={()=>setMenuState('account')}>Account</button>

            {(auth.moderator)
               ? <button onClick={()=>setMenuState('submissions')}>Submissions</button>
               : <React.Fragment/>
            }
            {(auth.admin)
               ? <button onClick={()=>setMenuState('admin')}>Admin Control</button>
               : <React.Fragment/>
            }
         </ButtonContainer>
         <Main>


            {(menuState === 'account')
               ?  <AccountSettingsContainer>
                     <AccountSettings/>
                  </AccountSettingsContainer>
               : <React.Fragment/>
            }
            {(menuState === 'submissions')
               ?  <SubmittedEventsContainer>
                     <SubmittedEvents/>
                  </SubmittedEventsContainer>
               : <React.Fragment/>
            
            }
            {(menuState === 'admin')
               ?  <AdminSettingsContainer>
                     <AdminPanel/>
                  </AdminSettingsContainer>
               : <React.Fragment/>
            }
         </Main>
      </Wrapper>
   )  
}


const mapStateToProps = (state) => ({auth:state.authenticate});
export default connect(mapStateToProps)(Profile);
