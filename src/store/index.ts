import { configureStore } from '@reduxjs/toolkit';
import { mapSlice } from '@modules/map/redux/slice';

export const store = configureStore({
  reducer: {
    [mapSlice.name]: mapSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
