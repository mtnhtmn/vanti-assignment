import { configureStore } from '@reduxjs/toolkit'
import listsReducer from "./slices/listsSlice";
import tasksReducer from "./slices/tasksSlice";

export const store = configureStore({
    reducer: {
        listsReducer,
        tasksReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch