import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "@app/features/counter/counterSlice";
import folderReducer from "@app/features/counter/folderSlice"; // Importing the folder reducer

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    folder: folderReducer, 
    
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

// Retaining the AppThunk type as is
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
