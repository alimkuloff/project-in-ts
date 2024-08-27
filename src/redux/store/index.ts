import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../slices/auth-slice';
import likesSlice from '../slices/likes-slice';
import { api } from '../api';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    likes: likesSlice,
    [api.reducerPath]: api.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
