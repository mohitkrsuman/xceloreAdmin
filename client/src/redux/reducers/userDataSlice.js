import {createSlice} from '@reduxjs/toolkit';

export const userDataSlice = createSlice({
   name : 'userData',
   initialState : {
      userData : null
   },
   reducers : {
      editUserData : (state, action) => {
         state.userData = action.payload
      }
   }
});

export const {editUserData} = userDataSlice.actions;