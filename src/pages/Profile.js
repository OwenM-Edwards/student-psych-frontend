import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import { connect } from "react-redux";
import { AccountSettings, SubmittedEvents, AdminPanel } from '../components/index';



const Wrapper = styled.div`
   width:100%;
   height:100%;
   display:flex;
   flex-direction:column;
   padding:50px 20px 30px 20px;
   border-radius:5px;
   overflow:auto;
   @media (max-width: 900px) {
      padding:10px;
   }
   & a {
      color:${({ theme }) => theme.primary.light};
   }
`
const Main = styled.div`
   width:100%;
   height:100%;
   display:flex;
   flex-direction:column;
   flex-wrap:wrap;
`
const ButtonContainer = styled.div`
   background: ${({ theme }) => theme.primary.main};
   width:100%;
   height:7%;
   min-height:60px;
   display:flex;
   justify-content:center;
   padding:10px;
   border-radius:5px 5px 0 0;
   grid-gap:10px;

   & button{
      padding:10px;
      width:100%;
      max-width:500px;
      justify-self:center;
      background-color:#2f3e4d;
      border-radius:5px;
      color:${({ theme }) => theme.primary.light};
      border:0px;
      box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
      font-size:1.1rem;
      cursor: pointer;
      transition: all 0.2s ease 0s;
      &:hover {
         background-color:${({ theme }) => theme.primary.light};
         color:${({ theme }) => theme.primary.offBlack};
      }
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
