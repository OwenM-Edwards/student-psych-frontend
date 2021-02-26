import { 
   REQUEST_GET_ENTRIES,
   RECEIVE_GET_ENTRIES,
   SIGN_OUT,
   REQUEST_DELETE_ENTRY,
   RECEIVE_DELETE_ENTRY,
   RECEIVE_ADD_ENTRY, 
   REQUEST_ADD_ENTRY,
   REQUEST_REGISTER_USER,
   RECEIVE_REGISTER_USER,
   REQUEST_SIGN_IN,
   RECEIVE_SIGN_IN,
   SELECT_DATE,
   RECEIVE_EDIT_ENTRY,
   REQUEST_EDIT_ENTRY,
   REQUEST_CLEAR_ENTRIES,
   REQUEST_SECURE_ENTRY,
   RECEIVE_SECURE_ENTRY,
   REQUEST_VERIFY_TOKEN,
   RECEIVE_VERIFY_TOKEN,
   REQUEST_SEARCH_TERM,
   RECEIVE_SEARCH_TERM,
   MODAL_HANDLE,
   REQUEST_RECENT_ENTRIES,
   RECEIVE_RECENT_ENTRIES,
   TOGGLE_NAV_PANEL,
} from './action-types';

import { 
   authenticateAPI, 
   registerAPI,
   verifyAPI, 
   secureEventInfoAPI,
   getEntriesAPI,
   addEntryAPI,
   deleteEntryAPI,
   editEntryAPI,
   searchEntriesAPI,
   recentEntriesAPI,
   logoutAPI,
   checkSessionAPI,
} from '../../util/index';


// Toggles the right sidebar/navpanel, toggle(true) == shown, toggle(false) == hide.
export const toggleNavPanel = (toggle) => async (dispatch) => {
   dispatch({
      type: TOGGLE_NAV_PANEL,
      payload:toggle,
   })
}

// Gets recently added events for the left sidebar
// Get recent events.
export const getRecentEvents = () => async (dispatch) => {
   dispatch({
      type: REQUEST_RECENT_ENTRIES,
   })
   const APIData = await recentEntriesAPI()
   dispatch({
      type: RECEIVE_RECENT_ENTRIES,
      payload:{
         recentEntries: APIData,
      }
   })
}


// Set modal info.
export const modalHandler = ({modalDisplay, modalInfo}) => async (dispatch) => {
   dispatch({
      type: MODAL_HANDLE,
      payload:{
         modalDisplay: modalDisplay,
         modalInfo: modalInfo,
      }
   })
}


// Search entries.
export const searchEntries = (searchterm) => async (dispatch) => {
   dispatch({
      type: REQUEST_SEARCH_TERM,
   })
   const APIData = await searchEntriesAPI(searchterm)
   dispatch({
      type: RECEIVE_SEARCH_TERM,
      payload:APIData,
   })
}


// Verify register email.
export const verifyToken = (token) => async (dispatch) => {
   dispatch({
      type: REQUEST_VERIFY_TOKEN,
   })
   const APIData = await verifyAPI(token)
   dispatch({
      type: RECEIVE_VERIFY_TOKEN,
      payload:APIData,
   })
   dispatch({
      type: RECEIVE_SIGN_IN,
      payload:APIData,
   })
   window.location = "/calendar";
}

// Get full event info if user is logged in.
export const getSecureEventInfo = ({eventInfo}) => async (dispatch) => {
   const { day, month, year, id } = eventInfo;
   dispatch({
      type: REQUEST_SECURE_ENTRY,
   })
   const APIData = await secureEventInfoAPI(day, month, year, id);
   dispatch({
      type: RECEIVE_SECURE_ENTRY,
      payload:  APIData,
   })
}


// Get events for selected month/year
export const getEntries = (month, year) =>  async (dispatch) => {
   dispatch({
      type: REQUEST_GET_ENTRIES,
   })
   const APIData = await getEntriesAPI(month, year);
   dispatch({
      type: RECEIVE_GET_ENTRIES,
      payload: APIData,
   })
}

// Clear current events from state.
export const clearEntries = () => (dispatch) => {
   dispatch({
      type: REQUEST_CLEAR_ENTRIES,
   })
}

// Add new event to calender.
export const addEntry = (eventInfo) =>  async (dispatch) => {
   dispatch({
      type: REQUEST_ADD_ENTRY
   })
   const APIData = await addEntryAPI(eventInfo);
   dispatch({
      type: RECEIVE_ADD_ENTRY
   })
}


// Delete event.
export const deleteEntry = (entryid, userid) =>  async (dispatch) => {
   dispatch({
      type: REQUEST_DELETE_ENTRY,
   })
   const APIData = await deleteEntryAPI(entryid,userid);
   dispatch({
      type: RECEIVE_DELETE_ENTRY,
   })
}

// Edit event.
export const editEntry = (info) =>  async (dispatch) => {
   dispatch({
      type: REQUEST_EDIT_ENTRY,
   })
   const APIData = await editEntryAPI(info);
   dispatch({
      type: RECEIVE_EDIT_ENTRY,
   })
}

// Sign user out.
export const signOut = () => async (dispatch) => {
   localStorage.removeItem("user");
   window.localStorage.removeItem("user");
   const APIData = await logoutAPI();
   dispatch({
      type: SIGN_OUT,
   })
   dispatch({
      type: RECEIVE_SECURE_ENTRY,
      payload:  false,
   })
}

export const checkSession = () => async (dispatch) => {
   dispatch({
      type: REQUEST_SIGN_IN
   })
   const APIData = await checkSessionAPI();
   dispatch({
      type: RECEIVE_SIGN_IN,
      payload:APIData,
   })
}

// Sign user in.
export const signIn = (useremail, userpassword) => async (dispatch) => {
   dispatch({
      type: REQUEST_SIGN_IN
   })
   const APIData = await authenticateAPI(useremail, userpassword);
   dispatch({
      type: RECEIVE_SIGN_IN,
      payload:APIData,
   })
   if(APIData){
      window.location = "/calendar";
   }
}

// Register new user.
export const registerUser = (userEmail, userPassword, userType) => async (dispatch) => {
   dispatch({
      type: REQUEST_REGISTER_USER,
   })
   const APIData = await registerAPI(userEmail, userPassword, userType)
   dispatch({
      type: RECEIVE_REGISTER_USER,
      payload:APIData,
   })
}

// Get current date on page load.
export const getInitialDate = () => async (dispatch) => {
   let date = new Date();
   let totalDaysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
   dispatch({
      type: SELECT_DATE,
      payload:{
         selectedDate: {
            day:date.getDate(),
            month:date.getMonth() + 1,
            year:date.getFullYear(),
            totalDaysInMonth:totalDaysInMonth,
         },
      }
   })
}

// Change date to user selected date.
export const selectDate = (info) => async (dispatch) => {
   dispatch({
      type: SELECT_DATE,
      payload:{
         selectedDate: info
      }
   })
}
