import {createSlice} from '@reduxjs/toolkit';

export const userSlice = createSlice({
   name : 'user',
   initialState : {
      user : null
   },
   reducers : {
      newUser : (state, action) => {
         state.user = action.payload
      }
   }
});

export const {newUser} = userSlice.actions;