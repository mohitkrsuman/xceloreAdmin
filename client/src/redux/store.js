
import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from './reducers/userSlice';
import { userDataSlice } from './reducers/userDataSlice';

export default configureStore({
   reducer: {
      user: userSlice.reducer,
      userData: userDataSlice.reducer
   }
})